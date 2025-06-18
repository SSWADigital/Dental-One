import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UsageTrendsForecast = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  const data = [
    { month: 'Jan', actual: 65, forecast: 68 },
    { month: 'Feb', actual: 59, forecast: 62 },
    { month: 'Mar', actual: 80, forecast: 78 },
    { month: 'Apr', actual: 81, forecast: 79 },
    { month: 'May', actual: 56, forecast: 58 },
    { month: 'Jun', actual: 55, forecast: 57 },
    { month: 'Jul', actual: 40, forecast: 42 },
    { month: 'Aug', actual: 45, forecast: 47 },
    { month: 'Sep', actual: 65, forecast: 68 },
    { month: 'Oct', actual: 70, forecast: 73 },
    { month: 'Nov', actual: 75, forecast: 78 },
    { month: 'Dec', actual: null, forecast: 82 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'actual' ? 'Actual Usage' : 'Forecasted Usage'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">📈 Usage Trends & Forecast</h3>
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {['Weekly', 'Monthly', 'Quarterly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
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
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Actual Usage"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#06b6d4"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              name="Forecasted Usage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">Actual Usage</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span className="text-gray-600">Forecasted Usage</span>
        </div>
      </div>
    </div>
  );
};

export default UsageTrendsForecast;