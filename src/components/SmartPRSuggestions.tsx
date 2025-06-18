import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SmartPRSuggestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [forecastPeriod, setForecastPeriod] = useState('4 Weeks');

  const suggestions = [
    {
      itemName: 'Dental Brush',
      sku: 'DB-1001',
      currentStock: 3,
      forecastedNeed: 15,
      supplier: 'Cobra Dental Indonesia',
      unitPrice: 12.50,
      totalCost: 187.50,
      status: 'Critical',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      itemName: 'Charmflex Regular',
      sku: 'CR-2034',
      currentStock: 8,
      forecastedNeed: 20,
      supplier: 'Cobra Dental Indonesia',
      unitPrice: 8.75,
      totalCost: 175.00,
      status: 'Attention',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      itemName: 'Latex Gloves (Box)',
      sku: 'LG-3045',
      currentStock: 8,
      forecastedNeed: 25,
      supplier: 'Cobra Dental Indonesia',
      unitPrice: 15.00,
      totalCost: 375.00,
      status: 'Attention',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      itemName: 'Dental Impression Material',
      sku: 'DI-4023',
      currentStock: 2,
      forecastedNeed: 10,
      supplier: 'MediDent Supplies',
      unitPrice: 45.75,
      totalCost: 457.50,
      status: 'Critical',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      itemName: 'Sterilization Pouches',
      sku: 'SP-5067',
      currentStock: 12,
      forecastedNeed: 15,
      supplier: 'MediDent Supplies',
      unitPrice: 22.50,
      totalCost: 337.50,
      status: 'Healthy',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">💡</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Smart PR Suggestions</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-blue-600 font-medium">AI Predictions</span>
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">ON</div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create PR from Forecast →
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Departments</option>
              <option>General Dentistry</option>
              <option>Dental Surgery</option>
              <option>Orthodontics</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>4 Weeks</option>
              <option>8 Weeks</option>
              <option>12 Weeks</option>
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
              <th className="text-left py-3 px-4 font-medium text-gray-700">ITEM NAME</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SKU</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">CURRENT STOCK</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">FORECASTED NEED</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SUPPLIER</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">UNIT PRICE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL COST</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-gray-900">{item.itemName}</td>
                <td className="py-4 px-4 text-gray-600">{item.sku}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.currentStock <= 3 ? 'bg-red-100 text-red-800' : 
                    item.currentStock <= 8 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.currentStock}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium text-gray-900">{item.forecastedNeed}</td>
                <td className="py-4 px-4 text-gray-600">{item.supplier}</td>
                <td className="py-4 px-4 text-gray-600">${item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-4 font-medium text-gray-900">${item.totalCost.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">Showing 5 of 24 items</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50">
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

export default SmartPRSuggestions;