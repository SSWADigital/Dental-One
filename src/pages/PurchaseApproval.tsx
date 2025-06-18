import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Filter, Eye, MessageSquare, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import TopBar from '../components/TopBar';

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

  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([
    {
      id: 'PR-2022-0042',
      submittedBy: 'Darrell Steward',
      date: 'Dec 6, 2022',
      department: 'Dental Surgery',
      requiredBy: 'Dec 15, 2022',
      items: 5,
      totalCost: 521.63,
      status: 'Pending Approval',
      statusColor: 'bg-yellow-100 text-yellow-800',
      items_detail: [
        { 
          id: 'item-1',
          name: 'Dental Brush', 
          sku: 'DB-1001', 
          supplier: 'Cobra Dental Indonesia', 
          quantity: 10, 
          unitPrice: 12.50, 
          total: 125.00,
          status: 'pending'
        },
        { 
          id: 'item-2',
          name: 'Charmflex Regular', 
          sku: 'CR-2034', 
          supplier: 'Blackrock', 
          quantity: 15, 
          unitPrice: 8.75, 
          total: 131.25,
          status: 'pending'
        },
        { 
          id: 'item-3',
          name: 'Latex Gloves (Box)', 
          sku: 'LG-3045', 
          supplier: 'Pitede Amoauna', 
          quantity: 20, 
          unitPrice: 15.00, 
          total: 300.00,
          status: 'pending'
        },
        { 
          id: 'item-4',
          name: 'Dental Mirror Set', 
          sku: 'DM-2001', 
          supplier: 'MediDent Supplies', 
          quantity: 25, 
          unitPrice: 8.50, 
          total: 212.50,
          status: 'pending'
        },
        { 
          id: 'item-5',
          name: 'Sterilization Pouches', 
          sku: 'SP-3045', 
          supplier: 'Dental Care Co', 
          quantity: 100, 
          unitPrice: 6.30, 
          total: 630.00,
          status: 'pending'
        }
      ]
    },
    {
      id: 'PR-2022-0043',
      submittedBy: 'Jane Cooper',
      date: 'Dec 7, 2022',
      department: 'General Dentistry',
      requiredBy: 'Dec 20, 2022',
      items: 3,
      totalCost: 842.50,
      status: 'Pending Approval',
      statusColor: 'bg-yellow-100 text-yellow-800',
      items_detail: [
        { 
          id: 'item-6',
          name: 'Dental Forceps', 
          sku: 'DF-2001', 
          supplier: 'MediDent Supplies', 
          quantity: 5, 
          unitPrice: 45.00, 
          total: 225.00,
          status: 'pending'
        },
        { 
          id: 'item-7',
          name: 'Composite Filling Material', 
          sku: 'CF-3045', 
          supplier: 'Dental Care Co', 
          quantity: 10, 
          unitPrice: 32.75, 
          total: 327.50,
          status: 'pending'
        },
        { 
          id: 'item-8',
          name: 'Anesthetic Cartridges', 
          sku: 'AC-4001', 
          supplier: 'PharmaDent', 
          quantity: 50, 
          unitPrice: 5.80, 
          total: 290.00,
          status: 'pending'
        }
      ]
    }
  ]);

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

  const handleItemAction = (itemIds: string[], action: 'approved' | 'rejected', comment?: string) => {
    if (action === 'rejected' && !comment?.trim()) {
      alert('Please add a comment before rejecting items');
      return;
    }

    setPurchaseRequests(prevRequests => 
      prevRequests.map(pr => 
        pr.id === selectedPR 
          ? {
              ...pr,
              items_detail: pr.items_detail.map(item => 
                itemIds.includes(item.id)
                  ? { ...item, status: action, comment: comment || '' }
                  : item
              )
            }
          : pr
      )
    );

    // Clear selections and comments
    setSelectedItems([]);
    setBulkComment('');
    setItemComments({});
    
    const actionText = action === 'approved' ? 'approved' : 'rejected';
    const itemText = itemIds.length === 1 ? 'item' : 'items';
    alert(`${itemIds.length} ${itemText} ${actionText} successfully${comment ? ' with comment' : ''}`);
  };

  const handleBulkAction = (action: 'approved' | 'rejected') => {
    if (selectedItems.length === 0) {
      alert('Please select items to perform bulk action');
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
      alert('No pending items to approve/reject');
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
            <div className="w-1/2 border-r border-gray-200">
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
                    Submitted by: {pr.submittedBy} • {pr.date}
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
                      <div className="font-medium">${pr.totalCost}</div>
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
                      Submitted by: {selectedPRData.submittedBy} • {selectedPRData.date}
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
                        <div className="font-medium">${selectedPRData.totalCost}</div>
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
                                <td className="py-3 px-2 text-sm">${item.unitPrice.toFixed(2)}</td>
                                <td className="py-3 px-2 text-sm font-medium">${item.total.toFixed(2)}</td>
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
    </>
  );
};

export default PurchaseApproval;