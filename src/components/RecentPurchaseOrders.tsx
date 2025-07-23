import React, { useEffect, useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import { getPurchaseOrders, PurchaseOrder } from '../api/purchaseOrder';

const PAGE_SIZE = 3;

// Helper to build FormData for the API
function buildPOFormData() {
  const formData = new FormData();
  formData.append('user_id', '319');
  formData.append('id_tim_sales3', '319'); // using same as user_id for demo
  formData.append('jenis_bayar', 'Cash'); // example value
  formData.append('customer_id', '10960');
  // Example product data
  const data_product = [
    {
      id_product: '1',
      kode: 'P-001',
      nama: 'Sample Product',
      harga_per_satuan_jual: 100000,
      diskon: '0.00',
      ppn: 0,
      subtotal: 100000,
      jumlah: 1,
      total: '100000.00',
    },
  ];
  formData.append('data_product', JSON.stringify(data_product));
  return formData;
}

const RecentPurchaseOrders = () => {
  const [timeFilter, setTimeFilter] = useState<'Last 30 days' | 'Last 7 days' | 'Last 90 days' | 'This year'>('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPurchaseOrders({ page: currentPage, pageSize: PAGE_SIZE, timeFilter })
      .then(res => {
        if (res.error) {
          setError(res.error);
          setOrders([]);
          setTotalCount(0);
        } else {
          setOrders(res.data || []);
          setTotalCount(res.count || 0);
        }
        setLoading(false);
      });
  }, [timeFilter, currentPage]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Action: Create PO via external API
  const handleCreatePO = async () => {
    setSending(true);
    const formData = buildPOFormData();
    try {
      const response = await fetch(
        'https://app.cobradental.co.id:1780/sales_opti_neww2/public/api/v1/Pemesanan/insertPemesanan',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        alert('PO created successfully!');
      } else {
        const text = await response.text();
        alert('Failed to create PO: ' + text);
      }
    } catch (e) {
      alert('Server error: ' + e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select 
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={handleCreatePO}
            disabled={sending}
          >
            {sending ? 'Creating PO...' : 'Create PO (API)'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">PO ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">PR REFERENCE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">SUPPLIER</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">DATE CREATED</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL VALUE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">EXPECTED DELIVERY</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="py-6 text-center text-gray-500">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={8} className="py-6 text-center text-red-500">{error}</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={8} className="py-6 text-center text-gray-500">No purchase orders found.</td></tr>
            ) : (
              orders.map((order, idx) => {
                // Format PO ID: PO-Tahun-0001
                let year = '';
                if (order.order_date) {
                  year = new Date(order.order_date).getFullYear().toString();
                }
                const orderNumber = (PAGE_SIZE * (currentPage - 1)) + idx + 1;
                const formattedId = `PO-${year}-${orderNumber.toString().padStart(4, '0')}`;
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                        {formattedId}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">-</td>
                    <td className="py-4 px-4 text-gray-600">-</td>
                    <td className="py-4 px-4 text-gray-600">{order.order_date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">${order.total_value?.toFixed(2)}</td>
                    <td className="py-4 px-4 text-gray-600">-</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Info className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Results info and Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">
          Showing {orders.length === 0 ? 0 : (PAGE_SIZE * (currentPage - 1) + 1)} to {PAGE_SIZE * (currentPage - 1) + orders.length} of {totalCount} results
        </span>
        <div className="flex items-center space-x-2">
          <button 
            className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} text-sm`}
                onClick={() => setCurrentPage(i + 1)}
                disabled={loading}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            disabled={currentPage === totalPages || loading || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseOrders;