import React, { useState } from 'react';
import { X, Upload, Calendar } from 'lucide-react';

interface UploadPaymentProofPopupProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    id: string;
    supplier: string;
    supplierInitial: string;
    amount: number;
    dueDate: string;
  } | null;
  onSubmit: (data: PaymentProofData) => void;
}

interface PaymentProofData {
  referenceNumber: string;
  paymentDate: string;
  file: File | null;
  notes: string;
}

const UploadPaymentProofPopup: React.FC<UploadPaymentProofPopupProps> = ({
  isOpen,
  onClose,
  invoice,
  onSubmit
}) => {
  const [formData, setFormData] = useState<PaymentProofData>({
    referenceNumber: '',
    paymentDate: '',
    file: null,
    notes: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: keyof PaymentProofData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, file: 'Please upload a JPG, PNG, or PDF file' }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.referenceNumber.trim()) {
      newErrors.referenceNumber = 'Payment reference number is required';
    }

    if (!formData.paymentDate) {
      newErrors.paymentDate = 'Payment date is required';
    }

    if (!formData.file) {
      newErrors.file = 'Payment proof file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      referenceNumber: '',
      paymentDate: '',
      file: null,
      notes: ''
    });
    setErrors({});
    setDragActive(false);
    onClose();
  };

  const getSupplierColor = (initial: string) => {
    const colors = {
      'D': 'bg-blue-500',
      'M': 'bg-green-500',
      'O': 'bg-purple-500',
      'H': 'bg-orange-500'
    };
    return colors[initial as keyof typeof colors] || 'bg-gray-500';
  };

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Payment Proof</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Invoice Info */}
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getSupplierColor(invoice.supplierInitial)}`}>
              {invoice.supplierInitial}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{invoice.supplier}</h3>
              <p className="text-sm text-gray-600">Invoice #{invoice.id}</p>
            </div>
          </div>

          {/* Amount and Due Date */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-600">Amount Due:</span>
              <div className="font-semibold text-lg text-gray-900">
                ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Due Date:</span>
              <div className="font-semibold text-lg text-gray-900">{invoice.dueDate}</div>
            </div>
          </div>

          {/* Payment Reference Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Reference Number
            </label>
            <input
              type="text"
              placeholder="Enter reference number"
              value={formData.referenceNumber}
              onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.referenceNumber ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.referenceNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.referenceNumber}</p>
            )}
          </div>

          {/* Payment Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.paymentDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.paymentDate && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentDate}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Proof
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : errors.file 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: JPG, PNG, PDF (Max 10MB)
              </p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Browse Files
              </label>
            </div>
            {formData.file && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              placeholder="Add any additional information about this payment"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Preview & Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPaymentProofPopup;