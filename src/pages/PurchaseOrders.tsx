import React from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import PurchaseOrdersStats from '../components/PurchaseOrdersStats';
import PurchaseOrdersTable from '../components/PurchaseOrdersTable';
import SupplierComparison from '../components/SupplierComparison';
import RecentPurchaseOrders from '../components/RecentPurchaseOrders';
import TopBar from '../components/TopBar';

const PurchaseOrders: React.FC = () => {
  return (
    <>
      <TopBar Title='Purchase Orders' Text='Convert approved PRs into Purchase Orders or generate RFQs' />

      <main className="flex-1 p-6">
        <PurchaseOrdersStats />
        <PurchaseOrdersTable />
        <SupplierComparison />
        <RecentPurchaseOrders />
      </main>
    </>
  );
};

export default PurchaseOrders;