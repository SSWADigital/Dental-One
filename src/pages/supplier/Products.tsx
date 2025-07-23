// src/pages/supplier/Products.tsx
import React, { useState, useMemo } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import Alert from '../../components/Alert';
import AddProductPopup from '../../components/supplier/AddProductPopup';
import EditProductPopup from '../../components/supplier/EditProductPopup';
import ProductDetailsSidebar from '../../components/supplier/ProductDetailsSidebar';
import * as XLSX from 'xlsx';

import { 
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  Edit,
  Eye,
  Copy, 
  Trash2,
  MoreHorizontal,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  X 
} from 'lucide-react';
import ImportExcelPopup from './ImportExcelPopup';

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

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('table'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [tagFilter, setTagFilter] = useState('Select tags...');
  const [stockFilter, setStockFilter] = useState('All');
  const [showImportExcelPopup, setShowImportExcelPopup] = useState(false);
  
  // States for popups and sidebars
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showEditProductPopup, setShowEditProductPopup] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [showProductDetailsSidebar, setShowProductDetailsSidebar] = useState(false);
  const [productToShowDetails, setProductToShowDetails] = useState<Product | null>(null);

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error',
    duration: 0,
  });

  const handleExport = () => {
    if (products.length === 0) {
      triggerAlert('warning', 'Export Failed', 'No products to export.', 3000);
      return;
    }
  
    // Map product data to a flat array suitable for Excel
    const dataToExport = products.map(product => ({
      ID: product.id,
      'Product Name': product.name,
      SKU: product.sku,
      Category: product.category,
      Tags: product.tags.join(', '), // Join tags back into a comma-separated string
      Price: product.price,
      Stock: product.stock,
      'Stock Status': product.stockStatus,
      'Delivery Time': product.deliveryTime,
      Status: product.status,
      'Image URL': product.image,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  
    // Generate a file name with current date and time
    const date = new Date();
    const fileName = `Product_Catalog_${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
  
    triggerAlert('success', 'Export Successful', 'Product catalog exported to Excel.', 3000);
  };
  

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const productsData: Product[] = [ 
    { id: '1', name: 'Dental Implant Kit', sku: 'DIK-2023', category: 'Equipment', tags: ['Surgical', 'Premium'], price: 1250.00, stock: 42, stockStatus: 'In Stock', deliveryTime: '3-5 days', status: 'Active', image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '2', name: 'Orthodontic Brackets', sku: 'OB-4512', category: 'Supplies', tags: ['Orthodontics'], price: 149.99, stock: 156, stockStatus: 'In Stock', deliveryTime: '2-3 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '3', name: 'Composite Filling Material', sku: 'CFM-1122', category: 'Materials', tags: ['Restorative'], price: 89.95, stock: 78, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '4', name: 'Dental Anesthetic', sku: 'DA-3301', category: 'Medicine', tags: ['Anesthesia', 'Prescription'], price: 120.00, stock: 12, stockStatus: 'Low Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '5', name: 'Sterilization Equipment', sku: 'SE-7788', category: 'Equipment', tags: ['Sterilization', 'Premium'], price: 2499.99, stock: 5, stockStatus: 'Low Stock', deliveryTime: '7-10 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '6', name: 'Dental Impression Material', sku: 'DIM-8821', category: 'Materials', tags: ['Impression'], price: 75.50, stock: 0, stockStatus: 'Out of Stock', deliveryTime: '3-5 days', status: 'Inactive', image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '7', name: 'Dental Chair', sku: 'DC-9901', category: 'Equipment', tags: ['Furniture', 'Premium'], price: 4999.99, stock: 3, stockStatus: 'Low Stock', deliveryTime: '14-21 days', status: 'Active', image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '8', name: 'Surgical Gowns', sku: 'SG-100', category: 'Supplies', tags: ['Disposable', 'Sterile'], price: 5.99, stock: 200, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '9', name: 'X-Ray Sensor', sku: 'XRS-500', category: 'Equipment', tags: ['Digital', 'Imaging'], price: 3500.00, stock: 2, stockStatus: 'Low Stock', deliveryTime: '5-7 days', status: 'Active', image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '10', name: 'Face Masks (Box of 50)', sku: 'FM-500', category: 'Supplies', tags: ['PPE', 'Disposable'], price: 25.00, stock: 500, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '11', name: 'Dental Drill Bits (Pack)', sku: 'DDB-20', category: 'Instruments', tags: ['Drill', 'Assorted'], price: 75.00, stock: 80, stockStatus: 'In Stock', deliveryTime: '2-3 days', status: 'Active', image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '12', name: 'Curing Light Bulbs', sku: 'CLB-LED', category: 'Equipment', tags: ['Light', 'Replacement'], price: 45.00, stock: 8, stockStatus: 'Low Stock', deliveryTime: '3-5 days', status: 'Active', image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '13', name: 'Autoclave Sterilization Pouches', sku: 'ASP-100', category: 'Infection Control', tags: ['Sterilization', 'Disposable'], price: 30.00, stock: 120, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '14', name: 'Dental Bibs (Box)', sku: 'DB-200', category: 'Disposables', tags: ['Patient Care'], price: 18.00, stock: 30, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '15', name: 'Periodontal Probes', sku: 'PP-ST01', category: 'Instruments', tags: ['Diagnostic'], price: 60.00, stock: 5, stockStatus: 'Low Stock', deliveryTime: '2-3 days', status: 'Active', image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { id: '16', name: 'Fluoride Varnish', sku: 'FV-GEL', category: 'Materials', tags: ['Preventive'], price: 95.00, stock: 15, stockStatus: 'In Stock', deliveryTime: '1-2 days', status: 'Active', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
  ];
  const [products, setProducts] = useState<Product[]>(productsData); 
  
  const tabs = ['All Products', 'Categories', 'Tags', 'Delivery Settings'];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600';
      case 'Low Stock': return 'text-orange-600';
      case 'Out of Stock': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatusBgColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100';
      case 'Low Stock': return 'bg-orange-100';
      case 'Out of Stock': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <X className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredProducts = useMemo(() => {
    // Reset to first page whenever filters change
    setCurrentPage(1); 
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
      const matchesTag = tagFilter === 'Select tags...' || product.tags.includes(tagFilter);
      const matchesStock = stockFilter === 'All' || product.stockStatus === stockFilter;
      
      return matchesSearch && matchesCategory && matchesTag && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, tagFilter, stockFilter]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }


  const areAllFilteredProductsSelected = filteredProducts.length > 0 && 
                                        filteredProducts.every(product => selectedProducts.includes(product.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select only products on the current page
      setSelectedProducts(currentItems.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedProducts, productId];
    } else {
      newSelected = selectedProducts.filter(id => id !== productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) return;

    if (action === "delete") {
      setProducts(prevProducts => prevProducts.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      triggerAlert('success', 'Bulk Delete', `${selectedProducts.length} products deleted successfully.`, 3000);
    } else if (action === "activate" || action === "deactivate") {
      setProducts(prevProducts => 
        prevProducts.map(p => 
          selectedProducts.includes(p.id) ? { ...p, status: action === "activate" ? 'Active' : 'Inactive' } : p
        )
      );
      setSelectedProducts([]);
      triggerAlert('success', 'Bulk Update', `${action === "activate" ? "Activated" : "Deactivated"} ${selectedProducts.length} products.`, 3000);
    } else {
      console.log(`Bulk action: ${action} on products:`, selectedProducts);
      triggerAlert('info', 'Bulk Action', `Performed "${action}" on ${selectedProducts.length} products.`, 3000);
    }
    setSelectedProducts([]);
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
      )
    );
    triggerAlert('info', 'Status Updated', `Product status for ${productId} toggled.`, 2000);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    setShowAddProductPopup(false); 
    triggerAlert('success', 'Product Added', `Product "${newProduct.name}" has been added successfully!`, 3000);
    setCurrentPage(1); // Go to first page to see the new product
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProductToEdit(product);
      setShowEditProductPopup(true);
    } else {
      triggerAlert('error', 'Error', 'Product not found for editing.', 3000);
    }
  };

  const handleSaveEditedProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setShowEditProductPopup(false); 
    setProductToEdit(null); 
    triggerAlert('success', 'Product Updated', `Product "${updatedProduct.name}" has been updated successfully!`, 3000);
  };

  const handleDeleteProduct = (productId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      setSelectedProducts(prevSelected => prevSelected.filter(id => id !== productId)); 
      triggerAlert('success', 'Product Deleted', `Product ${productId} has been deleted.`, 3000);
      if (productToShowDetails?.id === productId) setShowProductDetailsSidebar(false);
      if (productToEdit?.id === productId) setShowEditProductPopup(false);
       // Adjust page if current page becomes empty after deletion
       if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleShowProductDetails = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProductToShowDetails(product);
      setShowProductDetailsSidebar(true);
    } else {
      triggerAlert('error', 'Error', 'Product details not found.', 3000);
    }
  };

  const handleDuplicateProduct = (productId: string) => {
    const originalProduct = products.find(p => p.id === productId);
    if (originalProduct) {
      const newProductId = `PROD-${Date.now()}`; 
      const duplicatedProduct: Product = {
        ...originalProduct,
        id: newProductId, 
        name: `${originalProduct.name} (Copy)`, 
        sku: `${originalProduct.sku}-COPY`, 
        status: 'Inactive', 
        stock: 0, 
        stockStatus: 'Out of Stock', 
      };
      
      handleAddNewProduct(duplicatedProduct);
      triggerAlert('info', 'Product Duplicated', `Product "${originalProduct.name}" duplicated as "${duplicatedProduct.name}".`, 3000);
    } else {
      triggerAlert('error', 'Error', 'Original product not found for duplication.', 3000);
    }
  };

  const triggerAlert = (type: 'info' | 'success' | 'warning' | 'error', title: string, message: string, duration?: number) => {
    setAlertConfig({ title, message, type, duration: duration || 0 });
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleImportExcel = (importedProducts: Product[]) => {
    if (importedProducts && importedProducts.length > 0) {
      // For simplicity, we'll just add imported products to existing ones.
      // In a real app, you might want to handle duplicates, updates, etc.
      setProducts(prevProducts => {
        // Filter out products that already exist by ID/SKU if needed
        const newProducts = importedProducts.filter(impProd => 
          !prevProducts.some(p => p.id === impProd.id || p.sku === impProd.sku)
        );
        return [...newProducts, ...prevProducts]; // Add new ones to the top
      });
      triggerAlert('success', 'Import Successful', `${importedProducts.length} products imported from Excel.`, 4000);
      setShowImportExcelPopup(false); // Close popup
      setCurrentPage(1); // Reset to first page
    } else {
      triggerAlert('warning', 'Import Canceled', 'No valid products to import.', 3000);
    }
  };

  // --- Product Card Component for Grid View ---
  const ProductCard: React.FC<{ product: Product; isSelected: boolean; onSelect: (id: string, checked: boolean) => void; onToggleStatus: (id: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; onShowDetails: (id: string) => void; onDuplicate: (id: string) => void }> = ({ product, isSelected, onSelect, onToggleStatus, onEdit, onDelete, onShowDetails, onDuplicate }) => (
    <div className={`relative bg-white rounded-lg shadow-sm border ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} overflow-hidden`}>
        {isSelected && (
            <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-10">
                <CheckCircle className="h-4 w-4 text-white" />
            </div>
        )}
        <div className="relative h-48 w-full overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.stockStatus)} ${getStockStatusBgColor(product.stockStatus)} flex items-center space-x-1`}>
                {getStockStatusIcon(product.stockStatus)}
                <span>{product.stockStatus}</span>
            </div>
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.sku} | {product.category}</p>
            <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{product.deliveryTime}</span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex-1 mr-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={product.status === 'Active'}
                            onChange={() => onToggleStatus(product.id)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">{product.status}</span>
                    </label>
                </div>
                <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onEdit(product.id); }}>
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onShowDetails(product.id); }}>
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onDuplicate(product.id); }}>
                        <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}>
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(product.id, e.target.checked)}
                className="absolute top-2 left-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 z-10"
            />
        </div>
    </div>
  );

  // --- Product List Item Component for List View ---
  const ProductListItem: React.FC<{ product: Product; isSelected: boolean; onSelect: (id: string, checked: boolean) => void; onToggleStatus: (id: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; onShowDetails: (id: string) => void; onDuplicate: (id: string) => void }> = ({ product, isSelected, onSelect, onToggleStatus, onEdit, onDelete, onShowDetails, onDuplicate }) => (
    <div className={`flex items-center bg-white rounded-lg shadow-sm border ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} p-4 mb-4`}>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(product.id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-4"
        />
        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
        <div className="flex-1 grid grid-cols-5 gap-4 items-center">
            <div className="col-span-1">
                <span className="font-medium text-gray-900 block">{product.name}</span>
                <span className="text-sm text-gray-600">{product.sku}</span>
            </div>
            <div className="col-span-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {product.category}
                </span>
            </div>
            <div className="col-span-1 flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="col-span-1">
                <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            <div className="col-span-1">
                <div className="flex items-center space-x-1">
                    <div className={`${getStockStatusColor(product.stockStatus)}`}>
                        {getStockStatusIcon(product.stockStatus)}
                    </div>
                    <span className={`font-medium text-sm ${getStockStatusColor(product.stockStatus)}`}>
                        {product.stockStatus} ({product.stock})
                    </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600 text-sm mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{product.deliveryTime}</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-end ml-4 space-y-2">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={product.status === 'Active'}
                    onChange={() => onToggleStatus(product.id)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">{product.status}</span>
            </label>
            <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onEdit(product.id); }}>
                    <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onShowDetails(product.id); }}>
                    <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); onDuplicate(product.id); }}>
                    <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}>
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  );


  return (
    <>
      <SupplierTopBar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Catalog</h1>
            <p className="text-gray-600">Manage your product listings and inventory</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowImportExcelPopup(true)} // NEW: Open import popup
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Import from Excel</span>
            </button>
            <button 
              onClick={handleExport} // NEW: Trigger export
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddProductPopup(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* My Catalog Content */}
      {activeTab === 'All Products' && (
        <div className="bg-white">
          {/* Controls */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={areAllFilteredProductsSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    {selectedProducts.length} selected
                  </span>
                </div>
                
                {selectedProducts.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <select 
                        onChange={(e) => handleBulkAction(e.target.value)}
                        value=""
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Bulk Actions</option>
                        <option value="activate">Activate</option>
                        <option value="deactivate">Deactivate</option>
                        <option value="delete">Delete</option>
                        <option value="export">Export Selected</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Customize View</span>
                </button>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>All Categories</option>
                    <option>Equipment</option>
                    <option>Supplies</option>
                    <option>Materials</option>
                    <option>Medicine</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Select tags...</option>
                    {[...new Set(products.flatMap(p => p.tags))].map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setStockFilter('All')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      stockFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStockFilter('In Stock')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      stockFilter === 'In Stock' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    In Stock
                  </button>
                  <button
                    onClick={() => setStockFilter('Low Stock')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      stockFilter === 'Low Stock' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Low Stock
                  </button>
                  <button
                    onClick={() => setStockFilter('Out of Stock')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      stockFilter === 'Out of Stock' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Out of Stock
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                
                <div className="flex space-x-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Product Display */}
          <div className="p-6">
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">
                        <input
                          type="checkbox"
                          checked={areAllFilteredProductsSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Image</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Product Name</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">SKU/ID</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Category</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Tags</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Price</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Stock</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Delivery Time</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((product) => ( 
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-600">{product.sku}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {product.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <div className={getStockStatusColor(product.stockStatus)}>
                              {getStockStatusIcon(product.stockStatus)}
                            </div>
                            <span className={`font-medium ${getStockStatusColor(product.stockStatus)}`}>
                              {product.stockStatus}: {product.stock}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{product.deliveryTime}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={product.status === 'Active'}
                              onChange={() => handleToggleProductStatus(product.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleEditProduct(product.id)}>
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleShowProductDetails(product.id)}>
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); handleDuplicateProduct(product.id); }}>
                                <Copy className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={handleSelectProduct}
                    onToggleStatus={handleToggleProductStatus}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onShowDetails={handleShowProductDetails}
                    onDuplicate={handleDuplicateProduct}
                  />
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="flex flex-col">
                {currentItems.map(product => ( 
                  <ProductListItem
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={handleSelectProduct}
                    onToggleStatus={handleToggleProductStatus}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onShowDetails={handleShowProductDetails}
                    onDuplicate={handleDuplicateProduct}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1}-{indexOfLastItem > filteredProducts.length ? filteredProducts.length : indexOfLastItem} of {filteredProducts.length} products
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select 
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  ←
                </button>
                <div className="flex space-x-1">
                  {pageNumbers.map((number, index) => (
                    number === '...' ? (
                      <span key={index} className="px-2 text-gray-500">...</span>
                    ) : (
                      <button 
                        key={index}
                        onClick={() => paginate(Number(number))}
                        className={`w-8 h-8 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} text-sm font-medium`}
                      >
                        {number}
                      </button>
                    )
                  ))}
                </div>
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content */}
      {activeTab !== 'All Products' && (
        <div className="p-6 flex-1 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeTab} Management</h3>
            <p className="text-gray-600">This section is under construction. Please check back later.</p>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      {/* <button
        onClick={() => setShowAddProductPopup(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button> */}

      {/* The AddProductPopup Component */}
      <AddProductPopup
        isOpen={showAddProductPopup}
        onClose={() => setShowAddProductPopup(false)}
        onAddProduct={handleAddNewProduct}
      />

      {/* The EditProductPopup Component */}
      {productToEdit && (
        <EditProductPopup
          isOpen={showEditProductPopup}
          onClose={() => setShowEditProductPopup(false)}
          product={productToEdit}
          onSaveProduct={handleSaveEditedProduct}
        />
      )}

      {/* The ProductDetailsSidebar Component */}
      {productToShowDetails && (
        <ProductDetailsSidebar
          isOpen={showProductDetailsSidebar}
          onClose={() => setShowProductDetailsSidebar(false)}
          product={productToShowDetails}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      <ImportExcelPopup
        isOpen={showImportExcelPopup}
        onClose={() => setShowImportExcelPopup(false)}
        onImport={handleImportExcel}
      />

      {/* Alert Component */}
      {showAlert && (
        <Alert
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          duration={alertConfig.duration}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default Products;