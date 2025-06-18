import React, { useState, useEffect } from 'react'; // Import useEffect
import { X, Search, Filter, Grid, List, Heart, Star, Plus, Eye, ShoppingCart, MoreHorizontal } from 'lucide-react';
import AddCustomProductPopup from './AddCustomProductPopup';

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
  isRecommended?: boolean;
  isCustom?: boolean;
  dateAdded?: string;
  isUrgentNeed?: boolean;
}

interface CustomProduct {
  id: string;
  name: string;
  sku: string;
  noAKL: string;
  category: string;
  price: number;
  supplier: string;
}

interface ProductCatalogPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToRequest: (product: Product, quantity: number) => void;
}

const ProductCatalogPopup: React.FC<ProductCatalogPopupProps> = ({
  isOpen,
  onClose,
  onAddToRequest
}) => {
  const [activeTab, setActiveTab] = useState('Browse Catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showAddCustomProduct, setShowAddCustomProduct] = useState(false);

  // --- NEW FILTER STATES ---
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(0); // 0 means no rating filter
  const [selectedDateAddedFilter, setSelectedDateAddedFilter] = useState<string>(''); // e.g., 'Last 7 days'
  const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([]); // e.g., ['Active', 'Urgent Need']

  const categories = [
    { name: 'All Products', count: 1245 },
    { name: 'Dental Instruments', count: 342 },
    { name: 'Disposables', count: 287 },
    { name: 'Infection Control', count: 158 },
    { name: 'Orthodontics', count: 98 },
    { name: 'Restorative', count: 124 },
    { name: 'Anesthetics', count: 76 },
    { name: 'Equipment', count: 162 }
  ];

  const customCategories = [
    { name: 'All Products', count: 24 },
    { name: 'Dental Instruments', count: 8 },
    { name: 'Disposables', count: 5 },
    { name: 'Infection Control', count: 4 },
    { name: 'Orthodontics', count: 3 },
    { name: 'Restorative', count: 2 },
    { name: 'Anesthetics', count: 1 },
    { name: 'Equipment', count: 1 }
  ];

  const categoryTabs = [
    'All', 'Brushes', 'Gloves', 'Instruments', 'Anesthetics',
    'Restorative', 'Orthodontics', 'Infection Control', 'Equipment'
  ];

  const customCategoryTabs = [
    'All', 'Dental Instruments', 'Disposables', 'Infection Control', 'Orthodontics', 'Urgent Need'
  ];

  const suppliers = [
    { name: 'Cobra Dental Indonesia', count: 487, checked: true },
    { name: 'DentaMed Supplies', count: 342, checked: false },
    { name: 'MediSupply Co.', count: 256, checked: false },
    { name: 'Dental Depot', count: 198, checked: false }
  ];

  const products: Product[] = [
    {
      id: 'DB-1001',
      name: 'Premium Dental Brush',
      sku: 'DB-1001',
      supplier: 'Cobra Dental Indonesia',
      price: 12.50,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 3,
      stockStatus: 'low-stock',
      category: 'Brushes',
      description: 'Premium dental brush designed for professional dental cleaning procedures. Features soft bristles that are gentle on teeth and gums.',
      isRecommended: true
    },
    {
      id: 'LG-3045',
      name: 'Latex Gloves (Box)',
      sku: 'LG-3045',
      supplier: 'Cobra Dental Indonesia',
      price: 15.00,
      rating: 4.5,
      reviewCount: 98,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 5,
      stockStatus: 'in-stock',
      category: 'Gloves',
      description: 'High-quality latex gloves for medical and dental procedures. Powder-free and comfortable fit.',
      isRecommended: true
    },
    {
      id: 'CR-2034',
      name: 'Charmflex Regular',
      sku: 'CR-2034',
      supplier: 'Cobra Dental Indonesia',
      price: 8.75,
      rating: 4.2,
      reviewCount: 56,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 2,
      stockStatus: 'low-stock',
      category: 'Restorative',
      description: 'Flexible dental material for various restorative procedures.',
      isRecommended: true
    },
    {
      id: 'DI-5023',
      name: 'Dental Impression Material',
      sku: 'DI-5023',
      supplier: 'DentaMed Supplies',
      price: 45.00,
      rating: 4.7,
      reviewCount: 87,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 8,
      stockStatus: 'in-stock',
      category: 'Instruments',
      description: 'High-precision dental impression material for accurate dental molds.',
      isRecommended: true
    }
  ];

  const [customProducts, setCustomProducts] = useState<Product[]>([
    {
      id: 'CUSTOM-001',
      name: 'Custom Dental Explorer',
      sku: 'CDE-001',
      supplier: 'Custom Made',
      price: 25.00,
      rating: 4.9,
      reviewCount: 15,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 0,
      stockStatus: 'out-of-stock',
      category: 'Dental Instruments',
      description: 'Specialized dental explorer with curved tip for hard-to-reach areas.',
      isCustom: true,
      dateAdded: '2025-06-16', // Example date
      isUrgentNeed: true
    },
    {
      id: 'CUSTOM-002',
      name: 'Premium Latex Gloves',
      sku: 'PLG-002',
      supplier: 'Custom Made',
      price: 12.50,
      rating: 4.6,
      reviewCount: 32,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 15,
      stockStatus: 'in-stock',
      category: 'Disposables',
      description: 'High-quality latex gloves with extra durability and comfort.',
      isCustom: true,
      dateAdded: '2025-06-13', // Example date
    },
    {
      id: 'CUSTOM-003',
      name: 'Specialized Root Canal Files',
      sku: 'SRCF-003',
      supplier: 'Custom Made',
      price: 45.00,
      rating: 4.8,
      reviewCount: 28,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 8,
      stockStatus: 'in-stock',
      category: 'Dental Instruments',
      description: 'Custom-made endodontic files for complex root canal procedures.',
      isCustom: true,
      dateAdded: '2025-06-10', // Example date
      isUrgentNeed: true
    },
    {
      id: 'CUSTOM-004',
      name: 'Dental Chair Covers',
      sku: 'DCC-004',
      supplier: 'Custom Made',
      price: 30.00,
      rating: 4.4,
      reviewCount: 19,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 25,
      stockStatus: 'in-stock',
      category: 'Disposables',
      description: 'Disposable covers for dental chairs with enhanced protection.',
      isCustom: true,
      dateAdded: '2025-06-16' // Example date
    },
    {
      id: 'CUSTOM-005',
      name: 'Custom Impression Trays',
      sku: 'CIT-005',
      supplier: 'Custom Made',
      price: 18.00,
      rating: 4.3,
      reviewCount: 24,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 12,
      stockStatus: 'in-stock',
      category: 'Dental Instruments',
      description: 'Specialized impression trays for unique dental structures.',
      isCustom: true,
      dateAdded: '2025-05-28' // Example date
    },
    {
      id: 'CUSTOM-006',
      name: 'Advanced Sterilization Solution',
      sku: 'ASS-006',
      supplier: 'Custom Made',
      price: 22.00,
      rating: 4.7,
      reviewCount: 41,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 30,
      stockStatus: 'in-stock',
      category: 'Infection Control',
      description: 'High-performance sterilization solution for dental instruments.',
      isCustom: true,
      dateAdded: '2025-05-18' // Example date
    },
    {
      id: 'CUSTOM-007',
      name: 'Specialized Orthodontic Pliers',
      sku: 'SOP-007',
      supplier: 'Custom Made',
      price: 75.00,
      rating: 4.9,
      reviewCount: 16,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 5,
      stockStatus: 'low-stock',
      category: 'Orthodontics',
      description: 'Custom-designed pliers for complex orthodontic procedures.',
      isCustom: true,
      dateAdded: '2025-04-18', // Example date
      isUrgentNeed: true
    },
    {
      id: 'CUSTOM-008',
      name: 'Premium Dental Cement',
      sku: 'PDC-008',
      supplier: 'Custom Made',
      price: 40.00,
      rating: 4.5,
      reviewCount: 33,
      image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      stock: 18,
      stockStatus: 'in-stock',
      category: 'Restorative',
      description: 'High-quality dental cement with improved bonding properties.',
      isCustom: true,
      dateAdded: '2025-03-18' // Example date
    }
  ]);

  const getStockColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50';
      case 'low-stock': return 'text-yellow-600 bg-yellow-50';
      case 'out-of-stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleProductSelect = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleAddToRequest = (product: Product) => {
    onAddToRequest(product, 1);
  };

  const handleAddSelectedToRequest = () => {
    const currentProducts = activeTab === 'Browse Catalog' ? products : customProducts;
    selectedProducts.forEach(productId => {
      const product = currentProducts.find(p => p.id === productId);
      if (product) {
        onAddToRequest(product, 1);
      }
    });
    setSelectedProducts([]);
    onClose();
  };

  const handleAddCustomProduct = (customProduct: CustomProduct) => {
    const newProduct: Product = {
      id: `CUSTOM-${Date.now()}`, // Unique ID for new custom products
      name: customProduct.name,
      sku: customProduct.sku,
      supplier: customProduct.supplier,
      price: customProduct.price,
      rating: 0,
      reviewCount: 0,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', // Default image
      stock: 0,
      stockStatus: 'out-of-stock',
      category: customProduct.category,
      description: `Custom product: ${customProduct.name}`,
      isCustom: true,
      dateAdded: new Date().toISOString().slice(0, 10) // Current date in YYYY-MM-DD format
    };

    setCustomProducts(prev => [newProduct, ...prev]);
    setShowAddCustomProduct(false);
  };

  // --- NEW FILTER HANDLERS ---
  const handleCategoryFilterChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleSupplierFilterChange = (supplierName: string, isChecked: boolean) => {
    setSelectedSuppliers(prev =>
      isChecked ? [...prev, supplierName] : prev.filter(name => name !== supplierName)
    );
  };

  const handleRatingFilterChange = (rating: number, isChecked: boolean) => {
    setSelectedRating(isChecked ? rating : 0); // Only one rating can be selected at a time, or none (0)
  };

  const handleDateAddedFilterChange = (period: string, isChecked: boolean) => {
    setSelectedDateAddedFilter(isChecked ? period : ''); // Only one date filter can be selected
  };

  const handleStatusFilterChange = (status: string, isChecked: boolean) => {
    setSelectedStatusFilters(prev =>
      isChecked ? [...prev, status] : prev.filter(s => s !== status)
    );
  };

  const handleClearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSuppliers([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating(0);
    setSelectedDateAddedFilter('');
    setSelectedStatusFilters([]);
  };

  // --- Filtered Products Logic (updated to include all filters) ---
  const filteredProducts = (activeTab === 'Browse Catalog' ? products : customProducts).filter(product => {
    const matchesSearch = searchTerm === '' ||
                          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory ||
                            (activeTab === 'Custom Product' && selectedCategory === 'Urgent Need' && product.isUrgentNeed);

    const matchesSupplier = activeTab === 'Custom Product' || selectedSuppliers.length === 0 ||
                            selectedSuppliers.includes(product.supplier);

    const matchesPrice = (minPrice === '' || product.price >= parseFloat(minPrice)) &&
                         (maxPrice === '' || product.price <= parseFloat(maxPrice));

    const matchesRating = selectedRating === 0 || product.rating >= selectedRating;

    const matchesDateAdded = () => {
      if (activeTab !== 'Custom Product' || !product.dateAdded || selectedDateAddedFilter === '') return true;

      const productDate = new Date(product.dateAdded);
      const today = new Date();
      let filterStartDate = new Date();

      switch (selectedDateAddedFilter) {
        case 'Last 7 days':
          filterStartDate.setDate(today.getDate() - 7);
          break;
        case 'Last 30 days':
          filterStartDate.setDate(today.getDate() - 30);
          break;
        case 'Last 90 days':
          filterStartDate.setDate(today.getDate() - 90);
          break;
        case 'All time':
        default:
          return true;
      }
      return productDate >= filterStartDate;
    };

    const matchesStatus = () => {
      if (activeTab !== 'Custom Product' || selectedStatusFilters.length === 0) return true;
      
      // For Urgent Need, check the specific flag
      if (selectedStatusFilters.includes('Urgent Need') && product.isUrgentNeed) return true;

      // For Active/Draft, you might need a more robust 'status' property on CustomProduct
      // For this example, let's assume 'Active' implies it's not 'out-of-stock' and not Urgent Need
      // And 'Draft' implies out-of-stock or some other pending state. This is just illustrative.
      if (selectedStatusFilters.includes('Active') && product.stockStatus !== 'out-of-stock' && !product.isUrgentNeed) return true;
      if (selectedStatusFilters.includes('Draft') && product.stockStatus === 'out-of-stock' && !product.isUrgentNeed) return true; // simplified for example

      // If no explicit match found for statuses, return false unless it's for 'All' or no filters selected
      return false; 
    };

    return matchesSearch && matchesCategory && matchesSupplier && matchesPrice && matchesRating && matchesDateAdded() && matchesStatus();
  });

  const currentProductsDisplay = activeTab === 'Browse Catalog' ? products : customProducts;
  const currentCategories = activeTab === 'Browse Catalog' ? categories : customCategories;
  const currentCategoryTabs = activeTab === 'Browse Catalog' ? categoryTabs : customCategoryTabs;

  if (!isOpen) return null;

  const ProductCard = ({ product, isSelected, onSelect }: { product: Product, isSelected: boolean, onSelect: (id: string) => void }) => (
    <div
      key={product.id}
      className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
      onClick={() => onSelect(product.id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        {product.isRecommended && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              AI Recommended
            </span>
          </div>
        )}
        {product.isUrgentNeed && activeTab === 'Custom Product' && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Urgent Need
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {!isSelected && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStockColor(product.stockStatus)}`}>
              {product.stock} in stock
            </span>
          )}
        </div>
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50" onClick={(e) => e.stopPropagation()}>
            <Heart className="w-4 h-4 text-gray-400" />
          </button>
          {activeTab === 'Custom Product' && (
            <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3">
        <div className="mb-2">
          <p className="text-xs text-gray-500">{product.sku}</p>
          <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
          <p className="text-xs text-gray-500">{product.supplier}</p>
          {product.dateAdded && (
            <p className="text-xs text-gray-400">{product.dateAdded}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToRequest(product); }}
            className="flex-1 py-1.5 px-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-3 h-3 inline mr-1" />
            Add
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleProductDetails(product); }}
            className="p-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product, isSelected, onSelect }: { product: Product, isSelected: boolean, onSelect: (id: string) => void }) => (
    <div
      key={product.id}
      className={`flex items-center border rounded-lg p-3 mb-3 hover:shadow-sm transition-shadow cursor-pointer relative ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
      onClick={() => onSelect(product.id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <div className="flex-shrink-0 w-24 h-24 mr-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
        {product.isRecommended && (
          <div className="absolute top-1 left-1">
            <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              AI Recommended
            </span>
          </div>
        )}
        {product.isUrgentNeed && activeTab === 'Custom Product' && (
          <div className="absolute top-1 left-1">
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              Urgent Need
            </span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{product.sku}</p>
        <h4 className="font-medium text-gray-900 text-base">{product.name}</h4>
        <p className="text-sm text-gray-500">{product.supplier}</p>
        {product.dateAdded && (
          <p className="text-sm text-gray-400">{product.dateAdded}</p>
        )}
        <div className="flex items-center space-x-1 mt-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between ml-4">
        <span className="font-bold text-gray-900 text-lg mb-2">${product.price.toFixed(2)}</span>
        {!isSelected && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStockColor(product.stockStatus)} mb-3`}>
            {product.stock} in stock
          </span>
        )}
        <div className="flex space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToRequest(product); }}
            className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleProductDetails(product); }}
            className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
          </button>
          {activeTab === 'Custom Product' && (
            <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-[95vw] h-[90vh] max-w-7xl flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'Browse Catalog' ? 'Product Catalog' : 'Custom Products'}
                </h2>
                <span className="text-sm text-gray-500">
                  Showing {filteredProducts.length} of {currentProductsDisplay.length} products
                </span>

                {/* Tabs */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('Browse Catalog')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'Browse Catalog'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Browse Catalog
                  </button>
                  <button
                    onClick={() => setActiveTab('Custom Product')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'Custom Product'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Custom Product
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={activeTab === 'Browse Catalog'
                      ? "Search by product name, SKU, or keywords..."
                      : "Search by product name or description..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sort</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Name A-Z</option>
                  </select>

                  <div className="flex space-x-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {activeTab === 'Custom Product' && (
                    <button
                      onClick={() => setShowAddCustomProduct(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Custom Product</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex space-x-6 overflow-x-auto">
                {currentCategoryTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryFilterChange(tab)}
                    className={`whitespace-nowrap pb-2 px-1 text-sm font-medium transition-colors ${
                      selectedCategory === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Filters */}
              <div className="w-80 border-r border-gray-200 p-6 overflow-y-auto">
                {/* Categories Filter - Uses existing selectedCategory state */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Categories</h3>
                    <button onClick={handleClearAllFilters} className="text-blue-600 hover:text-blue-800 text-sm">Clear all</button>
                  </div>
                  <div className="space-y-3">
                    {currentCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategory === category.name} // Controlled checkbox
                            onChange={() => handleCategoryFilterChange(category.name)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">{category.name}</span>
                        </label>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Date Added Filter (Custom Products Only) */}
                {activeTab === 'Custom Product' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Date Added</h3>
                    <div className="space-y-2">
                      {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((period) => (
                        <label key={period} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedDateAddedFilter === period}
                            onChange={(e) => handleDateAddedFilterChange(period, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">{period}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Filter (Custom Products Only) */}
                {activeTab === 'Custom Product' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
                    <div className="space-y-2">
                      {['Active', 'Draft', 'Urgent Need'].map((status) => (
                        <label key={status} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedStatusFilters.includes(status)}
                            onChange={(e) => handleStatusFilterChange(status, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suppliers (Browse Catalog Only) */}
                {activeTab === 'Browse Catalog' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Supplier</h3>
                    <div className="space-y-3">
                      {suppliers.map((supplier, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSuppliers.includes(supplier.name)} // Controlled checkbox
                              onChange={(e) => handleSupplierFilterChange(supplier.name, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">{supplier.name}</span>
                          </label>
                          <span className="text-sm text-gray-500">({supplier.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRating === rating} // Only one can be selected
                          onChange={(e) => handleRatingFilterChange(rating, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Display Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'Browse Catalog' && (
                  /* AI Recommended Section */
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">AI Recommended for You</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all
                      </button>
                    </div>

                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-4 gap-4">
                        {filteredProducts.filter(p => p.isRecommended).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isSelected={selectedProducts.includes(product.id)}
                            onSelect={handleProductSelect}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-3">
                        {filteredProducts.filter(p => p.isRecommended).map((product) => (
                          <ProductListItem
                            key={product.id}
                            product={product}
                            isSelected={selectedProducts.includes(product.id)}
                            onSelect={handleProductSelect}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* All Products Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeTab === 'Browse Catalog' ? 'All Products' : 'Custom Products'}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Showing {filteredProducts.length} of {currentProductsDisplay.length} products
                    </span>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-4 gap-4">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={selectedProducts.includes(product.id)}
                          onSelect={handleProductSelect}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      {filteredProducts.map((product) => (
                        <ProductListItem
                          key={product.id}
                          product={product}
                          isSelected={selectedProducts.includes(product.id)}
                          onSelect={handleProductSelect}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {selectedProducts.length} items selected
                  </span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSelectedToRequest}
                    disabled={selectedProducts.length === 0}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Purchase Request
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Sidebar */}
          {showProductDetails && selectedProduct && (
            <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Product Details</h3>
                  <button
                    onClick={() => setShowProductDetails(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="mb-6 relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">{selectedProduct.sku}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  {selectedProduct.dateAdded && (
                    <p className="text-sm text-gray-500 mb-2">Added: {selectedProduct.dateAdded}</p>
                  )}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{selectedProduct.rating}</span>
                    <span className="text-sm text-gray-500">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">${selectedProduct.price.toFixed(2)}</div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockColor(selectedProduct.stockStatus)}`}>
                      {selectedProduct.stock} in stock
                    </span>
                    <span className="text-sm text-gray-500">Usually ships in 1-2 business days</span>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => handleAddToRequest(selectedProduct)}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Add to Purchase Request
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Product Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Product Popup */}
      <AddCustomProductPopup
        isOpen={showAddCustomProduct}
        onClose={() => setShowAddCustomProduct(false)}
        onAddProduct={handleAddCustomProduct}
      />
    </>
  );
};

export default ProductCatalogPopup;