// src/components/supplier/EditProductPopup.tsx
import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  tags: string[];
  price: number;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  deliveryTime: string;
  status: 'Active' | 'Inactive';
  image: string;
}

interface EditProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product; // Product data to be edited
  onSaveProduct: (updatedProduct: Product) => void;
}

interface ProductEditFormData {
  name: string;
  sku: string;
  category: string;
  tagsInput: string;
  price: string;
  stock: string;
  deliveryTime: string;
  imageFile: File | null;
  imageUrl: string; // Current image URL
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({ isOpen, onClose, product, onSaveProduct }) => {
  const [formData, setFormData] = useState<ProductEditFormData>({
    name: product.name,
    sku: product.sku,
    category: product.category,
    tagsInput: product.tags.join(', '),
    price: product.price.toString(),
    stock: product.stock.toString(),
    deliveryTime: product.deliveryTime,
    imageFile: null, // For new upload
    imageUrl: product.image, // Current image
  });

  // Effect to update form data if the 'product' prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        tagsInput: product.tags.join(', '),
        price: product.price.toString(),
        stock: product.stock.toString(),
        deliveryTime: product.deliveryTime,
        imageFile: null,
        imageUrl: product.image,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imageFile: e.target.files![0], imageUrl: URL.createObjectURL(e.target.files![0]) }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null, imageUrl: 'https://via.placeholder.com/100x100?text=No+Image' })); // Reset to placeholder
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sku || !formData.category || !formData.price || !formData.stock || !formData.deliveryTime) {
      alert('Please fill in all required fields.');
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);
    const tags = formData.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    let stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    if (stock > 10) {
      stockStatus = 'In Stock';
    } else if (stock > 0) {
      stockStatus = 'Low Stock';
    } else {
      stockStatus = 'Out of Stock';
    }

    // In a real app, you'd upload imageFile to a server here and get a new URL
    // For this demo, we'll use the temporary URL or existing URL
    const finalImageUrl = formData.imageFile ? formData.imageUrl : product.image;

    const updatedProduct: Product = {
      ...product, // Keep existing properties not in form (like status)
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      tags: tags,
      price: price,
      stock: stock,
      stockStatus: stockStatus,
      deliveryTime: formData.deliveryTime,
      image: finalImageUrl, // Use the updated or existing image
    };

    onSaveProduct(updatedProduct);
    onClose();
  };

  if (!isOpen || !product) return null; // Ensure product data is available

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product: {product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-5 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src={formData.imageUrl || 'https://via.placeholder.com/100x100?text=No+Image'}
                    alt="Product Preview"
                    className="mx-auto h-24 w-24 object-cover rounded-md mb-2"
                  />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload-edit"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Change image</span>
                      <input
                        id="file-upload-edit"
                        name="imageFile"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {formData.imageUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 text-xs text-red-600 hover:text-red-800"
                    >
                      Remove image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Item Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Dental Curing Light"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., DCL-001"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="Equipment">Equipment</option>
                <option value="Supplies">Supplies</option>
                <option value="Materials">Materials</option>
                <option value="Medicine">Medicine</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tagsInput" className="block text-sm font-medium text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tagsInput"
                id="tagsInput"
                value={formData.tagsInput}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Surgical, Premium, Autoclavable"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., 50"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Estimated Delivery Time */}
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">
                Estimated Delivery Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="deliveryTime"
                id="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., 3-5 business days"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPopup;