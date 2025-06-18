import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LowStockItems = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [threshold, setThreshold] = useState('Default');

  const lowStockItems = [
    {
      id: 'DB-1001',
      name: 'Dental Brush',
      sku: 'DB-1001',
      stock: 3,
      parLevel: '15-25',
      location: 'Main Clinic',
      status: 'Low'
    },
    {
      id: 'LG-3045',
      name: 'Latex Gloves (Box)',
      sku: 'LG-3045',
      stock: 5,
      parLevel: '20-30',
      location: 'Main Clinic',
      status: 'Low'
    },
    {
      id: 'DI-4501',
      name: 'Dental Impression Material',
      sku: 'DI-4501',
      stock: 4,
      parLevel: '5-15',
      location: 'Branch A',
      status: 'Low'
    },
    {
      id: 'DA-9901',
      name: 'Dental Anesthetic',
      sku: 'DA-9901',
      stock: 8,
      parLevel: '10-20',
      location: 'Main Clinic',
      status: 'Low'
    },
    {
      id: 'SM-4201',
      name: 'Surgical Masks',
      sku: 'SM-4201',
      stock: 12,
      parLevel: '50-100',
      location: 'Branch B',
      status: 'Low'
    },
    {
      id: 'DC-3302',
      name: 'Dental Cement',
      sku: 'DC-3302',
      stock: 2,
      parLevel: '10-15',
      location: 'Main Clinic',
      status: 'Low'
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(lowStockItems.map(item => item.id));
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Low Stock Items</h3>
          <span className="text-sm text-gray-500">(28 items)</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Adjust Threshold:</span>
            <div className="relative">
              <select 
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Default</option>
                <option>Conservative</option>
                <option>Aggressive</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate PR for Selected
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedItems.length === lowStockItems.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">Select All</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <input
                type="checkbox"
                checked={isSelected(item.id)}
                onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
              />
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                {item.status}
              </span>
            </div>
            <div className="mb-3">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">SKU: {item.sku}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="font-medium">{item.stock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Par:</span>
                <span className="font-medium">{item.parLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockItems;