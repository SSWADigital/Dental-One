import React, { useState } from 'react';
import { MapPin, Search, Plus, Minus, Info, ChevronRight } from 'lucide-react';
import ProductCatalogPopup from './ProductCatalogPopup';

interface Product {
  id: string;
  name: string;
  sku: string;
  supplier: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
  description: string;
}

interface RequestItem {
  id: number;
  name: string;
  sku: string;
  supplier: string;
  stockAvail: number;
  quantity: number;
  unitPrice: number;
  total: number;
}

const PurchaseRequestForm = () => {
  const [department, setDepartment] = useState('Dental Surgery');
  const [requiredBy, setRequiredBy] = useState('Dec 15, 2022');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCatalogPopup, setShowCatalogPopup] = useState(false);

  const [items, setItems] = useState<RequestItem[]>([
    {
      id: 1,
      name: 'Dental Brush',
      sku: 'DB-1001',
      supplier: 'Cobra Dental Indonesia',
      stockAvail: 3,
      quantity: 10,
      unitPrice: 12.50,
      total: 125.00
    },
    {
      id: 2,
      name: 'Charmflex Regular',
      sku: 'CR-2034',
      supplier: 'Cobra Dental Indonesia',
      stockAvail: 2,
      quantity: 15,
      unitPrice: 8.75,
      total: 131.25
    },
    {
      id: 3,
      name: 'Latex Gloves (Box)',
      sku: 'LG-3045',
      supplier: 'Cobra Dental Indonesia',
      stockAvail: 5,
      quantity: 20,
      unitPrice: 15.00,
      total: 300.00
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  const handleAddFromCatalog = (product: Product, quantity: number) => {
    const newItem: RequestItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      name: product.name,
      sku: product.sku,
      supplier: product.supplier,
      stockAvail: product.stock,
      quantity: quantity,
      unitPrice: product.price,
      total: quantity * product.price
    };
    
    setItems([...items, newItem]);
  };

  const handleSearchClick = () => {
    setShowCatalogPopup(true);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  const getStockColor = (stock: number) => {
    if (stock <= 2) return 'text-red-600 bg-red-50';
    if (stock <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Purchase Request</h2>
          <div className="flex space-x-3">
            {/* <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              AI Suggestions
            </button> */}
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Save Draft
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Dental Surgery</option>
              <option>General Dentistry</option>
              <option>Orthodontics</option>
              <option>Pediatric Dentistry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required By</label>
            <input
              type="date"
              value="2022-12-15"
              onChange={(e) => setRequiredBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location / Delivery Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter delivery location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes/Purpose</label>
          <textarea
            placeholder="Enter request purpose or additional notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Product Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search product catalog or enter SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleSearchClick}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ITEM NAME</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">SKU</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Supplier</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Stock Avail</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">QUANTITY</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">UNIT PRICE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      {item.name === 'Charmflex Regular' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      )}
                      {item.name === 'Latex Gloves (Box)' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      )}
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{item.sku}</td>
                  <td className="py-4 px-4 text-gray-600">{item.supplier}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(item.stockAvail)}`}>
                      {item.stockAvail}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (11%):</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Submit PR
          </button>
        </div>
      </div>

      {/* Product Catalog Popup */}
      <ProductCatalogPopup
        isOpen={showCatalogPopup}
        onClose={() => setShowCatalogPopup(false)}
        onAddToRequest={handleAddFromCatalog}
      />
    </>
  );
};

export default PurchaseRequestForm;