import React, { useEffect, useState } from 'react';
import { getPurchaseRequestDetail } from '../api/purchaseRequest';
import { useUserSettings } from '../App';

function formatDateIndo(dateStr: string) {
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const d = new Date(dateStr);
  return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

const PurchaseRequestDetail = ({ prId, onClose }: { prId: string, onClose: () => void }) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { settings: userSettings, loading: settingsLoading } = useUserSettings();

  useEffect(() => {
    getPurchaseRequestDetail(prId).then(res => {
      setDetail(res.data);
      setLoading(false);
    });
  }, [prId]);

  if (settingsLoading) return <div className="p-8">Loading...</div>;
  if (!detail) return <div className="p-8 text-red-600">Data not found</div>;

  const currency = userSettings?.currency || 'IDR';
  const language = userSettings?.language || 'id-ID';
  const currencyFormatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });

  const statusBadge = (
    <span className="text-sm bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
      {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
    </span>
  );

  const calcSubtotal = detail.purchase_request_items.reduce((sum: number, item: any) => sum + Number(item.total), 0);
  const tax = calcSubtotal * 0.11;
  const grandTotal = calcSubtotal + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Detail Permintaan Pembelian</h2>
          {statusBadge}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-gray-500">PR ID</div>
            <div className="text-blue-600 font-medium">{detail.pr_id}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Tanggal</div>
            <div className="text-gray-800">{formatDateIndo(detail.date)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Departemen</div>
            <div className="text-gray-800">{detail.department}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-gray-500">Total</div>
            <div className="text-gray-800 font-semibold">{currencyFormatter.format(grandTotal)}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Harga Satuan</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {detail.purchase_request_items.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                  </td>
                  <td className="px-4 py-2">{item.quantity} {item.unit}</td>
                  <td className="px-4 py-2">{currencyFormatter.format(item.unit_price)}</td>
                  <td className="px-4 py-2 font-semibold">{currencyFormatter.format(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="bg-blue-50 rounded-lg mt-6 p-4 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span>{currencyFormatter.format(calcSubtotal)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Pajak (11%)</span>
            <span>{currencyFormatter.format(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base mt-2">
            <span>Grand Total</span>
            <span>{currencyFormatter.format(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequestDetail;
