import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  ShoppingCart, 
  Truck, 
  Package, 
  DollarSign, 
  Bot, 
  Plug,
  Building2,
  Globe,
  Upload,
  Save,
  Bell,
  ChevronDown,
  Search
} from 'lucide-react';
import { CompanyInfoSection } from '../components/CompanyInfoSection';
import { SystemSettingsSection } from '../components/SystemSettingsSection';
import { NotificationsSection } from '../components/NotificationsSection';
import { BrandingSection } from '../components/BrandingSection';
import { UsersAndPermission } from '../components/tab/UsersAndPermission';
import { PurchasingTab } from '../components/tab/PurchasingTab';
import { IntegrationsSection } from '../components/tab/IntegrationsTab';
import TopBar from '../components/TopBar';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'Users & Permissions', icon: Users },
    { id: 'purchasing', label: 'Purchasing', icon: ShoppingCart },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'ai', label: 'AI & Automation', icon: Bot },
  ];

  return (

    <>

    <TopBar Title="Setting's" Text="Your system preference's" />

    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-6 py-8">
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <CompanyInfoSection />
              <NotificationsSection />
            </div>
            <div className="space-y-8">
              <SystemSettingsSection />
              <BrandingSection />
            </div>
            {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
          </div>
          
          
        )}
        
        {/* {activeTab !== 'general' && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Konten untuk tab {tabs.find(t => t.id === activeTab)?.label} akan ditambahkan di sini
            </div>
          </div>
        )} */}
        {activeTab === 'users' && (
            // <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
                <UsersAndPermission/>
            </div>
            // </div>
        )}
        {activeTab === 'purchasing' && (
          <div className="text-gray-400 text-lg">
            <PurchasingTab />
                 {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
          {/* </div> */}
          </div>
          
        )}
        {activeTab === 'integrations' && (
          <div className="text-gray-400 text-lg">
            <IntegrationsSection />
                 {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
          {/* </div> */}
          </div>
          
        )}
      </div>

      

      {/* { Users & Permission } */}
        
    
        {/* { Purchasing } */}
    </div>
    
    </>

  );
};

export default SettingsPage;