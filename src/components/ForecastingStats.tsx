import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Target } from 'lucide-react';

const ForecastingStats = () => {
  const stats = [
    {
      title: 'Items Requiring Attention',
      value: '5',
      change: '↓ 2 from last week',
      subtext: 'Items below reorder threshold',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Average Monthly Usage',
      value: '$12,450',
      change: '↑ 2.5% from last month',
      subtext: 'Based on last 6 months',
      icon: TrendingUp,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Forecasted Order Value',
      value: '$8,320',
      change: 'Next 4 weeks',
      subtext: 'Based on AI prediction model',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Potential Savings',
      value: '$1,245',
      change: '15% optimization',
      subtext: 'Through bulk ordering and timing',
      icon: Target,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
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
          <div className="text-sm">
            <div className="text-gray-600 font-medium">{stat.change}</div>
            <div className="text-gray-500">{stat.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastingStats;