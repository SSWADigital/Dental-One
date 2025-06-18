import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export const SystemSettingsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Pengaturan Sistem</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bahasa
          </label>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zona Waktu
          </label>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>(GMT+07:00) Waktu Indonesia Barat</option>
              <option>(GMT+08:00) Waktu Indonesia Tengah</option>
              <option>(GMT+09:00) Waktu Indonesia Timur</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Format Tanggal
          </label>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mata Uang
          </label>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
              <option>IDR (Rp)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-sm font-medium text-gray-700">Mode Gelap</div>
            <div className="text-xs text-gray-500">Beralih antara tema terang dan gelap</div>
          </div>
          <ToggleSwitch enabled={false} />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-sm font-medium text-gray-700">Aktifkan Notifikasi</div>
            <div className="text-xs text-gray-500">Terima notifikasi sistem</div>
          </div>
          <ToggleSwitch enabled={true} />
        </div>
      </div>
    </div>
  );
};