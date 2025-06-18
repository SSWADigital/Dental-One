import React from 'react';
import { Star, ChevronDown } from 'lucide-react';

const SuppliersRating = () => {
  const treatments = [
    { name: 'Scaling Teeth', rating: 4.7 },
    { name: 'Tooth Extraction', rating: 4.4 },
    { name: 'General Checkup', rating: 4.6 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Suppliers Rating</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">This month</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">21</div>
          <div className="text-sm text-gray-500">36.52%</div>
          <div className="text-sm text-gray-600">New patients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">142</div>
          <div className="text-sm text-gray-500">61.41%</div>
          <div className="text-sm text-gray-600">Returning patients</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: '36.52%' }}></div>
        </div>
      </div>

      {/* Popular Treatment */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Popular Treatment</h4>
        <div className="space-y-3">
          {treatments.map((treatment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-700">{treatment.name}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{treatment.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersRating;