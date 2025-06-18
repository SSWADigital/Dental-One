import React from 'react';
import ForecastingStats from '../components/ForecastingStats';
import SmartPRSuggestions from '../components/SmartPRSuggestions';
import UsageTrendsForecast from '../components/UsageTrendsForecast';
import CategoryAnalysis from '../components/CategoryAnalysis';
import WeeklyConsumptionPattern from '../components/WeeklyConsumptionPattern';
import InventoryOptimization from '../components/InventoryOptimization';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import TopBar from '../components/TopBar';

const Forecasting: React.FC = () => {
  return (
    <>

      <TopBar Title='Forecasting' Text='Predict future inventory needs and optimize stock levels' />
      
      <main className="flex-1 p-6">
        <ForecastingStats />
        <SmartPRSuggestions />
        
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-8">
            <UsageTrendsForecast />
          </div>
          <div className="col-span-4">
            <CategoryAnalysis />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <WeeklyConsumptionPattern />
          </div>
          <div className="col-span-6">
            <InventoryOptimization />
          </div>
        </div>
      </main>
    </>
  );
};

export default Forecasting;