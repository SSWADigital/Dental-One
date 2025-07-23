import React, { useState, useEffect } from 'react';
import { MapPin, Search, Plus, Minus, Info, ChevronRight, Trash2 } from 'lucide-react';
import ProductCatalogPopup from './ProductCatalogPopup';
import { createPurchaseRequest } from '../api/purchaseRequest';
import { useAuth } from '../App';
import { getAllProducts } from '../api/product';
import { useUserSettings } from '../App';
import ModalDialog from './ModalDialog';
import { useNavigate } from 'react-router-dom';
import { createDraftPurchaseRequest } from '../api/purchaseRequest';

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
  product_id?: string; // <-- Tambahkan ini!
  name: string;
  sku: string;
  supplier: string;
  stockAvail: number;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: string;
}

const PurchaseRequestForm = () => {
  const [department, setDepartment] = useState('Dental Surgery');
  const [requiredBy, setRequiredBy] = useState(() => new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCatalogPopup, setShowCatalogPopup] = useState(false);
  const [items, setItems] = useState<RequestItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const { settings: userSettings, loading: settingsLoading } = useUserSettings();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDraftSaved, setShowDraftSaved] = useState(false);
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showStockAlert, setShowStockAlert] = useState(false);

  console.log('userSettings:', userSettings);

  if (settingsLoading) {
    return <div>Loading...</div>;
  }

  // Currency formatter
  const currency = userSettings?.currency || 'USD';
  console.log('currency used in formatter:', currency);
  const currencyFormatter = new Intl.NumberFormat(userSettings?.language || 'en', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  const convertPrice = (product: Product) => {
    if (currency === 'IDR') {
      if (product.id.startsWith('external-')) return product.price;
      return product.price * 16000;
    }
    return product.price;
  };

  useEffect(() => {
    getAllProducts().then(res => {
      if (res.data) setProducts(res.data);
    });
  }, []);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('purchaseRequestDraft');
    if (saved) {
      const draft = JSON.parse(saved);
      if (draft.department) setDepartment(draft.department);
      if (draft.requiredBy) setRequiredBy(draft.requiredBy);
      if (draft.location) setLocation(draft.location);
      if (draft.notes) setNotes(draft.notes);
      if (draft.items) setItems(draft.items);
    } else {
      // Jika tidak ada draft, load hanya items keranjang jika ada
      const savedItems = localStorage.getItem('purchaseRequestDraftItems');
      if (savedItems) setItems(JSON.parse(savedItems));
    }
  }, []);

  // Auto-save items ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('purchaseRequestDraftItems', JSON.stringify(items));
  }, [items]);

  // Save Draft (seluruh form)
  const saveDraft = async () => {
    setSaveStatus('idle');
    if (!user) return;
    const draft = {
      user_id: user.id,
      name: `Draft PR - ${new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
      department,
      type: items.length > 0 && items.some(i => i.name.toLowerCase().includes('jasa')) ? 'Jasa' : 'Barang',
      items,
      notes,
      location,
      required_by: requiredBy,
      status: 'Baru',
      total_item: items.length,
      est_cost: items.reduce((sum, i) => sum + i.total, 0),
    };
    const { error } = await createDraftPurchaseRequest(draft);
    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('success');
      setItems([]);
      localStorage.removeItem('purchaseRequestDraft');
      localStorage.removeItem('purchaseRequestDraftItems');
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        let newQuantity = item.quantity + change;
        if (newQuantity > item.stockAvail) {
          setShowStockAlert(true);
          newQuantity = item.stockAvail;
        }
        newQuantity = Math.max(0, newQuantity);
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  // Fungsi hapus item dari keranjang
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddFromCatalog = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.sku === product.sku);
      const price = convertPrice(product);
      if (existingIndex !== -1) {
        let newQuantity = prevItems[existingIndex].quantity + quantity;
        return prevItems.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice }
            : item
        );
      } else {
        const newItem: RequestItem = {
          id: Math.max(0, ...prevItems.map(i => i.id)) + 1,
          product_id: product.id,
          name: product.name,
          sku: product.sku,
          supplier: product.supplier,
          stockAvail: product.stock,
          quantity: quantity,
          unitPrice: price,
          total: quantity * price,
          currency: currency
        };
        return [...prevItems, newItem];
      }
    });
  };

  const handleSearchClick = () => {
    setShowCatalogPopup(true);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.11; // 11% tax
  const total = subtotal + tax;

  const getStockColor = (stock: number) => {
    if (stock <= 2) return 'text-red-600 bg-red-50';
    if (stock <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    if (!user) {
      setSubmitError('You must be logged in.');
      setIsSubmitting(false);
      return;
    }
    if (items.length === 0) {
      setSubmitError('Please add at least one product.');
      setIsSubmitting(false);
      return;
    }
    if (!requiredBy) {
      setSubmitError('Please select a required by date.');
      setIsSubmitting(false);
      return;
    }
    // Lookup product_id dan supplier_id by SKU dari products
    const items_detail = items.map(item => {
      const foundProduct = products.find(p => p.sku === item.sku);
      return {
        product_id: item.product_id || (foundProduct && foundProduct.id ? foundProduct.id : null),
        name: item.name,
        sku: item.sku,
        supplier_id: foundProduct && foundProduct.id && !foundProduct.id.startsWith('external-') ? foundProduct.supplier : null,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total: item.total,
        status: 'pending',
        comment: notes,
        currency: item.currency
      };
    });
    const prData = {
      submitted_by: user.id,
      date: new Date().toISOString().slice(0, 10),
      department,
      required_by: requiredBy,
      items: items.length,
      total_cost: total,
      status: 'pending',
      items_detail
    };
    const result = await createPurchaseRequest(prData);
    if (result.error) {
      setSubmitError(result.error);
    } else {
      setItems([]);
      setDepartment('Dental Surgery');
      setRequiredBy(new Date().toISOString().slice(0, 10));
      setLocation('');
      setNotes('');
      setShowSuccess(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Purchase Request</h2>
          {/* <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Save Draft
            </button>
            <button
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              onClick={() => navigate('/purchase-request-drafts')}
            >
              Lihat Draft
            </button>
          </div> */}
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
              value={requiredBy}
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
                      {item.quantity === 1 ? (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-full border border-red-300 flex items-center justify-center hover:bg-red-100 text-red-600"
                          title="Hapus dari keranjang"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      )}
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{new Intl.NumberFormat(userSettings?.language || 'en', { style: 'currency', currency: item.currency, minimumFractionDigits: 2 }).format(item.unitPrice)}</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{new Intl.NumberFormat(userSettings?.language || 'en', { style: 'currency', currency: item.currency, minimumFractionDigits: 2 }).format(item.total)}</td>
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
              <span className="font-medium">{currencyFormatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (11%):</span>
              <span className="font-medium">{currencyFormatter.format(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span>{currencyFormatter.format(total)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          {/* <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            onClick={saveDraft}
            type="button"
          >
            Save Draft
          </button> */}
          {/* {saveStatus === 'success' && (
            <div className="ml-4 px-6 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
              Draft berhasil disimpan ke database!
            </div>
          )} */}
          {saveStatus === 'error' && (
            <div className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-medium">Gagal menyimpan draft ke database.</div>
          )}
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit PR'}
          </button>
        </div>
        {submitError && <div className="text-red-600 mt-2 text-sm">{submitError}</div>}
      </div>

      {/* Product Catalog Popup */}
      <ProductCatalogPopup
        isOpen={showCatalogPopup}
        onClose={() => setShowCatalogPopup(false)}
        onAddToRequest={handleAddFromCatalog}
      />
      <ModalDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success"
        message="Purchase Request submitted!"
        type="success"
      />
      {showDraftSaved && (
        <ModalDialog open={showDraftSaved} onClose={() => setShowDraftSaved(false)} title="Draft Saved" message="Your purchase request draft has been saved!" type="success" />
      )}
      <ModalDialog
        open={showStockAlert}
        onClose={() => setShowStockAlert(false)}
        title="Stok Tidak Cukup"
        message="Jumlah yang diminta melebihi stok yang tersedia. Jumlah akan disesuaikan dengan stok maksimum."
        type="error"
      />
    </>
  );
};

export default PurchaseRequestForm;