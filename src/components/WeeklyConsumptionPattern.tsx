import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const WeeklyConsumptionPattern = () => {
  const [selectedProduct, setSelectedProduct] = useState('Dental Brush');

  const data = [
    { week: 'Week 1', consumption: 35 },
    { week: 'Week 2', consumption: 42 },
    { week: 'Week 3', consumption: 38 },
    { week: 'Week 4', consumption: 45 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Consumption: {payload[0]?.value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">📊 Weekly Consumption Pattern</h3>
        <div className="relative">
          <select 
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Dental Brush</option>
            <option>Latex Gloves</option>
            <option>Sterilization Pouches</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="week" 
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
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyConsumptionPattern;