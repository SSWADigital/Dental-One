import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const IncomeExpenseChart = () => {
  const data = [
    { month: 'JAN', income: 1200, expense: 800 },
    { month: 'FEB', income: 1400, expense: 900 },
    { month: 'MAR', income: 1600, expense: 700 },
    { month: 'APR', income: 1300, expense: 1200 },
    { month: 'MAY', income: 1500, expense: 1100 },
    { month: 'JUN', income: 1412, expense: 612 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-green-600">
            Income: ${payload[0]?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-yellow-600">
            Expense: ${payload[1]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Income & Expense</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last 6 months</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Income</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">$1,412</span>
            <span className="text-sm font-medium text-green-600">+4.51%</span>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Total Expenses</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">$612.34</span>
            <span className="text-sm font-medium text-red-600">-2.41%</span>
          </div>
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="expense" fill="#f59e0b" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;