import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ProductCatalogFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const categories = [
    { name: 'All Products', count: 1245 },
    { name: 'Dental Equipment', count: 342 },
    { name: 'Disposables', count: 289 },
    { name: 'Infection Control', count: 186 },
    { name: 'Orthodontics', count: 124 },
    { name: 'Restorative', count: 154 },
    { name: 'Anesthetics', count: 78 },
    { name: 'Equipment', count: 167 }
  ];

  const priceRanges = [
    { range: '$0 - $50', count: 245 },
    { range: '$50 - $100', count: 132 },
    { range: '$100 - $200', count: 87 },
    { range: '$200 - $500', count: 65 },
    { range: '$500+', count: 23 }
  ];

  const suppliers = [
    { name: 'DentalWorks', count: 187 },
    { name: 'MediDental', count: 154 },
    { name: 'Dentronix', count: 98 },
    { name: 'Dental Depot', count: 76 }
  ];

  const ratings = [
    { stars: '5 stars', count: 87 },
    { stars: '4 stars', count: 154 },
    { stars: '3 stars', count: 98 },
    { stars: '2 stars', count: 23 },
    { stars: '1 star', count: 12 }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">Clear All</button>
        </div>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => handleCategoryChange(category.name, e.target.checked)}
                />
                <span className="ml-3 text-sm text-gray-700">{category.name}</span>
              </label>
              <span className="text-sm text-gray-500">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{range.range}</span>
              </label>
              <span className="text-sm text-gray-500">({range.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier</h3>
        <div className="space-y-3">
          {suppliers.map((supplier, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{supplier.name}</span>
              </label>
              <span className="text-sm text-gray-500">({supplier.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-3">
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{rating.stars}</span>
              </label>
              <span className="text-sm text-gray-500">({rating.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogFilters;