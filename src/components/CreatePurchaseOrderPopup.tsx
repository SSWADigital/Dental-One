import React, { useState } from 'react';
import { X, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { useUserSettings } from '../App';

interface PRItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface PRDetails {
  id: string;
  requestedBy: string;
  department: string;
  dateRequired: string;
  totalValue: number;
  items: PRItem[];
}

interface Supplier {
  name: string;
  logo: string;
  rating: number;
  isPreferred: boolean;
  estimatedDelivery: string;
  qualityScore: string;
  contact: string;
}

interface CreatePurchaseOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  prDetails: PRDetails;
  supplier: Supplier;
  onConfirm: () => void;
}

const CreatePurchaseOrderPopup: React.FC<CreatePurchaseOrderPopupProps> = ({
  isOpen,
  onClose,
  prDetails,
  supplier,
  onConfirm
}) => {
  const { settings: userSettings, loading: settingsLoading } = useUserSettings();
  const currency = userSettings?.currency || 'IDR';
  const language = userSettings?.language || 'id-ID';
  const currencyFormatter = new Intl.NumberFormat(language, { style: 'currency', currency });
  const [isCreating, setIsCreating] = useState(false);

  if (settingsLoading) return null;

  const handleConfirm = async () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      onConfirm();
      setIsCreating(false);
      onClose();
    }, 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Purchase Order: {prDetails.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* PR Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">PR Details</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Purchase Request</span>
                  <div className="text-blue-600 font-medium">{prDetails.id}</div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Requested By</span>
                  <div className="font-medium text-gray-900">{prDetails.requestedBy}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Total Value</span>
                  <div className="text-xl font-bold text-gray-900">{currencyFormatter.format(prDetails.totalValue)}</div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Department</span>
                  <div className="font-medium text-gray-900">{prDetails.department}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Date Required</span>
                  <div className="font-medium text-gray-900">{prDetails.dateRequired}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Supplier</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                    {supplier.isPreferred && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Preferred</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(supplier.rating)}
                    <span className="text-sm font-medium ml-1">{supplier.rating}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Estimated Delivery</span>
                      <div className="font-medium text-gray-900">{supplier.estimatedDelivery}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Quality Score</span>
                      <div className="font-medium text-gray-900">{supplier.qualityScore}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-gray-500 text-sm">Contact</span>
                    <div className="font-medium text-gray-900">{supplier.contact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Items Details</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">ITEM NAME</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">QUANTITY</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">UNIT PRICE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">TOTAL PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {prDetails.items.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-3 px-4 font-medium text-gray-900">{item.name}</td>
                      <td className="py-3 px-4 text-gray-600">{item.quantity}</td>
                      <td className="py-3 px-4 text-gray-600">{currencyFormatter.format(item.unitPrice)}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{currencyFormatter.format(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={3} className="py-3 px-4 font-medium text-gray-900 text-right">Total</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{currencyFormatter.format(prDetails.totalValue)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 text-sm">
                Creating this PO will update inventory systems and notify the supplier automatically.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isCreating}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isCreating}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <span>Confirm and Create PO</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrderPopup;