import React from 'react';

const StockStatusOverview = () => {
  const locations = [
    {
      name: 'Main Clinic',
      totalItems: 124,
      low: 12,
      overstock: 8
    },
    {
      name: 'Branch A',
      totalItems: 86,
      low: 9,
      overstock: 4
    },
    {
      name: 'Branch B',
      totalItems: 37,
      low: 7,
      overstock: 3
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Status Overview</h3>
      
      {/* Overall Status Bar */}
      <div className="mb-6">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
          <div className="bg-red-500 w-1/6"></div>
          <div className="bg-yellow-500 w-1/4"></div>
          <div className="bg-green-500 flex-1"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-red-600 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            Low (28)
          </span>
          <span className="text-yellow-600 flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
            Optimal (204)
          </span>
          <span className="text-green-600 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Overstock (15)
          </span>
        </div>
      </div>

      {/* Location Breakdown */}
      <div className="grid grid-cols-3 gap-6">
        {locations.map((location, index) => (
          <div key={index} className="text-center">
            <h4 className="font-medium text-gray-900 mb-2">{location.name}</h4>
            <div className="text-2xl font-bold text-gray-900 mb-1">{location.totalItems} items</div>
            <div className="space-y-1 text-sm">
              <div className="text-red-600">{location.low} low</div>
              <div className="text-yellow-600">{location.overstock} overstock</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockStatusOverview;