import React from 'react';
import { DollarSign, TrendingUp, Package, Clock } from 'lucide-react';

const LandedCostsStats = () => {
  const stats = [
    {
      title: 'Total Landed Costs',
      value: '$68,452.75',
      change: '+2.3% vs. last month',
      icon: DollarSign,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Additional Costs',
      value: '18.7%',
      change: '+3.1% vs. last month',
      icon: TrendingUp,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'POs Processed',
      value: '42',
      change: '+8 vs. last month',
      icon: Package,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Calculations',
      value: '7',
      change: 'Updated 10 minutes ago',
      icon: Clock,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
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

export default LandedCostsStats;