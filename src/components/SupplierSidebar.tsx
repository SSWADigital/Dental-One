import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  BarChart3,
  Package,
  Star,
  Truck,
  FileText,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  ShoppingCart
} from 'lucide-react';

const SupplierSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      section: 'Dashboard',
      items: [
        { icon: LayoutDashboard, label: 'Overview', path: '/supplier/overview' },
        { icon: BarChart3, label: 'Statistics', path: '/supplier/statistics' }
      ]
    },
    {
      section: 'Orders',
      items: [
        { icon: ShoppingCart, label: 'Orders', path: '/supplier/orders' }
      ]
    },
    {
      section: 'Catalog',
      items: [
        { icon: Package, label: 'Products', path: '/supplier/products' },
        { icon: Star, label: 'Reviews', path: '/supplier/reviews' }
      ]
    },
    {
      section: 'Fulfillment',
      items: [
        { icon: Truck, label: 'Shipment', path: '/supplier/shipment' }
      ]
    },
    {
      section: 'Finance',
      items: [
        { icon: CreditCard, label: 'Payments', path: '/supplier/payments' },
        { icon: FileText, label: 'Invoices', path: '/supplier/invoices' }
      ]
    },
    {
      section: 'Account',
      items: [
        { icon: User, label: 'Profile', path: '/supplier/profile' },
        { icon: Settings, label: 'Settings', path: '/supplier/settings' },
        { icon: HelpCircle, label: 'Support', path: '/supplier/support' }
      ]
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6">
        <Link to="/supplier/overview" className="flex items-center space-x-3">
          <img 
            src="/DentalOneLogo.png" 
            alt="DentalOne Logo" 
            className="h-auto w-auto"
          />
        </Link>
        <div className="mt-4">
          <p className="font-medium text-gray-900">MedSupply Co.</p>
          <p className="text-xs text-gray-500">Dental Supplier</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {section.section}
            </p>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SupplierSidebar;