import React from 'react';
import { Outlet } from 'react-router-dom';
import SupplierSidebar from './SupplierSidebar';

const SupplierLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SupplierSidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default SupplierLayout;