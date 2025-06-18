import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';

interface CustomProduct {
  id: string;
  name: string;
  sku: string;
  noAKL: string;
  category: string;
  price: number;
  supplier: string;
  imageUrl?: string;
  isUrgentNeed?: boolean;
}

interface AddCustomProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: CustomProduct) => void;
}

const AddCustomProductPopup: React.FC<AddCustomProductPopupProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [activeTab, setActiveTab] = useState('Dental Items');
  const [formData, setFormData] = useState({
    itemName: '',
    sku: '',
    suppliers: '',
    price: '',
    currency: 'USD',
    noAKL: '',
    uploadImage: false,
    markAsUrgent: false,
    imageFile: null as File | null,
  });
  const [selectedCategory, setSelectedCategory] = useState('Dental Instruments');

  const [existingProducts, setExistingProducts] = useState<CustomProduct[]>([
    { id: 'DM-2023-001', name: 'Dental Mirror', sku: 'DM-2023-001', noAKL: 'AKL 92383', category: 'Dental Instruments', price: 12.50, supplier: 'Cahaya Asia' },
    { id: 'DF-2023-002', name: 'Dental Forceps', sku: 'DF-2023-002', noAKL: 'AKL 393049', category: 'Dental Instruments', price: 45.00, supplier: 'Nazi Great' },
    { id: 'DE-2023-003', name: 'Dental Explorer', sku: 'DE-2023-003', noAKL: 'AKL 303940', category: 'Dental Instruments', price: 18.75, supplier: 'Anama key' },
    // Adding more sample products to ensure scrolling is visible
    { id: 'GM-2024-001', name: 'Gum Massager', sku: 'GM-2024-001', noAKL: 'AKL 112233', category: 'Dental Instruments', price: 22.00, supplier: 'Cahaya Asia' },
    { id: 'BW-2024-002', name: 'Bleaching Whitener', sku: 'BW-2024-002', noAKL: 'AKL 445566', category: 'Restorative', price: 65.00, supplier: 'Nazi Great' },
    { id: 'IC-2024-003', name: 'Instrument Cleaner', sku: 'IC-2024-003', noAKL: 'AKL 778899', category: 'Infection Control', price: 30.00, supplier: 'Anama key' },
    { id: 'OM-2024-004', name: 'Oral Mouthwash (Large)', sku: 'OM-2024-004', noAKL: 'AKL 101112', category: 'Disposables', price: 10.00, supplier: 'Cahaya Asia' },
    { id: 'LUX-2024-005', name: 'Luxury Dental Chair', sku: 'LUX-2024-005', noAKL: 'N/A', category: 'Furniture', price: 1500.00, supplier: 'Modern Furnishings' },
    { id: 'ADAPT-2024-006', name: 'Adapter Cable USB-C', sku: 'ADAPT-2024-006', noAKL: 'N/A', category: 'IT & Peripherals', price: 15.00, supplier: 'Tech Supply' },
  ]);

  const dentalCategories = [
    { id: 'dental-instruments', label: 'Dental Instruments', icon: '🦷' },
    { id: 'disposables', label: 'Disposables', icon: '🧤' },
    { id: 'infection-control', label: 'Infection Control', icon: '🧽' },
    { id: 'office-supplies', label: 'Office Supplies', icon: '📋' },
    { id: 'it-peripherals', label: 'IT & Peripherals', icon: '💻' },
    { id: 'cleaning-equipment', label: 'Cleaning Equipment', icon: '🧹' }
  ];

  const nonDentalCategories = [
    { id: 'orthodontics', label: 'Orthodontics', icon: '⚙️' },
    { id: 'restorative', label: 'Restorative', icon: '🦷' },
    { id: 'anesthetics', label: 'Anesthetics', icon: '💉' },
    { id: 'furniture', label: 'Furniture', icon: '🪑' },
    { id: 'miscellaneous', label: 'Miscellaneous', icon: '📦' },
    { id: 'others', label: 'Others', icon: '📋' }
  ];

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('imageFile', e.target.files[0]);
    } else {
      handleInputChange('imageFile', null);
    }
  };

  const handleRemoveImage = () => {
    handleInputChange('imageFile', null);
    handleInputChange('uploadImage', false); // Uncheck the checkbox when removing
  };

  const handleAddProduct = () => {
    if (!formData.itemName || !formData.sku || !formData.suppliers || !formData.price ||
        (activeTab === 'Dental Items' && !formData.noAKL)) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct: CustomProduct = {
      id: formData.sku,
      name: formData.itemName,
      sku: formData.sku,
      noAKL: activeTab === 'Dental Items' ? formData.noAKL : 'N/A',
      category: selectedCategory,
      price: parseFloat(formData.price),
      supplier: formData.suppliers,
      isUrgentNeed: formData.markAsUrgent,
      imageUrl: formData.uploadImage && formData.imageFile ? URL.createObjectURL(formData.imageFile) : undefined
    };

    onAddProduct(newProduct);
    
    // Add the newly created product to the existing products list for display in the table
    setExistingProducts(prev => [newProduct, ...prev]);

    // Reset form
    setFormData({
      itemName: '',
      sku: '',
      suppliers: '',
      price: '',
      currency: 'USD',
      noAKL: '',
      uploadImage: false,
      markAsUrgent: false,
      imageFile: null,
    });
    setSelectedCategory(activeTab === 'Dental Items' ? 'Dental Instruments' : 'Orthodontics');
  };

  const handleAddToCatalog = () => {
    handleAddProduct();
    // onClose();
  };

  const handleDeleteProduct = (productId: string) => {
    setExistingProducts(prev => prev.filter(product => product.id !== productId));
  };

  const getSupplierColor = (supplier: string) => {
    const colors = {
      'Cahaya Asia': 'text-green-600',
      'Nazi Great': 'text-blue-600',
      'Anama key': 'text-purple-600',
      'Modern Furnishings': 'text-indigo-600', // Added for new sample data
      'Tech Supply': 'text-orange-600',      // Added for new sample data
    };
    return colors[supplier as keyof typeof colors] || 'text-gray-600';
  };

  React.useEffect(() => {
    if (activeTab === 'Dental Items') {
      setSelectedCategory('Dental Instruments');
      setFormData(prev => ({ ...prev, noAKL: '' }));
    } else {
      setSelectedCategory('Orthodontics');
      setFormData(prev => ({ ...prev, noAKL: 'N/A' }));
    }
  }, [activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90vw] h-[85vh] max-w-6xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Custom Product</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto"> {/* This div now handles the main content scrolling */}
          {/* Information Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Information</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU Code"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suppliers <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select Suppliers"
                  value={formData.suppliers}
                  onChange={(e) => handleInputChange('suppliers', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="IDR">IDR</option>
                </select>
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              
              <div className="flex space-x-6 mb-4">
                <button
                  onClick={() => setActiveTab('Dental Items')}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'Dental Items'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dental Items
                </button>
                <button
                  onClick={() => setActiveTab('Non-Dental Items')}
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${
                    activeTab === 'Non-Dental Items'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Non-Dental Items
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(activeTab === 'Dental Items' ? dentalCategories : nonDentalCategories).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.label)}
                    className={`flex items-center space-x-2 p-3 border rounded-lg text-left transition-colors ${
                      selectedCategory === category.label
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {activeTab === 'Dental Items' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No AKL (NIE) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter AKL Number"
                    value={formData.noAKL}
                    onChange={(e) => handleInputChange('noAKL', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              <div className={activeTab === 'Dental Items' ? '' : 'col-span-2'}> 
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Options</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.uploadImage}
                      onChange={(e) => handleInputChange('uploadImage', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Upload Image</span>
                  </label>
                  {formData.uploadImage && (
                    <div className="flex items-center space-x-2 p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload-input"
                      />
                      <label
                        htmlFor="image-upload-input"
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                      >
                        <Upload className="w-4 h-4 text-gray-600" />
                        <span>{formData.imageFile ? formData.imageFile.name : 'Choose File'}</span>
                      </label>
                      {formData.imageFile && (
                        <button
                          onClick={handleRemoveImage}
                          className="p-1 text-red-500 hover:text-red-700 rounded-full"
                          aria-label="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {!formData.imageFile && <span className="text-xs text-gray-500">No file chosen</span>}
                    </div>
                  )}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.markAsUrgent}
                      onChange={(e) => handleInputChange('markAsUrgent', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Mark as Urgent Need
                      <span className="text-gray-500 text-xs ml-1">(Prioritize this item in your purchase requests)</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddProduct}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* List Product Section */}
          <div className="p-6"> {/* Removed flex-1 and overflow-y-auto from here */}
            <h3 className="text-lg font-medium text-gray-900 mb-4">List Product</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Product Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">No AKL</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {existingProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600">{product.sku}</td>
                      <td className="py-3 px-4 text-gray-600">{product.noAKL}</td>
                      <td className="py-3 px-4 text-gray-600">{product.category}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${getSupplierColor(product.supplier)}`}>
                          {product.supplier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-500 flex items-center">
              <span className="w-4 h-4 bg-gray-300 rounded-full mr-2"></span>
              You can edit this product details later
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCatalog}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomProductPopup;