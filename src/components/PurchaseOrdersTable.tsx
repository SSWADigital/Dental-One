import React, { useEffect, useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import CreatePurchaseOrderPopup from './CreatePurchaseOrderPopup';
import { supabase } from '../supabaseClient';
import { useUserSettings } from '../App';
// Import xlsx for Excel export
import * as XLSX from 'xlsx';
import ModalDialog from './ModalDialog';

const PurchaseOrdersTable = () => {
  const { settings: userSettings, loading: settingsLoading } = useUserSettings();
  const [activeTab, setActiveTab] = useState('All PRs');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreatePOPopup, setShowCreatePOPopup] = useState(false);
  const [selectedPR, setSelectedPR] = useState<any>(null);
  const [purchaseRequests, setPurchaseRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('info');

  const tabs = ['All PRs', 'Dental Equipment', 'Supplies', 'Office', 'Lab Materials'];

  // Fungsi untuk update status item PR setelah PO dibuat
  async function updatePRItemsStatus(itemIds: any[], newStatus = 'ordered') {
    const { error } = await supabase
      .from('purchase_request_items')
      .update({ status: newStatus })
      .in('id', itemIds);
    if (error) throw new Error(error.message);
  }

  // Pindahkan fetchApprovedPRs ke scope atas agar bisa dipanggil ulang
  async function fetchApprovedPRs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('purchase_requests')
      .select('*, purchase_request_items(*)')
      .order('date', { ascending: false });
    if (!error && data) {
      // Hanya tampilkan PR yang punya minimal 1 item approved
      const filtered = data.filter((pr: any) =>
        (pr.purchase_request_items || []).some((item: any) => item.status === 'approved')
      ).map((pr: any) => ({
        id: pr.pr_id || pr.id,
        department: pr.department,
        items: (pr.purchase_request_items || []).filter((item: any) => item.status === 'approved').length,
        totalValue: (pr.purchase_request_items || []).filter((item: any) => item.status === 'approved').reduce((sum: number, item: any) => sum + (item.total || 0), 0),
        requiredBy: pr.required_by,
        itemsDetail: (pr.purchase_request_items || []).filter((item: any) => item.status === 'approved'),
      }));
      setPurchaseRequests(filtered);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApprovedPRs();
  }, []);

  const supplierData = {
    name: 'Cobra',
    logo: '',
    rating: 4.9,
    isPreferred: true,
    estimatedDelivery: '2-3 days',
    qualityScore: '98/100',
    contact: 'sales@cobra-dental.com'
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(purchaseRequests.map(pr => pr.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const isSelected = (id: string) => selectedItems.includes(id);
  const selectedCount = selectedItems.length;

  const handleCreatePO = (pr: any) => {
    setSelectedPR({
      ...pr,
      itemsDetail: (pr.itemsDetail || [])
        .filter((item: any) => item.status === 'approved')
        .map((item: any) => ({
          ...item,
          unitPrice: item.unitPrice ?? item.unit_price ?? 0,
          totalPrice: item.totalPrice ?? item.total ?? 0,
        }))
    });
    setShowCreatePOPopup(true);
  };

  // Tambahkan helper untuk mapping item ke format eksternal
  function mapItemsForExternalAPI(items: any[]) {
    return items.map(item => ({
      id_product: (item.product_id?.toString() || '').replace(/^external-/, ''),
      kode: item.sku || '',
      nama: item.name || '',
      harga_per_satuan_jual: item.unitPrice || 0,
      diskon: '0.00', // Default, bisa diubah jika ada diskon
      ppn: 0,
      subtotal: item.totalPrice || 0,
      jumlah: item.quantity || 1,
      total: (item.totalPrice || 0).toFixed(2),
    }));
  }

  // Helper untuk kirim ke API eksternal
  async function sendToExternalAPI(items: any[]) {
    const url = 'https://app.cobradental.co.id:1780/sales_opti_neww2/public/api/v1/Pemesanan/insertPemesanan';
    const formData = new FormData();
    formData.append('user_id', '319');
    formData.append('id_tim_sales3', '319'); // Sesuai instruksi
    formData.append('jenis_bayar', 'kredit'); // Default, bisa diubah jika perlu
    formData.append('customer_id', '10960');
    formData.append('data_product', JSON.stringify(items));

    try {
      console.log(JSON.stringify(items));
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const text = await response.text();
      if (response.ok) {
        console.log('Berhasil kirim ke API eksternal:', text);
      } else {
        console.error('Gagal kirim ke API eksternal:', text);
      }
    } catch (e) {
      console.error('Error kirim ke API eksternal:', e);
    }
  }

  async function createPurchaseOrder(po: any, items: any[]) {
    // 1. Insert ke purchase_orders
    const { data: poData, error: poError } = await supabase
      .from('purchase_orders')
      .insert([po])
      .select()
      .single();
    if (poError) throw new Error(poError.message);
    // 2. Insert items ke order_items
    const orderItems = items.map(item => ({
      order_id: poData.id,
      product_id: (item.product_id || item.id || '').toString().replace(/^external-/, ''),
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
      status: 'ordered',
    }));
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    if (itemsError) throw new Error(itemsError.message);

    // 3. Kirim ke API eksternal
    const mappedItems = mapItemsForExternalAPI(items);
    await sendToExternalAPI(mappedItems);

    return poData;
  }

  async function fetchPurchaseOrders() {
    const { data, error } = await supabase
      .from('purchase_orders')
      .select('*')
      .order('order_date', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  const handleConfirmCreatePO = async () => {
    if (!selectedPR) return;
    const today = new Date().toISOString().slice(0, 10);
    const po = {
      clinic: 'Bright Smile', // Ganti sesuai kebutuhan
      clinic_code: 'BS-001', // Ganti sesuai kebutuhan
      order_date: today,
      items: selectedPR.itemsDetail.length,
      total_value: selectedPR.itemsDetail.reduce((sum: number, i: any) => sum + (i.totalPrice || 0), 0),
      status: 'New',
      shipping_address: '-',
      contact_person: '-',
      contact_email: '-',
      contact_phone: '-',
    };
    try {
      await createPurchaseOrder(po, selectedPR.itemsDetail);
      // Update status item PR
      const itemIds = selectedPR.itemsDetail.map((item: any) => item.id);
      await updatePRItemsStatus(itemIds, 'ordered');
      // Refresh PR list
      await fetchApprovedPRs();
      setShowCreatePOPopup(false);
      setModalTitle('Success');
      setModalMessage('Purchase Order created and saved to database!');
      setModalType('success');
      setModalOpen(true);
    } catch (e: any) {
      setModalTitle('Error');
      setModalMessage('Gagal membuat PO: ' + e.message);
      setModalType('error');
      setModalOpen(true);
    }
  };

  // Fungsi untuk Create All PO
  const handleCreateAllPO = async () => {
    if (selectedItems.length === 0) {
      setModalTitle('Warning');
      setModalMessage('Pilih minimal satu PR!');
      setModalType('info');
      setModalOpen(true);
      return;
    }
    setLoading(true);
    try {
      for (const prId of selectedItems) {
        const pr = purchaseRequests.find((p: any) => p.id === prId);
        if (!pr) continue;
        const today = new Date().toISOString().slice(0, 10);
        const po = {
          clinic: 'Bright Smile',
          clinic_code: 'BS-001',
          order_date: today,
          items: pr.itemsDetail.length,
          total_value: pr.itemsDetail.reduce((sum: number, i: any) => sum + (i.totalPrice || 0), 0),
          status: 'New',
          shipping_address: '-',
          contact_person: '-',
          contact_email: '-',
          contact_phone: '-',
        };
        await createPurchaseOrder(po, pr.itemsDetail);
        const itemIds = pr.itemsDetail.map((item: any) => item.id);
        await updatePRItemsStatus(itemIds, 'ordered');
      }
      await fetchApprovedPRs();
      setSelectedItems([]);
      setModalTitle('Success');
      setModalMessage('Semua PO berhasil dibuat!');
      setModalType('success');
      setModalOpen(true);
    } catch (e: any) {
      setModalTitle('Error');
      setModalMessage('Gagal membuat beberapa PO: ' + e.message);
      setModalType('error');
      setModalOpen(true);
    }
    setLoading(false);
  };

  // Fungsi untuk Generate RFQ
  const handleGenerateRFQ = async () => {
    if (selectedItems.length === 0) {
      alert('Pilih minimal satu PR!');
      return;
    }
    setLoading(true);
    try {
      // Kumpulkan data untuk file RFQ
      let rfqRows: any[] = [];
      for (const prId of selectedItems) {
        const pr = purchaseRequests.find((p: any) => p.id === prId);
        if (!pr) continue;
        const itemIds = pr.itemsDetail.map((item: any) => item.id);
        await updatePRItemsStatus(itemIds, 'rfq');
        // Tambahkan data PR dan item ke array
        pr.itemsDetail.forEach((item: any) => {
          rfqRows.push({
            'PR ID': pr.id,
            'Department': pr.department,
            'Required By': pr.requiredBy,
            'id_product': (item.product_id?.toString() || '').replace(/^external-/, ''),
            'kode': item.sku || '',
            'nama': item.name || '',
            'harga_per_satuan_jual': item.unitPrice || 0,
            'diskon': '0.00',
            'ppn': 0,
            'subtotal': item.totalPrice || 0,
            'jumlah': item.quantity || 1,
            'total': (item.totalPrice || 0).toFixed(2),
          });
        });
      }
      await fetchApprovedPRs();
      setSelectedItems([]);
      // Generate dan download file Excel
      if (rfqRows.length > 0) {
        const ws = XLSX.utils.json_to_sheet(rfqRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'RFQ');
        XLSX.writeFile(wb, `RFQ_${new Date().toISOString().slice(0,10)}.xlsx`);
      }
      alert('RFQ berhasil digenerate untuk PR terpilih!');
    } catch (e: any) {
      alert('Gagal generate RFQ: ' + e.message);
    }
    setLoading(false);
  };

  const currency = userSettings?.currency || 'IDR';
  const language = userSettings?.language || 'id-ID';
  const currencyFormatter = new Intl.NumberFormat(language, { style: 'currency', currency });

  if (settingsLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        {/* Tabs */}
        <div className="flex space-x-8 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Selection and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCount === purchaseRequests.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Select All
              </span>
            </label>
            <span className="text-sm text-gray-500">
              {selectedCount} PRs selected
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleGenerateRFQ}
              disabled={loading}
            >
              Generate RFQ
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleCreateAllPO}
              disabled={loading}
            >
              Create All PO
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">PR ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">DEPARTMENT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ITEMS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">TOTAL VALUE</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">REQUIRED BY</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {purchaseRequests.map((pr) => (
                <tr key={pr.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected(pr.id)}
                      onChange={(e) => handleSelectItem(pr.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                      {pr.id}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{pr.department}</td>
                  <td className="py-4 px-4 text-gray-600">{pr.items} items</td>
                  <td className="py-4 px-4 font-medium text-gray-900">{currencyFormatter.format(pr.totalValue)}</td>
                  <td className="py-4 px-4 text-gray-600">{pr.requiredBy}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleCreatePO(pr)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Create PO
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Purchase Order Popup */}
      <CreatePurchaseOrderPopup
        isOpen={showCreatePOPopup}
        onClose={() => setShowCreatePOPopup(false)}
        prDetails={{
          id: selectedPR?.id || '',
          requestedBy: selectedPR?.requestedBy || '',
          department: selectedPR?.department || '',
          dateRequired: selectedPR?.requiredBy || '',
          totalValue: selectedPR?.totalValue || 0,
          items: selectedPR?.itemsDetail || []
        }}
        supplier={supplierData}
        onConfirm={handleConfirmCreatePO}
      />
      <ModalDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </>
  );
};

export default PurchaseOrdersTable;