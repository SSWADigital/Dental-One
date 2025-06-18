// src/components/supplier/ProductDetailsSidebar.tsx
import React from 'react';
import { X, Clock, Package, AlertTriangle, CheckCircle, Edit, Copy, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  tags: string[];
  price: number;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  deliveryTime: string;
  status: 'Active' | 'Inactive';
  image: string;
}

interface ProductDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null; // Product to display
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
}

const ProductDetailsSidebar: React.FC<ProductDetailsSidebarProps> = ({ isOpen, onClose, product, onEdit, onDelete }) => {
  if (!isOpen || !product) return null;

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600';
      case 'Low Stock': return 'text-orange-600';
      case 'Out of Stock': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatusBgColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100';
      case 'Low Stock': return 'bg-orange-100';
      case 'Out of Stock': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <X className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Product Details</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">{product.sku}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(product.stockStatus)} ${getStockStatusBgColor(product.stockStatus)} flex items-center space-x-1`}>
              {getStockStatusIcon(product.stockStatus)}
              <span>{product.stockStatus}</span>
            </div>
            <span className="text-sm text-gray-600">Stock: {product.stock} units</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Delivery: {product.deliveryTime}</span>
          </div>
          <p className={`text-sm font-medium ${product.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            Status: {product.status}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Price</h4>
          <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons at the bottom of the sidebar */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            onClick={() => onEdit(product.id)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSidebar;