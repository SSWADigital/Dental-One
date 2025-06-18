import React from 'react';
import { Package, AlertTriangle, TrendingDown, ShoppingCart } from 'lucide-react';

const StockLevelsStats = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '247',
      change: '↑ 12 since last month',
      icon: Package,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Low Stock Items',
      value: '28',
      change: '↑ 5 since last week',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Overstock Items',
      value: '15',
      change: '↓ 3 since last week',
      icon: TrendingDown,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Items to Order',
      value: '19',
      change: 'Generate PR →',
      icon: ShoppingCart,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className="text-sm text-gray-500">
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockLevelsStats;