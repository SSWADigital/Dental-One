import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Clinic Pages
import Layout from './components/Layout';
import SupplierLayout from './components/SupplierLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PurchaseRequest from './pages/PurchaseRequest';
import PurchaseApproval from './pages/PurchaseApproval';
import PurchaseOrders from './pages/PurchaseOrders';
import ProductCatalog from './pages/ProductCatalog';
import StockLevels from './pages/StockLevels';
import Forecasting from './pages/Forecasting';
import LandedCosts from './pages/LandedCosts';
import PaymentPO from './pages/PaymentPO';
import SettingsPage from './pages/Setting';

// Supplier Pages
import SupplierOverview from './pages/supplier/Overview';
import SupplierStatistics from './pages/supplier/Statistics';
import SupplierOrders from './pages/supplier/Orders';
import SupplierShipment from './pages/supplier/Shipment';
import SupplierProduct from './pages/supplier/Products';
import SupplierReviews from './pages/supplier/Reviews';
import SupplierInvoices from './pages/supplier/Invoices';

// NEW: Import the NotFound component
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Clinic Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="purchase-request" element={<PurchaseRequest />} />
          <Route path="purchase-approval" element={<PurchaseApproval />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="product-catalog" element={<ProductCatalog />} />
          <Route path="stock-levels" element={<StockLevels />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="landed-costs" element={<LandedCosts />} />
          <Route path="payment-po" element={<PaymentPO />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Supplier Routes */}
        <Route path="/supplier" element={<SupplierLayout />}>
          <Route index element={<Navigate to="/supplier/overview" replace />} />
          <Route path="overview" element={<SupplierOverview />} />
          <Route path="statistics" element={<SupplierStatistics />} />
          <Route path="orders" element={<SupplierOrders />} />
          <Route path="shipment" element={<SupplierShipment />} />
          <Route path="products" element={<SupplierProduct/>} />
          <Route path="reviews" element={<SupplierReviews />} />
          <Route path="payments" element={<div className="p-6"><h1 className="text-2xl font-bold">Payments - Coming Soon</h1></div>} />
          <Route path="invoices" element={<SupplierInvoices />} />
          <Route path="profile" element={<div className="p-6"><h1 className="text-2xl font-bold">Profile - Coming Soon</h1></div>} />
          {/* <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} /> */}
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
          <Route path="support" element={<div className="p-6"><h1 className="text-2xl font-bold">Support - Coming Soon</h1></div>} />
        </Route>

        {/* NEW: Catch-all route for 404 Not Found */}
        {/* This route should always be the last one in your <Routes> block */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;