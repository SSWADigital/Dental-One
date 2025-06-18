import React from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import UserMenu from './UserMenu';

// TopBar component for the dashboard header

interface TopBarProps {
  Title?: string;
  Text?: string;
  Date?: string;
  // Define any props if needed
}

const TopBar: React.FC<TopBarProps> = ({ Title, Text, Date }) => {
// const TopBar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{Title}</h1>
          <p className="text-gray-600">{Text}</p>
          <p className="text-sm text-gray-500">{Date}</p>
        </div>
        
        <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for anything here..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Icons and Profile */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-white bg-blue-500 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              {/* <div className="flex items-center space-x-3">
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
              </div> */}
              <UserMenu />
            </div>
          </div>
      </div>
    </header>
  );
};

export default TopBar;