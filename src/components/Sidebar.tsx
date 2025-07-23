import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText,
  CheckCircle,
  ShoppingCart,
  Star,
  Package,
  BarChart3,
  TrendingUp,
  CreditCard,
  Layers,
  PieChart,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar: React.FC = () => { 
  const location = useLocation();
  
  const menuItems = [
    {
      section: 'Purchasing',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'Purchase Request', path: '/purchase-request' },
        { icon: CheckCircle, label: 'Purchase Approval', path: '/purchase-approval' },
        { icon: ShoppingCart, label: 'Purchase Orders', path: '/purchase-orders' }
      ]
    },
    {
      section: 'Suppliers Portal',
      items: [
        { icon: Star, label: 'Supplier Ratings', path: '/supplier-ratings' },
        { icon: Package, label: 'Product Catalog', path: '/product-catalog' }
      ]
    },
    {
      section: 'AI Pro Purchasing',
      items: [
        { icon: BarChart3, label: 'Stock Levels', path: '/stock-levels' },
        { icon: TrendingUp, label: 'Forecasting', path: '/forecasting' }
      ]
    },
    {
      section: 'Finance',
      items: [
        { icon: CreditCard, label: 'Landed Costs', path: '/landed-costs' },
        { icon: Layers, label: 'Payment PO', path: '/payment-po' }
      ]
    }
  ];

  const otherItems = [
    { icon: PieChart, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/DentalOneLogo.png" 
            alt="DentalOne Logo" 
            className="h-auto w-auto"
          />
        </Link>
        <div className="mt-4">
          <p className="font-medium text-gray-900">Joy Dental</p>
          <p className="text-xs text-gray-500">535 Dubai Avenue, CA</p>
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

        <ul className="space-y-1">
          {otherItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
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
      </nav>
    </div>
  );
};

export default Sidebar;