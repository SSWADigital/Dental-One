import React from 'react';
import { Clock, FileText, TrendingUp, DollarSign } from 'lucide-react';

const PurchaseOrdersStats = () => {
  const stats = [
    {
      title: 'Pending PRs',
      value: '12',
      change: '↑ 8%',
      changeText: 'from last week',
      icon: Clock,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending POs',
      value: '5',
      change: '↑ 12%',
      changeText: 'from last week',
      icon: FileText,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Processing Time',
      value: '1.8 days',
      change: '↑ 0.5 days',
      changeText: 'from last month',
      icon: TrendingUp,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total PO Value',
      value: '$24,850',
      change: '↑ 15%',
      changeText: 'from last month',
      icon: DollarSign,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
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
          <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium">{stat.change}</span>
            <span className="text-gray-500 ml-1">{stat.changeText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseOrdersStats;