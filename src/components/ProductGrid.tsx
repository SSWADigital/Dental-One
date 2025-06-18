import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const recommendedProducts = [
    {
      id: 'DB-1001',
      name: 'Premium Dental Brush',
      supplier: 'DentalWorks',
      price: 12.50,
      rating: 4.7,
      reviewCount: 32,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isRecommended: true,
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 'NG-2045',
      name: 'Nitrile Gloves (Box)',
      supplier: 'MediDental',
      price: 15.00,
      rating: 4.5,
      reviewCount: 48,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isRecommended: true,
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'DM-4102',
      name: 'Dental Impression Material',
      supplier: 'DentalWorks',
      price: 45.00,
      rating: 4.8,
      reviewCount: 19,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isRecommended: true,
      backgroundColor: 'bg-yellow-100'
    }
  ];

  const allProducts = [
    {
      id: 'DB-1001',
      name: 'Premium Dental Brush',
      supplier: 'DentalWorks',
      price: 12.50,
      rating: 4.7,
      reviewCount: 32,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 'NG-2045',
      name: 'Nitrile Gloves (Box)',
      supplier: 'MediDental',
      price: 15.00,
      rating: 4.5,
      reviewCount: 48,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      backgroundColor: 'bg-gray-100'
    },
    {
      id: 'CR-3078',
      name: 'Charmflex Regular',
      supplier: 'Dentronix',
      price: 8.75,
      rating: 4.3,
      reviewCount: 27,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      backgroundColor: 'bg-white'
    },
    {
      id: 'DM-4102',
      name: 'Dental Impression Material',
      supplier: 'DentalWorks',
      price: 45.00,
      rating: 4.8,
      reviewCount: 19,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      backgroundColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="p-6">
      {/* Recommended Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <span className="text-sm text-gray-500">Showing 1-12 of 1,245 products</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50">
            <span>‹</span>
          </button>
          <div className="flex space-x-1">
            <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm">1</button>
            <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
            <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">24</button>
          </div>
          <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;