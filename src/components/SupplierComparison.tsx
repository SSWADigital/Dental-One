import React from 'react';
import { Star, Info } from 'lucide-react';

const SupplierComparison = () => {
  const suppliers = [
    {
      name: 'Cobra',
      logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.9,
      price: 842.50,
      delivery: '2-3 days',
      qualityScore: '98/100',
      preferred: true,
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'MedDent',
      logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.7,
      price: 836.75,
      delivery: '3-5 days',
      qualityScore: '95/100',
      preferred: false,
      buttonColor: 'bg-gray-300 hover:bg-gray-400'
    },
    {
      name: 'DentSupply',
      logo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      rating: 4.5,
      price: 829.99,
      delivery: '4-6 days',
      qualityScore: '92/100',
      preferred: false,
      buttonColor: 'bg-gray-300 hover:bg-gray-400'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Supplier Comparison for PR-2022-0041</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View all suppliers →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suppliers.map((supplier, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 relative ${
              supplier.preferred ? 'border-green-300 bg-green-50' : 'border-gray-200'
            }`}
          >
            {supplier.preferred && (
              <div className="absolute top-3 right-3">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Preferred
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {supplier.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(supplier.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-medium">${supplier.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Delivery:</span>
                <span className="font-medium">{supplier.delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Quality Score:</span>
                <span className="font-medium">{supplier.qualityScore}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className={`flex-1 py-2 px-4 text-white rounded-lg font-medium transition-colors ${supplier.buttonColor}`}>
                View Catalog
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierComparison;