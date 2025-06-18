import React, { useState } from 'react';
import { FileSpreadsheet, Info, Eye, ChevronRight } from 'lucide-react';

const RecentLandedCostCalculations = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const calculations = [
    {
      id: 'PO-2022-0037',
      supplier: 'MediDent Supply Co.',
      dateCalculated: 'Nov 25, 2022',
      baseCost: 1850.00,
      additionalCosts: 342.25,
      landedCost: 2192.25,
      increase: '18.5%',
      increaseColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'PO-2022-0035',
      supplier: 'DentalEquip Inc.',
      dateCalculated: 'Nov 20, 2022',
      baseCost: 3240.75,
      additionalCosts: 587.80,
      landedCost: 3828.55,
      increase: '18.1%',
      increaseColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'PO-2022-0034',
      supplier: 'Cobra Dental Indonesia',
      dateCalculated: 'Nov 18, 2022',
      baseCost: 975.50,
      additionalCosts: 195.10,
      landedCost: 1170.60,
      increase: '20.0%',
      increaseColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'PO-2022-0032',
      supplier: 'MediDent Supply Co.',
      dateCalculated: 'Nov 15, 2022',
      baseCost: 2450.00,
      additionalCosts: 441.00,
      landedCost: 2891.00,
      increase: '18.0%',
      increaseColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'PO-2022-0030',
      supplier: 'DentalEquip Inc.',
      dateCalculated: 'Nov 10, 2022',
      baseCost: 1875.25,
      additionalCosts: 318.30,
      landedCost: 2193.55,
      increase: '17.0%',
      increaseColor: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Landed Cost Calculations</h3>
        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors">
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export to Excel</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">PO ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SUPPLIER</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">DATE CALCULATED</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">BASE COST</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ADDITIONAL COSTS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">LANDED COST</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">% INCREASE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {calculations.map((calc) => (
              <tr key={calc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                    {calc.id}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{calc.supplier}</td>
                <td className="py-4 px-4 text-gray-600">{calc.dateCalculated}</td>
                <td className="py-4 px-4 font-medium text-gray-900">${calc.baseCost.toFixed(2)}</td>
                <td className="py-4 px-4 font-medium text-gray-900">${calc.additionalCosts.toFixed(2)}</td>
                <td className="py-4 px-4 font-medium text-gray-900">${calc.landedCost.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${calc.increaseColor}`}>
                    {calc.increase}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
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
        <span className="text-sm text-gray-500">Showing 1 to 5 of 24 results</span>
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

export default RecentLandedCostCalculations;