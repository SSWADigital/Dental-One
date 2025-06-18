import React, { useState } from 'react';
import { Search, Grid, List, ChevronDown } from 'lucide-react';

const ProductCatalogHeader = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Newest First');

  const categoryTabs = [
    'All', 'Brushes', 'Gloves', 'Instruments', 'Anesthetics', 
    'Restorative', 'Orthodontics', 'Infection Control', 'Equipment'
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600">1,245 products</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or key..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Icons and Profile */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-white bg-blue-500 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Darrell Steward</p>
                <p className="text-xs text-gray-500">Super admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Filters</option>
                <option>Price Range</option>
                <option>Supplier</option>
                <option>Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort:</span>
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Name A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-6 overflow-x-auto">
        {categoryTabs.map((tab, index) => (
          <button
            key={index}
            className={`whitespace-nowrap pb-3 px-1 text-sm font-medium transition-colors ${
              index === 0
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogHeader;