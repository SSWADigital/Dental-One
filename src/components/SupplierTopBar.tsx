import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import UserMenu from './UserMenu';

const SupplierTopBar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
          <p className="text-gray-600">Welcome back to your supplier portal</p>
          <p className="text-sm text-gray-500">Wednesday, December 6, 2022</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Icons */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          
          {/* User Menu */}
          <UserMenu 
            userName="Darrell Steward"
            userRole="Supplier Admin"
          />
        </div>
      </div>
    </header>
  );
};

export default SupplierTopBar;