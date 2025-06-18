import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CategoryAnalysis = () => {
  const data = [
    { category: 'Instruments', currentUsage: 42, projectedNeed: 48 },
    { category: 'Consumables', currentUsage: 65, projectedNeed: 72 },
    { category: 'PPE', currentUsage: 35, projectedNeed: 38 },
    { category: 'Cleaning', currentUsage: 25, projectedNeed: 28 },
    { category: 'Office', currentUsage: 12, projectedNeed: 15 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Current Usage: {payload[0]?.value}
          </p>
          <p className="text-sm text-cyan-600">
            Projected Need: {payload[1]?.value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">📊 Category Analysis</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="currentUsage" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="projectedNeed" fill="#06b6d4" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Current Usage</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-500 rounded"></div>
          <span className="text-gray-600">Projected Need</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;