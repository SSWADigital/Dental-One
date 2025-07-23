import React, { useState, useEffect } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import { getPurchaseRequests } from '../api/purchaseRequest';
import { useAuth, useUserSettings } from '../App';
import PurchaseRequestDetail from './PurchaseRequestDetail';

const PAGE_SIZE = 5;

const PurchaseRequestHistory = () => {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPrId, setSelectedPrId] = useState<string | null>(null);
  const { user } = useAuth();
  const { settings: userSettings, loading: settingsLoading } = useUserSettings();
  if (settingsLoading) return <div>Loading...</div>;
  const currency = userSettings?.currency || 'USD';
  const language = userSettings?.language || 'en';
  const currencyFormatter = new Intl.NumberFormat(language, { style: 'currency', currency, minimumFractionDigits: 2 });

  useEffect(() => {
    if (user) {
      fetchPage(currentPage);
    }
    // eslint-disable-next-line
  }, [user, statusFilter, timeFilter, currentPage]);

  const fetchPage = async (page: number) => {
    if (!user) return;
    // Fetch all, then filter and paginate in frontend (for now, for filter compatibility)
    const res = await getPurchaseRequests(user.id);
    if (res.data) {
      let filtered = res.data;
      // Filter by status
      if (statusFilter !== 'All Status') {
        filtered = filtered.filter(r => r.status === statusFilter.toLowerCase());
      }
      // Filter by time
      filtered = filtered.filter(request => {
        const date = new Date(request.date);
        const now = new Date();
        if (timeFilter === 'Last 30 days') {
          const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
          if (diff > 30) return false;
        }
        if (timeFilter === 'Last 7 days') {
          const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
          if (diff > 7) return false;
        }
        if (timeFilter === 'Last 90 days') {
          const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
          if (diff > 90) return false;
        }
        if (timeFilter === 'This year') {
          if (date.getFullYear() !== now.getFullYear()) return false;
        }
        return true;
      });
      setTotalCount(filtered.length);
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      setRequests(filtered.slice(start, end));
    }
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Purchase Request History</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={timeFilter}
              onChange={(e) => { setTimeFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">PR ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">DATE SUBMITTED</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">DEPARTMENT</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ITEMS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL COST</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                    onClick={() => setSelectedPrId(request.pr_id)}
                  >
                    {request.pr_id}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{request.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{request.department}</td>
                <td className="py-4 px-4 text-gray-600">{request.items}</td>
                <td className="py-4 px-4 font-medium text-gray-900">{currencyFormatter.format(Number(request.total_cost))}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button 
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
      {selectedPrId && (
        <PurchaseRequestDetail prId={selectedPrId} onClose={() => setSelectedPrId(null)} />
      )}
    </div>
  );
};

export default PurchaseRequestHistory;