import React, { useState } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { 
  ArrowLeft, 
  Upload, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Package,
  Truck,
  Clock,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  ordered: number;
  shipping: number;
  status: 'Ready' | 'Partial' | 'Out of Stock';
}

interface ShipmentData {
  carrier: string;
  trackingNumber: string;
  shippingDate: string;
  estimatedDelivery: string;
  shipmentType: 'Full Shipment' | 'Partial Shipment';
  additionalNotes: string;
}

const Shipment: React.FC = () => {
  const [selectedOrder] = useState('PO-2023-8741');
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    carrier: '',
    trackingNumber: '',
    shippingDate: '',
    estimatedDelivery: '',
    shipmentType: 'Full Shipment',
    additionalNotes: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([
    { name: 'packing-slip.pdf', size: 1200000 } as File
  ]);
  const [checklist, setChecklist] = useState({
    allItemsPackaged: false,
    shippingLabelAttached: false,
    packingSlipIncluded: false,
    orderDetailsVerified: false,
    fragileItemsSecured: false,
    confirmReady: false
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([
    'Shipping carrier is required',
    'Tracking number is required',
    'Shipping date is required',
    'Shipment checklist must be completed'
  ]);

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Sterilization Equipment',
      sku: 'SE-7798',
      ordered: 1,
      shipping: 1,
      status: 'Ready'
    },
    {
      id: '2',
      name: 'Dental Anesthetic',
      sku: 'DA-3301',
      ordered: 5,
      shipping: 5,
      status: 'Ready'
    },
    {
      id: '3',
      name: 'Composite Filling Material',
      sku: 'CFM-1122',
      ordered: 2,
      shipping: 2,
      status: 'Ready'
    },
    {
      id: '4',
      name: 'Orthodontic Brackets',
      sku: 'OB-4512',
      ordered: 3,
      shipping: 3,
      status: 'Ready'
    }
  ];

  const orderSummary = {
    totalItems: 8,
    orderValue: 2450.00,
    clinic: 'Bright Smile',
    orderDate: 'May 14, 2023'
  };

  const shippingAddress = {
    name: 'Dr. Michael Chen',
    email: 'michael@brightsmile.com',
    phone: '(510) 555-1234',
    address: '567 Orthodontic Blvd, Oakland, CA 94612'
  };

  const shipmentTimeline = [
    {
      status: 'Order Confirmed',
      timestamp: 'May 14, 2023 - 11:42 AM',
      completed: true
    },
    {
      status: 'Processing Shipment',
      timestamp: 'Now',
      completed: false
    },
    {
      status: 'Delivery',
      timestamp: 'Pending',
      completed: false
    }
  ];

  const handleInputChange = (field: keyof ShipmentData, value: string) => {
    setShipmentData(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (field: keyof typeof checklist, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [field]: checked }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
    alert('Draft saved successfully!');
  };

  const handleProcessShipment = () => {
    console.log('Processing shipment...', shipmentData);
    alert('Shipment processed successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'text-green-600 bg-green-50';
      case 'Partial': return 'text-yellow-600 bg-yellow-50';
      case 'Out of Stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <SupplierTopBar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Orders</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Process Shipment</h1>
              <p className="text-gray-600">Create shipment for purchase order {selectedOrder}</p>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-gray-900">Order {selectedOrder}</h2>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Confirmed
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Date: {orderSummary.orderDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Shipping Address
                </h3>
                <div className="text-sm space-y-2">
                  <p className="font-medium text-gray-900">{shippingAddress.address}</p>
                  <p className="text-gray-600">{shippingAddress.name}</p>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span>{shippingAddress.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>{shippingAddress.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Order Summary
                </h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{orderSummary.totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Value:</span>
                    <span className="font-medium">${orderSummary.orderValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinic:</span>
                    <span className="font-medium">{orderSummary.clinic}</span>
                  </div>
                </div>
              </div>

              {/* Shipment Timeline */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Shipment Timeline
                </h3>
                <div className="space-y-3">
                  {shipmentTimeline.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <span className={`font-medium ${item.completed ? 'text-green-600' : 'text-gray-600'}`}>
                          {item.status}
                        </span>
                        <p className="text-gray-500 text-xs">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Shipment Details & Order Items */}
            <div className="col-span-8 space-y-6">
              {/* Shipment Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipment Details</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Carrier*
                    </label>
                    <select
                      value={shipmentData.carrier}
                      onChange={(e) => handleInputChange('carrier', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a carrier</option>
                      <option value="FedEx">FedEx</option>
                      <option value="UPS">UPS</option>
                      <option value="DHL">DHL</option>
                      <option value="USPS">USPS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking Number*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      value={shipmentData.trackingNumber}
                      onChange={(e) => handleInputChange('trackingNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Date*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="yyyy / mm / dd"
                        value={shipmentData.shippingDate}
                        onChange={(e) => handleInputChange('shippingDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="yyyy / mm / dd"
                        value={shipmentData.estimatedDelivery}
                        onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Shipment Type
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipmentType"
                        value="Full Shipment"
                        checked={shipmentData.shipmentType === 'Full Shipment'}
                        onChange={(e) => handleInputChange('shipmentType', e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Full Shipment</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipmentType"
                        value="Partial Shipment"
                        checked={shipmentData.shipmentType === 'Partial Shipment'}
                        onChange={(e) => handleInputChange('shipmentType', e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Partial Shipment</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Enter any additional shipping instructions or notes"
                    value={shipmentData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Items</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-medium text-gray-700 text-sm">Item</th>
                        <th className="text-left py-3 font-medium text-gray-700 text-sm">Ordered</th>
                        <th className="text-left py-3 font-medium text-gray-700 text-sm">Shipping</th>
                        <th className="text-left py-3 font-medium text-gray-700 text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-4">
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.sku}</div>
                            </div>
                          </td>
                          <td className="py-4 text-gray-600">{item.ordered}</td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <button className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                                <span className="text-xs">-</span>
                              </button>
                              <span className="text-gray-900 font-medium">{item.shipping}</span>
                              <button className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                                <span className="text-xs">+</span>
                              </button>
                              <span className="text-xs text-gray-500 ml-2">in stock</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600 font-medium">Ready</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td className="py-4 font-medium text-gray-900">Total Items: {orderSummary.totalItems}</td>
                        <td colSpan={3} className="py-4 font-bold text-gray-900 text-right">
                          Total Value: ${orderSummary.orderValue.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Shipment Validation</h4>
                      <p className="text-yellow-700 text-sm mb-2">Please address the following issues before processing the shipment:</p>
                      <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Upload & Checklist */}
            <div className="col-span-4 space-y-6">
              {/* Upload Shipping Proof */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Shipping Proof</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Upload Files
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shipment Checklist */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Checklist</h3>
                
                <div className="space-y-4">
                  {Object.entries(checklist).map(([key, checked]) => {
                    const labels = {
                      allItemsPackaged: 'All items are properly packaged',
                      shippingLabelAttached: 'Shipping label is attached',
                      packingSlipIncluded: 'Packing slip is included',
                      orderDetailsVerified: 'Order details verified',
                      fragileItemsSecured: 'Fragile items properly secured',
                      confirmReady: 'I confirm all items are ready for shipment'
                    };

                    return (
                      <label key={key} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => handleChecklistChange(key as keyof typeof checklist, e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-sm ${checked ? 'text-gray-900' : 'text-gray-600'}`}>
                          {labels[key as keyof typeof labels]}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-3">
                  <button
                    onClick={handleSaveDraft}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={handleProcessShipment}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Process Shipment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Shipment;