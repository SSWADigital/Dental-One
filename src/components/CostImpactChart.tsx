import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CostImpactChart = () => {
  const data = [
    { name: 'Dental Brush', original: 85, landed: 102 },
    { name: 'Charmflex Regular', original: 120, landed: 142 },
    { name: 'Latex Gloves', original: 95, landed: 115 },
    { name: 'Dental Impression', original: 180, landed: 215 },
    { name: 'Sterilization Pouches', original: 65, landed: 78 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Original: ${payload[0]?.value}
          </p>
          <p className="text-sm text-green-600">
            Landed: ${payload[1]?.value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">4. Cost Impact</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="original" fill="#94a3b8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="landed" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span className="text-gray-600">Original Cost</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Landed Cost</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center mt-4">
        Comparison of original vs. landed costs
      </p>
    </div>
  );
};

export default CostImpactChart;