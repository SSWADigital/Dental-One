import React from 'react';
import TopBar from '../components/TopBar';
import PurchaseRequestForm from '../components/PurchaseRequestForm';
import PurchaseRequestHistory from '../components/PurchaseRequestHistory';
import StatusNotification from '../components/StatusNotification';

const PurchaseRequest: React.FC = () => {
  return (
    <>
      <TopBar Title='Purchase Request' Text='Create and manage purchase requests for clinic inventory'/>
      
      <main className="flex-1 p-6">
        {/* <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Purchase Request</h1>
          <p className="text-gray-600">Create and manage purchase requests for clinic inventory</p>
          <p className="text-sm text-gray-500">Wednesday, December 6, 2022</p>
        </div> */}

        <div className="space-y-6">
          <PurchaseRequestForm />
          <PurchaseRequestHistory />
        </div>
      </main>

      <StatusNotification />
    </>
  );
};

export default PurchaseRequest;