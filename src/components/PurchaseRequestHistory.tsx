import React, { useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';

const PurchaseRequestHistory = () => {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);

  const requests = [
    {
      id: 'PR-2022-0042',
      dateSubmitted: 'Dec 6, 2022',
      status: 'Pending',
      department: 'Dental Surgery',
      items: 5,
      totalCost: 521.63,
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'PR-2022-0041',
      dateSubmitted: 'Dec 5, 2022',
      status: 'Approved',
      department: 'General Dentistry',
      items: 8,
      totalCost: 842.50,
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'PR-2022-0040',
      dateSubmitted: 'Dec 3, 2022',
      status: 'Rejected',
      department: 'Orthodontics',
      items: 3,
      totalCost: 156.75,
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'PR-2022-0039',
      dateSubmitted: 'Dec 1, 2022',
      status: 'Approved',
      department: 'Pediatric Dentistry',
      items: 12,
      totalCost: 1245.00,
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'PR-2022-0038',
      dateSubmitted: 'Nov 28, 2022',
      status: 'Approved',
      department: 'Dental Surgery',
      items: 6,
      totalCost: 532.25,
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Purchase Request History</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              onChange={(e) => setTimeFilter(e.target.value)}
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
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {request.id}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{request.dateSubmitted}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.statusColor}`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{request.department}</td>
                <td className="py-4 px-4 text-gray-600">{request.items}</td>
                <td className="py-4 px-4 font-medium text-gray-900">${request.totalCost.toFixed(2)}</td>
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
        >
          Previous
        </button>
        <div className="flex space-x-2">
          <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm">1</button>
          <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
          <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
        </div>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Next
        </button>
      </div>
    </div>
  );
};

export default PurchaseRequestHistory;