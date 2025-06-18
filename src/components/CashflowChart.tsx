import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ChevronDown } from 'lucide-react';

const CashflowChart = () => {
  const data = [
    { month: 'JAN', value: 45000 },
    { month: 'FEB', value: 52000 },
    { month: 'MAR', value: 48000 },
    { month: 'APR', value: 61000 },
    { month: 'MAY', value: 55000 },
    { month: 'JUN', value: 67000 },
    { month: 'JUL', value: 71000 },
    { month: 'AUG', value: 78000 },
    { month: 'SEP', value: 82000 },
    { month: 'OCT', value: 89000 },
    { month: 'NOV', value: 95000 },
    { month: 'DEC', value: 131232 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-900 text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium">
            Total ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cashflow</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last 12 month</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Total Cash</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">$131,232</span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+4.51%</span>
        </div>
        <span className="text-xs text-gray-500">January 2022 - December 2022</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashflowChart;