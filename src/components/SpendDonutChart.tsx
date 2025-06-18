import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';

const SpendDonutChart = () => {
  const data = [
    { name: 'Rental Cost', value: 30, amount: 26000, color: '#ec4899' },
    { name: 'Wages', value: 22, amount: 16500, color: '#06b6d4' },
    { name: 'Medical Equipment', value: 20, amount: 15640, color: '#8b5cf6' },
    { name: 'Supplies', value: 18, amount: 13564, color: '#84cc16' },
    { name: 'Promotion Costs', value: 8, amount: 6464, color: '#f59e0b' },
    { name: 'Other', value: 2, amount: 1616, color: '#6b7280' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">${data.amount.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Spend</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last 6 months</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500">Total Spend</span>
            <span className="text-xl font-bold text-gray-900">$80,832</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Expense */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">TOP EXPENSE</h4>
        <div className="grid grid-cols-2 gap-4">
          {data.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendDonutChart;