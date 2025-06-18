import React from 'react';

const StockAvailability = () => {
  const lowStockItems = [
    { name: 'Dental Brush', qty: 3 },
    { name: 'Charmflex Regular', qty: 2 }
  ];

  const handleOrder = (itemName: string) => {
    alert(`Order placed for ${itemName}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Stock availability</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Asset</div>
          <div className="text-xl font-bold text-gray-900">$53,000</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Product</div>
          <div className="text-xl font-bold text-gray-900">442</div>
        </div>
      </div>

      {/* Stock Status Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
          <div className="bg-blue-500 flex-grow"></div>
          <div className="bg-yellow-500 w-16"></div>
          <div className="bg-red-500 w-8"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-blue-600">● Available</span>
          <span className="text-yellow-600">● Low Stock</span>
          <span className="text-red-600">● Out of stock</span>
        </div>
      </div>

      {/* Low Stock Items */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-900">LOW STOCK</span>
          <a href="#" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="space-y-3">
          {lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                <div className="text-xs text-gray-500">Qty: {item.qty}</div>
              </div>
              <button 
                onClick={() => handleOrder(item.name)}
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
              >
                Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockAvailability;