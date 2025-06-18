import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, HelpCircle } from 'lucide-react';

const LandedCostCalculator = () => {
  const [selectedPOs, setSelectedPOs] = useState<string[]>(['PO-2022-0042', 'PO-2022-0041']);
  const [dateRange, setDateRange] = useState({ from: '2022-11-01', to: '2022-12-06' });

  const purchaseOrders = [
    {
      id: 'PO-2022-0042',
      supplier: 'Cobra Dental Indonesia',
      date: 'Dec 6, 2022',
      items: 5,
      amount: 521.63,
      status: 'Received',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'PO-2022-0041',
      supplier: 'MediDent Supply Co.',
      date: 'Dec 5, 2022',
      items: 8,
      amount: 842.50,
      status: 'Received',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'PO-2022-0038',
      supplier: 'Cobra Dental Indonesia',
      date: 'Nov 28, 2022',
      items: 6,
      amount: 532.25,
      status: 'Received',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'PO-2022-0039',
      supplier: 'DentalEquip Inc.',
      date: 'Dec 1, 2022',
      items: 12,
      amount: 1245.00,
      status: 'Received',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  const steps = [
    { number: 1, title: 'Select Purchase Order', active: true, completed: false },
    { number: 2, title: 'Add Additional Costs', active: false, completed: false },
    { number: 3, title: 'Distribute Costs', active: false, completed: false },
    { number: 4, title: 'Review and Confirm', active: false, completed: false }
  ];

  const handlePOSelection = (poId: string) => {
    if (selectedPOs.includes(poId)) {
      setSelectedPOs(selectedPOs.filter(id => id !== poId));
    } else {
      setSelectedPOs([...selectedPOs, poId]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Landed Cost Calculator</h3>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Help Guide</span>
        </button>
      </div>

      {/* Steps */}
      <div className="flex items-center space-x-8 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.active ? 'bg-blue-500 text-white' : 
              step.completed ? 'bg-green-500 text-white' : 
              'bg-gray-200 text-gray-600'
            }`}>
              {step.number}
            </div>
            <span className={`ml-2 text-sm ${step.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-300 ml-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Purchase Order */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Step 1: Select Purchase Order</h4>
        
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by PO ID, supplier, or department..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Statuses</option>
                <option>Received</option>
                <option>Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Suppliers</option>
                <option>Cobra Dental Indonesia</option>
                <option>MediDent Supply Co.</option>
              </select>
            </div>
          </div>
        </div>

        {/* Purchase Orders List */}
        <div className="space-y-3">
          {purchaseOrders.map((po) => (
            <div
              key={po.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedPOs.includes(po.id) 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePOSelection(po.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedPOs.includes(po.id)}
                    onChange={() => handlePOSelection(po.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">PO</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600">{po.id}</h4>
                    <p className="text-sm text-gray-600">{po.supplier}</p>
                    <p className="text-xs text-gray-500">{po.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{po.items} items</div>
                  <div className="font-semibold text-gray-900">${po.amount}</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${po.statusColor}`}>
                    {po.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View details
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What are Landed Costs Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">?</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What are Landed Costs?</h4>
              <p className="text-sm text-gray-600 mb-2">
                Landed costs are the total expenses incurred to get inventory from the supplier to 
                your clinic, including product costs, shipping, customs, insurance, and handling fees.
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Learn more →
              </button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Continue to Additional Costs →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandedCostCalculator;