import React from 'react';
import { Bell } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export const NotificationsSection: React.FC = () => {
  const notifications = [
    {
      title: 'Notifikasi Email',
      description: 'Terima notifikasi melalui email',
      enabled: true
    },
    {
      title: 'Peringatan Pesanan Pembelian',
      description: 'Dapatkan notifikasi tentang pesanan pembelian baru',
      enabled: true
    },
    {
      title: 'Peringatan Stok Rendah',
      description: 'Dapatkan notifikasi ketika persediaan rendah',
      enabled: true
    },
    {
      title: 'Penginginat Pembayaran',
      description: 'Terima penginginat pembayaran jatuh tempo',
      enabled: true
    },
    {
      title: 'Pembaruan Pemasok',
      description: 'Dapatkan notifikasi tentang perubahan pemasok',
      enabled: true
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Notifikasi</h2>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-gray-700">{notification.title}</div>
              <div className="text-xs text-gray-500">{notification.description}</div>
            </div>
            <ToggleSwitch enabled={notification.enabled} />
          </div>
        ))}
      </div>
    </div>
  );
};