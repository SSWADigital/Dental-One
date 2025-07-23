import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, ChevronDown, Filter, Eye, MessageSquare, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useUserSettings } from '../App';
import { getPurchaseRequests } from '../api/purchaseRequest';
import { useAuth } from '../App';
import ModalDialog from '../components/ModalDialog';
import { supabase } from '../supabaseClient';

interface PRItem {
  id: string;
  name: string;
  sku: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
}

interface PurchaseRequest {
  id: string;
  submittedBy: string;
  date: string;
  department: string;
  requiredBy: string;
  items: number;
  totalCost: number;
  status: string;
  statusColor: string;
  items_detail: PRItem[];
}

const PurchaseApproval: React.FC = () => {
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterDate, setFilterDate] = useState('All Dates');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Date');
  const [selectedPR, setSelectedPR] = useState<string | null>('PR-2022-0042');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemComments, setItemComments] = useState<{[key: string]: string}>({});
  const [bulkComment, setBulkComment] = useState('');
  const [modal, setModal] = useState<{ open: boolean; title: string; message: string; type?: 'success' | 'error' | 'info' }>({ open: false, title: '', message: '', type: 'info' });
  const [userNames, setUserNames] = useState<{[userId: string]: string}>({});

  const { settings: userSettings, loading: settingsLoading } = useUserSettings();
  if (settingsLoading) return <div>Loading...</div>;
  const currency = userSettings?.currency || 'USD';
  const language = userSettings?.language || 'en';
  const currencyFormatter = new Intl.NumberFormat(language, { style: 'currency', currency, minimumFractionDigits: 2 });

  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getPurchaseRequests(user.id).then(res => {
        if (res.data) {
          // Mapping data dari backend ke struktur PurchaseRequest lama
          const mapped = res.data.map((pr: any) => ({
            id: pr.pr_id || pr.id,
            submittedBy: pr.submitted_by || '-',
            date: pr.date,
            department: pr.department,
            requiredBy: pr.required_by,
            items: pr.items,
            totalCost: pr.total_cost,
            status: pr.status,
            statusColor: pr.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' : pr.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
            items_detail: pr.purchase_request_items || [],
          }));
          setPurchaseRequests(mapped);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (purchaseRequests.length > 0) {
      const userIds = Array.from(new Set(purchaseRequests.map(pr => pr.submittedBy).filter(Boolean)));
      userIds.forEach(async (userId) => {
        if (!userNames[userId]) {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', userId)
            .single();
          setUserNames(prev => ({
            ...prev,
            [userId]: data?.full_name || data?.email || userId
          }));
        }
      });
    }
    // eslint-disable-next-line
  }, [purchaseRequests]);

  const selectedPRData = purchaseRequests.find(pr => pr.id === selectedPR);

  const handleItemSelection = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (!selectedPRData) return;
    
    if (checked) {
      const pendingItems = selectedPRData.items_detail
        .filter(item => item.status === 'pending')
        .map(item => item.id);
      setSelectedItems(pendingItems);
    } else {
      setSelectedItems([]);
    }
  };

  // Tambahkan fungsi update status item di Supabase
  async function updateItemStatus(itemId: string, status: string, comment?: string) {
    await supabase
      .from('purchase_request_items')
      .update({ status, comment })
      .eq('id', itemId);
  }

  const handleItemAction = async (itemIds: string[], action: 'approved' | 'rejected', comment?: string) => {
    if (action === 'rejected' && !comment?.trim()) {
      setModal({ open: true, title: 'Error', message: 'Please add a comment before rejecting items', type: 'error' });
      return;
    }
    // Update status di database
    for (const itemId of itemIds) {
      await updateItemStatus(itemId, action, comment);
    }
    // Fetch ulang data PR dari database
    if (user) {
      const res = await getPurchaseRequests(user.id);
      if (res.data) {
        const mapped = res.data.map((pr: any) => ({
          id: pr.pr_id || pr.id,
          submittedBy: pr.submitted_by || '-',
          date: pr.date,
          department: pr.department,
          requiredBy: pr.required_by,
          items: pr.items,
          totalCost: pr.total_cost,
          status: pr.status,
          statusColor: pr.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' : pr.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
          items_detail: pr.purchase_request_items || [],
        }));
        setPurchaseRequests(mapped);
      }
    }
    // Clear selections and comments
    setSelectedItems([]);
    setBulkComment('');
    setItemComments({});
    const actionText = action === 'approved' ? 'approved' : 'rejected';
    const itemText = itemIds.length === 1 ? 'item' : 'items';
    setModal({ open: true, title: 'Success', message: `${itemIds.length} ${itemText} ${actionText} successfully${comment ? ' with comment' : ''}`, type: 'success' });
  };

  const handleBulkAction = (action: 'approved' | 'rejected') => {
    if (selectedItems.length === 0) {
      setModal({ open: true, title: 'Info', message: 'Please select items to perform bulk action', type: 'info' });
      return;
    }
    
    const comment = action === 'rejected' ? bulkComment : '';
    handleItemAction(selectedItems, action, comment);
  };

  const handleEntirePRAction = (action: 'approved' | 'rejected') => {
    if (!selectedPRData) return;
    
    const pendingItemIds = selectedPRData.items_detail
      .filter(item => item.status === 'pending')
      .map(item => item.id);
    
    if (pendingItemIds.length === 0) {
      setModal({ open: true, title: 'Info', message: 'No pending items to approve/reject', type: 'info' });
      return;
    }
    
    const comment = action === 'rejected' ? bulkComment : '';
    handleItemAction(pendingItemIds, action, comment);
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setItemComments(prev => ({ ...prev, [itemId]: comment }));
  };

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getItemStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Pending';
    }
  };

  const getOverallPRStatus = (items: PRItem[]) => {
    const approvedCount = items.filter(item => item.status === 'approved').length;
    const rejectedCount = items.filter(item => item.status === 'rejected').length;
    const pendingCount = items.filter(item => item.status === 'pending').length;

    if (pendingCount === 0) {
      if (rejectedCount === 0) return 'Fully Approved';
      if (approvedCount === 0) return 'Fully Rejected';
      return 'Partially Approved';
    }
    return 'Pending Approval';
  };

  const pendingItemsCount = selectedPRData?.items_detail.filter(item => item.status === 'pending').length || 0;
  const isAllSelected = selectedPRData && selectedItems.length === pendingItemsCount && pendingItemsCount > 0;

  return (
    <>

    <TopBar Title='Purchase Approval' Text='Review and approve purchase requests from departments' />
      {/* Header */}
      

      {/* Sub Navigation */}
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Purchase Request Approval</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter by Dept</option>
                <option>Dental Surgery</option>
                <option>General Dentistry</option>
                <option>Orthodontics</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter by Date</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div> */}
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Purchase Requests Awaiting Approval</h3>
              <div className="flex items-center space-x-4">
              <div className="relative">
              <select 
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter by Dept</option>
                <option>Dental Surgery</option>
                <option>General Dentistry</option>
                <option>Orthodontics</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Filter by Date</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search PR"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Sort</option>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Department</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Left Panel - PR List */}
            <div className="w-1/2 border-r border-gray-200 overflow-y-auto h-[600px]">
              {purchaseRequests.map((pr) => (
                <div
                  key={pr.id}
                  onClick={() => {
                    setSelectedPR(pr.id);
                    setSelectedItems([]);
                    setBulkComment('');
                    setItemComments({});
                  }}
                  className={`p-6 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedPR === pr.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-600 font-semibold">{pr.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${pr.statusColor}`}>
                        {getOverallPRStatus(pr.items_detail)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Submitted by: {userNames[pr.submittedBy] || '-'} • {pr.date}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">DEPARTMENT</span>
                      <div className="font-medium">{pr.department}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">REQUIRED BY</span>
                      <div className="font-medium">{pr.requiredBy}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">ITEMS</span>
                      <div className="font-medium">{pr.items} items</div>
                    </div>
                    <div>
                      <span className="text-gray-500">TOTAL COST</span>
                      <div className="font-medium">{currencyFormatter.format(pr.totalCost)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel - PR Details */}
            <div className="w-1/2 flex flex-col">
              {selectedPRData && (
                <>
                  {/* PR Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600 font-semibold text-lg">{selectedPRData.id}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedPRData.statusColor}`}>
                          {getOverallPRStatus(selectedPRData.items_detail)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      Submitted by: {userNames[selectedPRData.submittedBy] || '-'} • {selectedPRData.date}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <span className="text-sm text-gray-500">DEPARTMENT</span>
                        <div className="font-medium">{selectedPRData.department}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">REQUIRED BY</span>
                        <div className="font-medium">{selectedPRData.requiredBy}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">ITEMS</span>
                        <div className="font-medium">{selectedPRData.items} items</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">TOTAL COST</span>
                        <div className="font-medium">{currencyFormatter.format(selectedPRData.totalCost)}</div>
                      </div>
                    </div>

                    {/* Entire PR Actions */}
                    {pendingItemsCount > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Entire Purchase Request Actions</h4>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleEntirePRAction('rejected')}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject All</span>
                          </button>
                          <button 
                            onClick={() => handleEntirePRAction('approved')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve All</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items Section */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                      {/* Bulk Actions */}
                      {selectedItems.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-blue-900">
                              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                            </h4>
                            <button 
                              onClick={() => setSelectedItems([])}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Clear selection
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            <textarea
                              value={bulkComment}
                              onChange={(e) => setBulkComment(e.target.value)}
                              placeholder="Add comment for bulk action (required for rejection)..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleBulkAction('rejected')}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject Selected</span>
                            </button>
                            <button 
                              onClick={() => handleBulkAction('approved')}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve Selected</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Items List Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Items Requested</h4>
                        {pendingItemsCount > 0 && (
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Select all pending</span>
                          </label>
                        )}
                      </div>

                      {/* Items Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Select</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Item Details</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Qty</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Unit Price</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Total</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Status</th>
                              <th className="text-left py-3 px-2 font-medium text-gray-700 text-sm">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPRData.items_detail.map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-2">
                                  {item.status === 'pending' && (
                                    <input
                                      type="checkbox"
                                      checked={selectedItems.includes(item.id)}
                                      onChange={(e) => handleItemSelection(item.id, e.target.checked)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                  )}
                                </td>
                                <td className="py-3 px-2">
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.sku}</div>
                                    <div className="text-xs text-gray-500">{item.supplier}</div>
                                  </div>
                                </td>
                                <td className="py-3 px-2 text-sm">{item.quantity}</td>
                                <td className="py-3 px-2 text-sm">{
                                  currencyFormatter.format(
                                    item.unitPrice !== undefined && item.unitPrice !== null
                                      ? item.unitPrice
                                      : (item as any).unit_price !== undefined && (item as any).unit_price !== null
                                        ? (item as any).unit_price
                                        : item.total && item.quantity ? item.total / item.quantity : 0
                                  )
                                }</td>
                                <td className="py-3 px-2 text-sm font-medium">{currencyFormatter.format(item.total)}</td>
                                <td className="py-3 px-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemStatusColor(item.status)}`}>
                                    {getItemStatusText(item.status)}
                                  </span>
                                </td>
                                <td className="py-3 px-2">
                                  {item.status === 'pending' && !selectedItems.includes(item.id) && (
                                    <div className="space-y-2">
                                      <div>
                                        <textarea
                                          value={itemComments[item.id] || ''}
                                          onChange={(e) => handleCommentChange(item.id, e.target.value)}
                                          placeholder="Comment (required for rejection)..."
                                          rows={1}
                                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                      </div>
                                      <div className="flex space-x-1">
                                        <button 
                                          onClick={() => handleItemAction([item.id], 'rejected', itemComments[item.id])}
                                          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors flex items-center space-x-1"
                                        >
                                          <XCircle className="w-3 h-3" />
                                          <span>Reject</span>
                                        </button>
                                        <button 
                                          onClick={() => handleItemAction([item.id], 'approved')}
                                          className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors flex items-center space-x-1"
                                        >
                                          <CheckCircle className="w-3 h-3" />
                                          <span>Approve</span>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  {item.status !== 'pending' && (
                                    <div className="flex items-center space-x-1">
                                      {item.status === 'approved' ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                      )}
                                      <span className="text-xs text-gray-500">
                                        {item.status === 'approved' ? 'Approved' : 'Rejected'}
                                      </span>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Comments for processed items */}
                      {selectedPRData.items_detail.some(item => item.status !== 'pending' && item.comment) && (
                        <div className="mt-6">
                          <h5 className="font-medium text-gray-900 mb-3">Comments</h5>
                          <div className="space-y-2">
                            {selectedPRData.items_detail
                              .filter(item => item.status !== 'pending' && item.comment)
                              .map(item => (
                                <div key={item.id} className="bg-gray-50 rounded p-3 text-sm">
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-gray-600 mt-1">{item.comment}</div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <ModalDialog open={modal.open} onClose={() => setModal({ ...modal, open: false })} title={modal.title} message={modal.message} type={modal.type} />
    </>
  );
};

export default PurchaseApproval;