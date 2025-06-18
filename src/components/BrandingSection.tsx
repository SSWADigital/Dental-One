import React from 'react';
import { Palette, Upload } from 'lucide-react';

export const BrandingSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Branding</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo Perusahaan
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Logo Baru</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ukuran yang direkomendasikan: 200x200px. Ukuran file maksimal: 5MB.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warna Utama
          </label>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-400 rounded-md border border-gray-300"></div>
            <input
              type="text"
              defaultValue="#29B6F6"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Ubah
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warna Sekunder
          </label>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-md border border-gray-300"></div>
            <input
              type="text"
              defaultValue="#1E3D59"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Ubah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};