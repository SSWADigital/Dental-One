import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, RefreshCw, FileSpreadsheet, Eye, MessageCircle } from 'lucide-react';

const InventoryTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const inventoryItems = [
    {
      id: 'DB-1001',
      name: 'Dental Brush',
      sku: 'DB-1001',
      category: 'Consumables',
      location: 'Main Clinic',
      parLevel: '15-25',
      currentStock: 3,
      usage: 8,
      status: 'Low',
      statusColor: 'bg-red-100 text-red-800',
      forecast: 'Order Soon'
    },
    {
      id: 'LG-3045',
      name: 'Latex Gloves (Box)',
      sku: 'LG-3045',
      category: 'Consumables',
      location: 'Main Clinic',
      parLevel: '20-30',
      currentStock: 5,
      usage: 12,
      status: 'Low',
      statusColor: 'bg-red-100 text-red-800',
      forecast: 'Order Now'
    },
    {
      id: 'CR-2034',
      name: 'Charmflex Regular',
      sku: 'CR-2034',
      category: 'Consumables',
      location: 'Main Clinic',
      parLevel: '10-20',
      currentStock: 18,
      usage: 5,
      status: 'Optimal',
      statusColor: 'bg-yellow-100 text-yellow-800',
      forecast: 'Stable'
    },
    {
      id: 'DI-4501',
      name: 'Dental Impression Material',
      sku: 'DI-4501',
      category: 'Consumables',
      location: 'Branch A',
      parLevel: '5-15',
      currentStock: 4,
      usage: 3,
      status: 'Low',
      statusColor: 'bg-red-100 text-red-800',
      forecast: 'Order Soon'
    },
    {
      id: 'SP-7623',
      name: 'Sterilization Pouches',
      sku: 'SP-7623',
      category: 'Consumables',
      location: 'Main Clinic',
      parLevel: '50-100',
      currentStock: 120,
      usage: 30,
      status: 'Overstock',
      statusColor: 'bg-green-100 text-green-800',
      forecast: 'Reduce'
    },
    {
      id: 'CF-3327',
      name: 'Composite Filling Material',
      sku: 'CF-3327',
      category: 'Consumables',
      location: 'Branch B',
      parLevel: '8-15',
      currentStock: 12,
      usage: 4,
      status: 'Optimal',
      statusColor: 'bg-yellow-100 text-yellow-800',
      forecast: 'Stable'
    },
    {
      id: 'DA-9901',
      name: 'Dental Anesthetic',
      sku: 'DA-9901',
      category: 'Medications',
      location: 'Main Clinic',
      parLevel: '10-20',
      currentStock: 8,
      usage: 7,
      status: 'Low',
      statusColor: 'bg-red-100 text-red-800',
      forecast: 'Order Soon'
    },
    {
      id: 'DB-5567',
      name: 'Dental Burs Kit',
      sku: 'DB-5567',
      category: 'Instruments',
      location: 'Branch A',
      parLevel: '3-8',
      currentStock: 9,
      usage: 1,
      status: 'Overstock',
      statusColor: 'bg-green-100 text-green-800',
      forecast: 'Transfer'
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(inventoryItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const isSelected = (id: string) => selectedItems.includes(id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
        <div className="text-sm text-gray-500">Showing 1-20 of 247 items</div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Categories</option>
              <option>Consumables</option>
              <option>Medications</option>
              <option>Instruments</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Locations</option>
              <option>Main Clinic</option>
              <option>Branch A</option>
              <option>Branch B</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Status</option>
              <option>Low</option>
              <option>Optimal</option>
              <option>Overstock</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to Excel</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedItems.length === inventoryItems.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">PRODUCT NAME</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SKU</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">CATEGORY</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">LOCATION</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">PAR LEVEL</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">CURRENT STOCK</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">USAGE (WEEKLY)</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">FORECAST</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={isSelected(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                <td className="py-4 px-4 text-gray-600">{item.sku}</td>
                <td className="py-4 px-4 text-gray-600">{item.category}</td>
                <td className="py-4 px-4 text-gray-600">{item.location}</td>
                <td className="py-4 px-4 text-gray-600">{item.parLevel}</td>
                <td className="py-4 px-4 font-medium text-gray-900">{item.currentStock}</td>
                <td className="py-4 px-4 text-gray-600">{item.usage}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{item.forecast}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
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
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50">
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

export default InventoryTable;