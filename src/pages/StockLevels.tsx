import React, { useState } from 'react';
import StockLevelsStats from '../components/StockLevelsStats';
import StockStatusOverview from '../components/StockStatusOverview';
import StockHealthScore from '../components/StockHealthScore';
import AIInsights from '../components/AIInsights';
import InventoryTable from '../components/InventoryTable';
import LowStockItems from '../components/LowStockItems';
import { Search, Bell, Settings, ChevronDown, BarChart3, FileTerminal as FileTransfer, Clock } from 'lucide-react';
import TopBar from '../components/TopBar';

const StockLevels: React.FC = () => {
  const [activeView, setActiveView] = useState('Table View');

  return (
    <>
      <TopBar Title='Stock Levels' Text='Monitor and manage inventory across all clinic branches' />


      {/* View Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Set Par Levels</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <FileTransfer className="w-4 h-4" />
              <span>Stock Transfer</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Clock className="w-4 h-4" />
              <span>Schedule Stock Count</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Quick Generate PR
            </button>
          </div>
        </div>
      </div>
      
      <main className="flex-1 p-6">
        <StockLevelsStats />
        
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-8">
            <StockStatusOverview />
          </div>
          <div className="col-span-4">
            <StockHealthScore />
          </div>
        </div>

        <AIInsights />
        
        {activeView === 'Table View' ? (
          <InventoryTable />
        ) : (
          <LowStockItems />
        )}
      </main>
    </>
  );
};

export default StockLevels;