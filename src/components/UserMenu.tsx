import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import LogoutModal from './LogoutModal';
import { useAuth } from '../App';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, role } = useAuth();

  // User info from session
  const userName = user?.user_metadata?.full_name || user?.email || 'User';
  const userRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';
  const userAvatar = user?.user_metadata?.avatar_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(false);
    setIsOpen(false);
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      onClick: () => {
        setIsOpen(false);
      }
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {
        setIsOpen(false);
      }
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onClick: () => {
        setIsOpen(false);
      }
    },
    {
      icon: LogOut,
      label: 'Logout',
      onClick: () => {
        setIsOpen(false);
        setShowLogoutModal(true);
      },
      className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
    }
  ];

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <img
            src={userAvatar}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 origin-top-right">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{userName}</p>
                  <p className="text-sm text-gray-500">{userRole}</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                    item.className || 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserMenu;