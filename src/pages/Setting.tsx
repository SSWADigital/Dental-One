import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../App';
import { getUserSettings, updateUserSettings, createUserSettings } from '../api/userSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (user) {
      getUserSettings(user.id).then(res => {
        if (res.data) setSettings(res.data);
        else createUserSettings(user.id, {}).then(r => setSettings(r.data));
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (field: string, value: any) => {
    setSettings((prev: any) => {
      const updated = { ...prev, [field]: value };
      console.log('handleChange:', field, value, updated);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!user || !settings) return;
    setSaving(true);
    setSaveMsg('');
    console.log('Saving settings:', settings);
    const res = await updateUserSettings(user.id, settings);
    console.log('Update result:', res);
    if (res.error) setSaveMsg('Gagal menyimpan: ' + res.error);
    else setSaveMsg('Berhasil disimpan!');
    setSaving(false);
  };

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
              {/* User Settings */}
              {!loading && settings && (
                <div className="bg-white rounded-lg shadow p-6 border">
                  <h3 className="text-lg font-semibold mb-4">User Preferences</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Mata Uang</label>
                    <select
                      value={settings.currency}
                      onChange={e => handleChange('currency', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="USD">USD</option>
                      <option value="IDR">IDR</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Bahasa</label>
                    <select
                      value={settings.language}
                      onChange={e => handleChange('language', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="en">English</option>
                      <option value="id">Bahasa Indonesia</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Tema</label>
                    <select
                      value={settings.theme}
                      onChange={e => handleChange('theme', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Notifikasi Email</label>
                    <input
                      type="checkbox"
                      checked={settings.notification_email}
                      onChange={e => handleChange('notification_email', e.target.checked)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Notifikasi Push</label>
                    <input
                      type="checkbox"
                      checked={settings.notification_push}
                      onChange={e => handleChange('notification_push', e.target.checked)}
                    />
                  </div>
                  {saveMsg && <div className="mt-2 text-green-600">{saveMsg}</div>}
                </div>
              )}
            </div>
            <div className="space-y-8">
              <SystemSettingsSection />
              <BrandingSection />
            </div>
            {/* Save Button (floating) */}
            <div className="fixed bottom-6 right-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors flex items-center space-x-2"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </div>
        )}
        {activeTab === 'users' && (
            <div className="text-gray-400 text-lg">
                <UsersAndPermission/>
            </div>
        )}
        {activeTab === 'purchasing' && (
          <div className="text-gray-400 text-lg">
            <PurchasingTab />
          </div>
        )}
        {activeTab === 'integrations' && (
          <div className="text-gray-400 text-lg">
            <IntegrationsSection />
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default SettingsPage;