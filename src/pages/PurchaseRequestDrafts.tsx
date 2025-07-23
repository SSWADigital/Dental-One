import React, { useEffect, useState } from 'react';
import { getDraftPurchaseRequests, DraftPurchaseRequest, deleteDraftPurchaseRequest, updateDraftPurchaseRequest } from '../api/purchaseRequest';
import { useAuth } from '../App';
import ModalDialog from '../components/ModalDialog';

const DRAFTS_KEY = 'purchaseRequestDrafts';

interface PurchaseRequestDraft {
  id: string;
  name: string;
  department: string;
  type: 'Barang' | 'Jasa';
  createdAt: string;
  status: 'Baru' | 'Perlu Persetujuan' | 'Ditolak';
  totalItem: number;
  estCost: number;
}

const statusColors: Record<string, string> = {
  'Baru': 'bg-blue-50 text-blue-600',
  'Perlu Persetujuan': 'bg-orange-50 text-orange-600',
  'Ditolak': 'bg-red-50 text-red-600',
};

const PurchaseRequestDrafts: React.FC = () => {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<DraftPurchaseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'Semua' | 'Baru' | 'Perlu Persetujuan' | 'Ditolak'>('Semua');
  const [viewDraft, setViewDraft] = useState<any | null>(null);
  const [editDraft, setEditDraft] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleView = (draft: any) => setViewDraft(draft);
  const handleEdit = (draft: any) => setEditDraft(draft);
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await deleteDraftPurchaseRequest(id);
    if (!error) setDrafts(drafts => drafts.filter(d => d.id !== id));
    setDeletingId(null);
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getDraftPurchaseRequests(user.id).then(({ data, error }) => {
      if (error) setError('Gagal memuat draft dari database');
      else setDrafts(data || []);
      setLoading(false);
    });
  }, [user]);

  // Statistik
  const statBaru = drafts.filter(d => d.status === 'Baru').length;
  const statPerlu = drafts.filter(d => d.status === 'Perlu Persetujuan').length;
  const statDitolak = drafts.filter(d => d.status === 'Ditolak').length;
  const statTotal = drafts.length;

  // Filter tab
  const filteredDrafts = tab === 'Semua' ? drafts : drafts.filter(d => d.status === tab);

  if (loading) return <div className="p-6">Memuat draft...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Statistik */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
          <div className="text-blue-600 font-bold text-lg">Draft Baru</div>
          <div className="text-3xl font-extrabold mt-2">{statBaru}</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center">
          <div className="text-orange-600 font-bold text-lg">Perlu Persetujuan</div>
          <div className="text-3xl font-extrabold mt-2">{statPerlu}</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 flex flex-col items-center">
          <div className="text-red-600 font-bold text-lg">Draft Ditolak</div>
          <div className="text-3xl font-extrabold mt-2">{statDitolak}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
          <div className="text-gray-600 font-bold text-lg">Total Draft</div>
          <div className="text-3xl font-extrabold mt-2">{statTotal}</div>
        </div>
      </div>

      {/* Toolbar & Tab Placeholder */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">+ Tambah Draft PR</button>
          <input type="text" placeholder="Cari draft PR" className="border px-3 py-2 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <select className="border px-3 py-2 rounded-lg"><option>Kategori</option></select>
          <select className="border px-3 py-2 rounded-lg"><option>Departemen</option></select>
          <select className="border px-3 py-2 rounded-lg"><option>Status</option></select>
          <button className="border px-4 py-2 rounded-lg">Reset</button>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex gap-6 mb-6 text-sm font-semibold">
        {['Semua', 'Baru', 'Dalam Proses', 'Ditolak'].map((t) => (
          <button
            key={t}
            className={
              (tab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500') +
              ' pb-2 px-1 transition-colors'
            }
            onClick={() => setTab(t as any)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid Card Draft */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {filteredDrafts.map((draft) => (
          <div key={draft.id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">{draft.name}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[draft.status]}`}>{draft.status}</span>
            </div>
            <div className="text-gray-500 text-sm">{draft.created_at ? new Date(draft.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
            <div className="text-gray-700 text-sm">Departemen <span className="font-semibold">{draft.department}</span></div>
            <div className="text-gray-700 text-sm">Jenis Permintaan <span className="font-semibold">{draft.type}</span></div>
            <div className="flex justify-between text-sm mt-2">
              <div>Total Item <span className="font-semibold">{draft.total_item} item</span></div>
              <div>Est. Biaya <span className="font-semibold">Rp {draft.est_cost != null ? draft.est_cost.toLocaleString('id-ID') : '-'}</span></div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="text-blue-600 font-semibold hover:underline" onClick={() => handleView(draft)}>Lihat</button>
              <button className="text-green-600 font-semibold hover:underline" onClick={() => handleEdit(draft)}>Edit</button>
              <button className="text-red-500 font-semibold hover:underline" onClick={() => handleDelete(draft.id || '')} disabled={deletingId === draft.id}>{deletingId === draft.id ? 'Menghapus...' : 'Hapus'}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Panduan Cepat */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
          <span>ⓘ</span> Panduan Cepat
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-2 text-sm">
          <div className="flex-1 flex gap-2 items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">1</span>
            <div>
              <div className="font-semibold">Buat draft baru dan pilih jenis permintaan</div>
              <div className="text-gray-500">Tentukan apakah ini permintaan untuk barang atau jasa</div>
            </div>
          </div>
          <div className="flex-1 flex gap-2 items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">2</span>
            <div>
              <div className="font-semibold">Isi detail barang/jasa yang diminta</div>
              <div className="text-gray-500">Tambahkan spesifikasi, kuantitas, dan estimasi harga</div>
            </div>
          </div>
          <div className="flex-1 flex gap-2 items-start">
            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">3</span>
            <div>
              <div className="font-semibold">Simpan sebagai draft atau kirim untuk persetujuan</div>
              <div className="text-gray-500">Draft dapat diubah kapan saja sebelum disetujui</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lihat Draft */}
      {viewDraft && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-0 relative">
            <button onClick={() => setViewDraft(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
            <div className="p-8 pb-4">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detail Permintaan Pembelian</h2>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold ml-4 mt-1">{viewDraft.status || '-'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Tanggal</span>
                  <span className="font-medium text-gray-900">{viewDraft.required_by ? new Date(viewDraft.required_by).toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Departemen</span>
                  <span className="font-medium text-gray-900">{viewDraft.department}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">Total</span>
                  <span className="font-bold text-lg text-gray-900">IDR {viewDraft.est_cost != null ? viewDraft.est_cost.toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '-'}</span>
                </div>
              </div>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 rounded-tl-lg">Nama</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Qty</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Harga Satuan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 rounded-tr-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(viewDraft.items) && viewDraft.items.length > 0 ? (
                      viewDraft.items.map((item: any, idx: number) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{item.quantity}</td>
                          <td className="py-4 px-4 text-gray-600">IDR {item.unitPrice != null ? item.unitPrice.toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '-'}</td>
                          <td className="py-4 px-4 font-bold text-gray-900">IDR {item.total != null ? item.total.toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="p-2 text-center text-gray-400">Tidak ada item</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Subtotal, Pajak, Grand Total */}
              <div className="bg-blue-50 rounded-lg p-6 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">IDR {Array.isArray(viewDraft.items) ? viewDraft.items.reduce((sum: number, item: any) => sum + (item.total || 0), 0).toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '0,00'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Pajak (11%)</span>
                  <span className="text-gray-900">IDR {Array.isArray(viewDraft.items) ? (viewDraft.items.reduce((sum: number, item: any) => sum + (item.total || 0), 0) * 0.11).toLocaleString('id-ID', { minimumFractionDigits: 2 }) : '0,00'}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="font-bold text-lg">Grand Total</span>
                  <span className="font-bold text-lg">
                    IDR {Array.isArray(viewDraft.items)
                      ? (viewDraft.items.reduce((sum: number, item: any) => sum + (item.total || 0), 0) * 1.11).toLocaleString('id-ID', { minimumFractionDigits: 2 })
                      : '0,00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Edit Draft */}
      {editDraft && (
        <EditDraftModal
          draft={editDraft}
          onClose={() => setEditDraft(null)}
          onSave={async (updatedDraft) => {
            const { data, error } = await updateDraftPurchaseRequest(editDraft.id, updatedDraft);
            if (!error && data) {
              setDrafts((prev) => prev.map((d) => d.id === data.id ? data : d));
              setEditDraft(null);
            } else {
              alert('Gagal update draft!');
            }
          }}
        />
      )}
      {/* Modal Konfirmasi Hapus Draft */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus Draft</h2>
            <p className="mb-6">Apakah Anda yakin ingin menghapus draft ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Batal</button>
              <button onClick={async () => { await handleDelete(deletingId); }} className="px-4 py-2 bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseRequestDrafts;

function EditDraftModal({ draft, onClose, onSave }: { draft: any, onClose: () => void, onSave: (d: any) => void }) {
  const [department, setDepartment] = React.useState(draft.department || '');
  const [requiredBy, setRequiredBy] = React.useState(draft.required_by || '');
  const [location, setLocation] = React.useState(draft.location || '');
  const [notes, setNotes] = React.useState(draft.notes || '');
  const [items, setItems] = React.useState<any[]>(draft.items || []);
  const [saving, setSaving] = React.useState(false);
  const [showStockAlert, setShowStockAlert] = React.useState(false);

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        let newQuantity = item.quantity + change;
        if (newQuantity > item.stockAvail) {
          setShowStockAlert(true);
          newQuantity = item.stockAvail;
        }
        newQuantity = Math.max(1, newQuantity);
        return { ...item, quantity: newQuantity, total: newQuantity * item.unitPrice };
      }
      return item;
    }));
  };
  const removeItem = (id: number) => setItems(items.filter(item => item.id !== id));

  const handleSave = async () => {
    setSaving(true);
    const est_cost = items.reduce((sum, i) => sum + i.total, 0);
    await onSave({
      department,
      required_by: requiredBy,
      location,
      notes,
      items,
      total_item: items.length,
      est_cost,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
        <h2 className="text-xl font-bold mb-6">Edit Draft PR</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Dental Surgery</option>
              <option>General Dentistry</option>
              <option>Orthodontics</option>
              <option>Pediatric Dentistry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required By</label>
            <input type="date" value={requiredBy} onChange={e => setRequiredBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
          <table className="w-full text-sm mb-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-2 font-medium text-gray-700">Nama</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Qty</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Harga Satuan</th>
                <th className="text-left py-2 px-2 font-medium text-gray-700">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-2 px-2">{item.name}<div className="text-xs text-gray-400">SKU: {item.sku}</div></td>
                  <td className="py-2 px-2 flex items-center gap-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </td>
                  <td className="py-2 px-2">IDR {item.unitPrice != null ? item.unitPrice.toLocaleString('id-ID') : '-'}</td>
                  <td className="py-2 px-2 font-bold">IDR {item.total != null ? item.total.toLocaleString('id-ID') : '-'}</td>
                  <td className="py-2 px-2"><button onClick={() => removeItem(item.id)} className="text-red-500">Hapus</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Batal</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
        </div>
        <ModalDialog
          open={showStockAlert}
          onClose={() => setShowStockAlert(false)}
          title="Stok Tidak Cukup"
          message="Jumlah yang diminta melebihi stok yang tersedia. Jumlah akan disesuaikan dengan stok maksimum."
          type="error"
        />
      </div>
    </div>
  );
} 