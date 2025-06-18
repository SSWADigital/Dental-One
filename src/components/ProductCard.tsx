import React from 'react';
import { Heart, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  supplier: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  isRecommended?: boolean;
  backgroundColor?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  supplier,
  price,
  rating,
  reviewCount,
  image,
  isRecommended = false,
  backgroundColor = 'bg-gray-100'
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`relative h-48 ${backgroundColor} flex items-center justify-center`}>
        {isRecommended && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Recommended
            </span>
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">{id}</p>
          <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
          <p className="text-xs text-gray-500">{supplier}</p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
        
        <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
          Add to Purchase Request
        </button>
      </div>
    </div>
  );
};

export default ProductCard;