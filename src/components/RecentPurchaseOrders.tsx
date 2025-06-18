import React, { useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';

const RecentPurchaseOrders = () => {
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);

  const orders = [
    {
      id: 'PO-2022-0035',
      prReference: 'PR-2022-0037',
      supplier: 'Cobra',
      dateCreated: 'Nov 25, 2022',
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-800',
      totalValue: 878.50,
      expectedDelivery: 'Dec 2, 2022'
    },
    {
      id: 'PO-2022-0034',
      prReference: 'PR-2022-0036',
      supplier: 'MedDent',
      dateCreated: 'Nov 22, 2022',
      status: 'Processing',
      statusColor: 'bg-yellow-100 text-yellow-800',
      totalValue: 1245.75,
      expectedDelivery: 'Dec 5, 2022'
    },
    {
      id: 'PO-2022-0033',
      prReference: 'PR-2022-0035',
      supplier: 'DentSupply',
      dateCreated: 'Nov 18, 2022',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
      totalValue: 532.25,
      expectedDelivery: 'Nov 28, 2022'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
        <div className="flex items-center space-x-3">
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
              <th className="text-left py-3 px-4 font-medium text-gray-700">PO ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">PR REFERENCE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SUPPLIER</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">DATE CREATED</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL VALUE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">EXPECTED DELIVERY</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {order.id}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{order.prReference}</td>
                <td className="py-4 px-4 text-gray-600">{order.supplier}</td>
                <td className="py-4 px-4 text-gray-600">{order.dateCreated}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium text-gray-900">${order.totalValue.toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-600">{order.expectedDelivery}</td>
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

      {/* Results info and Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">Showing 1 to 3 of 12 results</span>
        <div className="flex items-center space-x-2">
          <button 
            className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm">1</button>
            <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
            <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
          </div>
          <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseOrders;