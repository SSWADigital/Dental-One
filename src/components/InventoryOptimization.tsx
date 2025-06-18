import React from 'react';
import { Calendar, DollarSign, TrendingDown, Package } from 'lucide-react';

const InventoryOptimization = () => {
  const recommendations = [
    {
      title: 'Recommended Order Timing',
      value: 'Dec 15, 2022',
      description: 'For optimal pricing',
      detail: 'Placing your order on this date will optimize for supplier discounts and delivery timing.',
      icon: Calendar,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Bulk Order Savings',
      value: '$1,245.00',
      description: 'Potential savings',
      detail: 'Combining orders across departments can unlock volume discounts from suppliers.',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Stock Level Optimization',
      value: '15% Reduction',
      description: 'In excess inventory',
      detail: 'AI suggests optimizing par levels to reduce carrying costs while maintaining service levels.',
      icon: TrendingDown,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Supplier Recommendation',
      value: 'MediDent Supplies',
      description: 'For next bulk order',
      detail: 'Based on pricing, reliability, and current promotions for your forecasted needs.',
      icon: Package,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">💡 Inventory Optimization</h3>
        <span className="text-xs text-gray-500">Last updated: Today, 9:41 AM</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${rec.bgColor} flex-shrink-0`}>
                <rec.icon className={`w-5 h-5 ${rec.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                <div className="text-lg font-bold text-gray-900 mb-1">{rec.value}</div>
                <div className="text-sm text-gray-600 mb-2">{rec.description}</div>
                <p className="text-xs text-gray-500">{rec.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryOptimization;