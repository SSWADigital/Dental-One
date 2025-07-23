import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { getSession } from './supabaseAuth';
import type { User } from '@supabase/supabase-js';
import { getUserSettings } from './api/userSettings';

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
import PurchaseRequestDrafts from './pages/PurchaseRequestDrafts';

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

// Auth context for session and role
const AuthContext = createContext<{ user: User | null; role: string | null; loading: boolean; refresh: () => void }>({ user: null, role: null, loading: true, refresh: () => {} });
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    setLoading(true);
    const sessionUser = await getSession();
    if (sessionUser) {
      // Fetch role from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionUser.id)
        .single();
      setUser(sessionUser as User);
      setRole(data?.role || null);
    } else {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchSession();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, refresh: fetchSession }}>
      {children}
    </AuthContext.Provider>
  );
}

const UserSettingsContext = createContext<any>({ settings: null, loading: true });
export const useUserSettings = () => useContext(UserSettingsContext);

function UserSettingsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserSettings(user.id).then(res => {
        setSettings(res.data || null);
        setLoading(false);
      });
    } else {
      setSettings(null);
      setLoading(false);
    }
  }, [user]);

  return (
    <UserSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </UserSettingsContext.Provider>
  );
}

// ProtectedRoute: blocks access if not logged in or role not allowed
function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(role || '')) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function App() {
  // Global theme and language effect
  const { settings } = useUserSettings();
  React.useEffect(() => {
    if (settings?.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // If using i18n:
    // if (settings?.language) {
    //   i18n.changeLanguage(settings.language);
    // }
  }, [settings?.theme/*, settings?.language*/]);

  return (
    <AuthProvider>
      <UserSettingsProvider>
        <Router>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Clinic Routes (clinic only) */}
            <Route element={<ProtectedRoute allowedRoles={['clinic']} />}> 
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
                <Route path="purchase-request-drafts" element={<PurchaseRequestDrafts />} />
              </Route>
            </Route>
            {/* Supplier Routes (supplier only) */}
            <Route element={<ProtectedRoute allowedRoles={['supplier']} />}> 
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
                <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
                <Route path="support" element={<div className="p-6"><h1 className="text-2xl font-bold">Support - Coming Soon</h1></div>} />
              </Route>
            </Route>
            {/* NEW: Catch-all route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserSettingsProvider>
    </AuthProvider>
  );
}

export default App;