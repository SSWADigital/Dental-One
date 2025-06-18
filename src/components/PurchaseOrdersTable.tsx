import React, { useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import CreatePurchaseOrderPopup from './CreatePurchaseOrderPopup';

const PurchaseOrdersTable = () => {
  const [activeTab, setActiveTab] = useState('All PRs');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreatePOPopup, setShowCreatePOPopup] = useState(false);
  const [selectedPR, setSelectedPR] = useState<any>(null);

  const tabs = ['All PRs', 'Dental Equipment', 'Supplies', 'Office', 'Lab Materials'];

  const purchaseRequests = [
    {
      id: 'APR-2022-0041',
      department: 'General Dentistry',
      items: 8,
      totalValue: 842.50,
      requiredBy: 'Dec 12, 2022',
      requestedBy: 'Sarah Johnson',
      selected: true,
      itemsDetail: [
        {
          id: '1',
          name: 'Dental Composite Resin',
          quantity: 2,
          unitPrice: 125.00,
          totalPrice: 250.00
        },
        {
          id: '2',
          name: 'Dental Impression Material',
          quantity: 3,
          unitPrice: 97.50,
          totalPrice: 292.50
        },
        {
          id: '3',
          name: 'Dental Curing Light',
          quantity: 1,
          unitPrice: 245.00,
          totalPrice: 245.00
        },
        {
          id: '4',
          name: 'Dental Burs Set',
          quantity: 2,
          unitPrice: 27.50,
          totalPrice: 55.00
        }
      ]
    },
    {
      id: 'PR-2022-0039',
      department: 'Pediatric Dentistry',
      items: 12,
      totalValue: 1245.00,
      requiredBy: 'Dec 10, 2022',
      requestedBy: 'Dr. Michael Chen',
      selected: true,
      itemsDetail: []
    },
    {
      id: 'PR-2022-0038',
      department: 'Dental Surgery',
      items: 6,
      totalValue: 532.25,
      requiredBy: 'Dec 8, 2022',
      requestedBy: 'Dr. Lisa Wang',
      selected: false,
      itemsDetail: []
    }
  ];

  const supplierData = {
    name: 'Cobra',
    logo: '',
    rating: 4.9,
    isPreferred: true,
    estimatedDelivery: '2-3 days',
    qualityScore: '98/100',
    contact: 'sales@cobra-dental.com'
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(purchaseRequests.map(pr => pr.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const isSelected = (id: string) => selectedItems.includes(id);
  const selectedCount = selectedItems.length;

  const handleCreatePO = (pr: any) => {
    setSelectedPR(pr);
    setShowCreatePOPopup(true);
  };

  const handleConfirmCreatePO = () => {
    console.log('PO created for:', selectedPR?.id);
    alert(`Purchase Order created successfully for ${selectedPR?.id}`);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        {/* Tabs */}
        <div className="flex space-x-8 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Selection and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCount === purchaseRequests.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Select All
              </span>
            </label>
            <span className="text-sm text-gray-500">
              {selectedCount} PRs selected
            </span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Generate RFQ
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create All PO
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">PR ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">DEPARTMENT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ITEMS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL VALUE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">REQUIRED BY</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRequests.map((pr) => (
                <tr key={pr.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected(pr.id)}
                      onChange={(e) => handleSelectItem(pr.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                      {pr.id}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{pr.department}</td>
                  <td className="py-4 px-4 text-gray-600">{pr.items} items</td>
                  <td className="py-4 px-4 font-medium text-gray-900">${pr.totalValue.toFixed(2)}</td>
                  <td className="py-4 px-4 text-gray-600">{pr.requiredBy}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleCreatePO(pr)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Create PO
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Purchase Order Popup */}
      <CreatePurchaseOrderPopup
        isOpen={showCreatePOPopup}
        onClose={() => setShowCreatePOPopup(false)}
        prDetails={{
          id: selectedPR?.id || '',
          requestedBy: selectedPR?.requestedBy || '',
          department: selectedPR?.department || '',
          dateRequired: selectedPR?.requiredBy || '',
          totalValue: selectedPR?.totalValue || 0,
          items: selectedPR?.itemsDetail || []
        }}
        supplier={supplierData}
        onConfirm={handleConfirmCreatePO}
      />
    </>
  );
};

export default PurchaseOrdersTable;