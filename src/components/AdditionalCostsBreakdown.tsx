import React from 'react';
import { Truck, FileText, Shield, Package } from 'lucide-react';

const AdditionalCostsBreakdown = () => {
  const costTypes = [
    {
      icon: Truck,
      title: 'Transportation',
      description: 'Freight, shipping, delivery',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FileText,
      title: 'Customs & Duties',
      description: 'Import taxes, tariffs',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Shield,
      title: 'Other Expenses',
      description: 'Insurance, licensing, storage',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Additional Costs Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">2. Additional Costs</h3>
        
        <div className="space-y-4">
          {costTypes.map((cost, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <div className={`p-2 rounded-lg ${cost.bgColor}`}>
                <cost.icon className={`w-5 h-5 ${cost.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{cost.title}</h4>
                <p className="text-sm text-gray-600">{cost.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Distribution Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">3. Cost Distribution</h3>
        
        <div className="text-center text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Preview of cost allocation by category</p>
        </div>
      </div>

      {/* Cost Impact Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">4. Cost Impact</h3>
        
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xl">📊</span>
          </div>
          <p className="text-sm">Comparison of original vs. landed costs</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalCostsBreakdown;