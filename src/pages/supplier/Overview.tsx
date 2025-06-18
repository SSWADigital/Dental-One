import React from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';

const Overview: React.FC = () => {
  const stats = [
    {
      title: 'Active Orders',
      value: '24',
      change: '+12%',
      changeText: 'from last month',
      icon: Package,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Revenue',
      value: '$34,250',
      change: '+8.2%',
      changeText: 'from last month',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      change: '+2.1%',
      changeText: 'from last quarter',
      icon: TrendingUp,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Clinics',
      value: '18',
      change: '+3',
      changeText: 'new this month',
      icon: Users,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <>
      <SupplierTopBar />
      
      <main className="flex-1 p-6 bg-gray-50">
        {/* Stats Grid */}
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

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Supplier Portal</h2>
          <p className="text-gray-600 mb-6">
            Manage your products, track orders, and analyze your performance all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View Statistics
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Manage Products
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Overview;