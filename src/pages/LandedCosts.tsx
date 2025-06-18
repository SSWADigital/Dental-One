import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, HelpCircle, FileSpreadsheet, Info, Eye } from 'lucide-react';
import LandedCostsStats from '../components/LandedCostsStats';
import LandedCostCalculator from '../components/LandedCostCalculator';
import AdditionalCostsBreakdown from '../components/AdditionalCostsBreakdown';
import CostDistributionChart from '../components/CostDistributionChart';
import CostImpactChart from '../components/CostImpactChart';
import RecentLandedCostCalculations from '../components/RecentLandedCostCalculations';
import TopBar from '../components/TopBar';

const LandedCosts: React.FC = () => {
  return (
    <>
      <TopBar Title='Landed Costs' Text='Calculate and analyze the total cost of goods including all additional expenses' />
      
      <main className="flex-1 p-6">
        <LandedCostsStats />
        
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-8">
            <LandedCostCalculator />
          </div>
          <div className="col-span-4">
            <AdditionalCostsBreakdown />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-4">
            <CostDistributionChart />
          </div>
          <div className="col-span-8">
            <CostImpactChart />
          </div>
        </div>

        <RecentLandedCostCalculations />
      </main>
    </>
  );
};

export default LandedCosts;