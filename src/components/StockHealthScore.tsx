import React from 'react';

const StockHealthScore = () => {
  const metrics = [
    { label: 'Stock Accuracy', value: 92, color: 'bg-green-500' },
    { label: 'Stockout Rate', value: 8, color: 'bg-red-500' },
    { label: 'Inventory Turnover', value: 65, color: 'bg-yellow-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Health Score</h3>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${78 * 3.14159} ${(100 - 78) * 3.14159}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">78</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className="text-sm font-medium">{metric.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockHealthScore;