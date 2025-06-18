// src/components/supplier/AddProductPopup.tsx
import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';

// Definisi interface Product yang minimal untuk pop-up ini
// Sesuaikan dengan kebutuhan Product interface di Product.tsx
interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  tagsInput: string; // Akan diubah menjadi array tags
  price: string; // String untuk input, akan diubah jadi number
  stock: string; // String untuk input, akan diubah jadi number
  deliveryTime: string;
  imageFile: File | null; // Untuk file gambar yang diupload
}

interface AddProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: {
    id: string; // Harus unik, bisa dari Date.now()
    name: string;
    sku: string;
    category: string;
    tags: string[];
    price: number;
    stock: number;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    deliveryTime: string;
    status: 'Active' | 'Inactive';
    image: string; // URL gambar
  }) => void;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    category: '',
    tagsInput: '',
    price: '',
    stock: '',
    deliveryTime: '',
    imageFile: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi dasar
    if (!formData.name || !formData.sku || !formData.category || !formData.price || !formData.stock || !formData.deliveryTime) {
      alert('Mohon lengkapi semua kolom wajib.');
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);
    const tags = formData.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    // Tentukan stockStatus berdasarkan jumlah stok
    let stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    if (stock > 10) { // Contoh: >10 adalah "In Stock"
      stockStatus = 'In Stock';
    } else if (stock > 0) { // Contoh: 1-10 adalah "Low Stock"
      stockStatus = 'Low Stock';
    } else { // Contoh: 0 adalah "Out of Stock"
      stockStatus = 'Out of Stock';
    }

    // Buat URL gambar sementara untuk preview atau placeholder
    const imageUrl = formData.imageFile ? URL.createObjectURL(formData.imageFile) : 'https://via.placeholder.com/100x100?text=No+Image'; // Placeholder

    const newProduct = {
      id: `PROD-${Date.now()}`, // ID unik berdasarkan timestamp
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      tags: tags,
      price: price,
      stock: stock,
      stockStatus: stockStatus,
      deliveryTime: formData.deliveryTime,
      status: 'Active' as 'Active', // Default status aktif
      image: imageUrl,
    };

    onAddProduct(newProduct); // Panggil callback untuk menambahkan produk ke state induk
    onClose(); // Tutup pop-up
    
    // Reset form setelah submit
    setFormData({
      name: '',
      sku: '',
      category: '',
      tagsInput: '',
      price: '',
      stock: '',
      deliveryTime: '',
      imageFile: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
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
                  {formData.imageFile ? (
                    <img
                      src={URL.createObjectURL(formData.imageFile)}
                      alt="Product Preview"
                      className="mx-auto h-24 w-24 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
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
                  {formData.imageFile && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, imageFile: null }))}
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
                {/* Tambahkan lebih banyak opsi kategori jika diperlukan */}
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
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPopup;