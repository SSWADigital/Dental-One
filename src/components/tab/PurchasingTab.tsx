import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Settings, 
  FileText, 
  Package, 
  Users, 
  Bell,
  ChevronRight,
  ChevronDown,
  Info,
  Download
} from 'lucide-react';
import { ToggleSwitch } from '../ToggleSwitch';

export const PurchasingTab: React.FC = () => {
  const [approvalFlowEnabled, setApprovalFlowEnabled] = useState(true);
  const [limitConfigEnabled, setLimitConfigEnabled] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        {/* Purchase Flow Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">Alur Persetujuan Pembelian</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700">Aktifkan Alur Persetujuan</div>
                <div className="text-xs text-gray-500">Menggunakan persetujuan untuk proses pembelian</div>
              </div>
              <ToggleSwitch enabled={approvalFlowEnabled} onChange={setApprovalFlowEnabled} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Alur Persetujuan
              </label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>Hierarki (Berdasarkan Level)</option>
                  <option>Paralel (Semua Approver)</option>
                  <option>Sequential (Berurutan)</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level Persetujuan
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Level 1</div>
                      <div className="text-xs text-gray-600">Manager Departemen</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">24 jam</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Level 2</div>
                      <div className="text-xs text-gray-600">Kepala Keuangan</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">48 jam</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Level 3</div>
                      <div className="text-xs text-gray-600">Direktur</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">72 jam</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Level Persetujuan</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Eskalasi
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Eskalasi otomatis jika melewati batas waktu</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Kirim notifikasi pengingat</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Persetujuan otomatis jika tidak ada respons</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Document Templates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Template Dokumen</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Dokumen Pembelian
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Purchase Order (PO)</div>
                      <div className="text-xs text-gray-500">Terakhir diperbarui: 15 Mar 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Pratinjau</button>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Request for Quotation (RFQ)</div>
                      <div className="text-xs text-gray-500">Terakhir diperbarui: 12 Mar 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Pratinjau</button>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Goods Receipt Note</div>
                      <div className="text-xs text-gray-500">Terakhir diperbarui: 10 Mar 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Pratinjau</button>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Supplier Agreement</div>
                      <div className="text-xs text-gray-500">Terakhir diperbarui: 20 Dec 2022</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Pratinjau</button>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                + Unggah Template Baru
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Template
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Sertakan logo perusahaan pada semua dokumen</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Sertakan syarat dan ketentuan standar</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Tampilkan tanda tangan digital</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Kirim dokumen secara otomatis ke pemasok</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor/Supplier Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Pengaturan Vendor/Supplier</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kriteria Evaluasi Pemasok
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Kualitas Produk</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">30%</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Ketepatan Waktu</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">25%</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Harga</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">20%</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Layanan Purna Jual</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">15%</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Kelengkapan Dokumen</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">10%</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kriteria</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ketentuan Pembayaran
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Net 30</div>
                    <div className="text-xs text-gray-500">Pembayaran dalam 30 hari</div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm">Detail</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Net 15</div>
                    <div className="text-xs text-gray-500">Pembayaran dalam 15 hari</div>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">2/10 Net 30</div>
                    <div className="text-xs text-gray-500">Diskon 2% jika dibayar dalam 10 hari, jatuh tempo dalam 30 hari</div>
                  </div>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Ketentuan Pembayaran</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Tambahan
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Wajibkan verifikasi pembeli baru</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Aktifkan penilaian pemasok otomatis</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Kirim notifikasi untuk perubahan status pemasok</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Biarkan jaminan pemasok per kategori</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Approval Limits Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Konfigurasi Limit Persetujuan</h2>
            </div>
            <ToggleSwitch enabled={limitConfigEnabled} onChange={setLimitConfigEnabled} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aktifkan Limit Persetujuan
              </label>
              <p className="text-xs text-gray-500 mb-3">Mengatur batas nilai untuk setiap persetujuan</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batas Persetujuan Berdasarkan Peran
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Staff</div>
                    <div className="text-xs text-gray-500">Persetujuan Manager Departemen</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Rp 1.000.000</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Manager Departemen</div>
                    <div className="text-xs text-gray-500">Persetujuan Kepala Keuangan</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Rp 10.000.000</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Kepala Keuangan</div>
                    <div className="text-xs text-gray-500">Persetujuan Direktur</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Rp 50.000.000</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Direktur</div>
                    <div className="text-xs text-gray-500">Persetujuan -</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">Tidak Terbatas</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Batas Persetujuan</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Tambahan
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Persetujuan wajib untuk semua pembelian di atas Rp 500.000</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Persetujuan khusus untuk kategori produk tertentu</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Persetujuan wajib untuk pemasok baru</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Konfigurasi Kategori Produk</h2>
            </div>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>Tambah Kategori</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Produk
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Peralatan Medis</div>
                    <div className="text-xs text-gray-500">45 produk • 8 subkategori</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Bahan Habis Pakai</div>
                    <div className="text-xs text-gray-500">78 produk • 12 subkategori</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Obat-obatan</div>
                    <div className="text-xs text-gray-500">156 produk • 24 subkategori</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Peralatan Kantor</div>
                    <div className="text-xs text-gray-500">32 produk • 6 subkategori</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Perlengkapan Kebersihan</div>
                    <div className="text-xs text-gray-500">23 produk • 4 subkategori</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Kategori
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Wajibkan kategori untuk semua produk</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Izinkan multi-kategori untuk produk</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Batasi kategori berdasarkan peran pengguna</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atribut Produk
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Merek</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Wajib</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Ukuran</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Opsional</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Warna</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Opsional</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Bahan</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Opsional</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Atribut</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Pengaturan Notifikasi Pembelian</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notifikasi Email
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Permintaan Pembelian Baru</div>
                    <div className="text-xs text-gray-500">Penerima: Manager Departemen</div>
                  </div>
                  <ToggleSwitch enabled={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Persetujuan Pembelian</div>
                    <div className="text-xs text-gray-500">Penerima: Pemohon, Manager</div>
                  </div>
                  <ToggleSwitch enabled={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Pesanan Pembelian Diterbitkan</div>
                    <div className="text-xs text-gray-500">Penerima: Pemohon, Pemasok</div>
                  </div>
                  <ToggleSwitch enabled={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Pengingirat Persetujuan</div>
                    <div className="text-xs text-gray-500">Penerima: Penyetuju</div>
                  </div>
                  <ToggleSwitch enabled={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Penerimaan Barang</div>
                    <div className="text-xs text-gray-500">Penerima: Pemohon, Gudang</div>
                  </div>
                  <ToggleSwitch enabled={false} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Email
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Permintaan Persetujuan</div>
                    <div className="text-xs text-gray-500">Diperbarui: 10 Mar 2023</div>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Konfirmasi Persetujuan</div>
                    <div className="text-xs text-gray-500">Diperbarui: 10 Mar 2023</div>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Penolakan Persetujuan</div>
                    <div className="text-xs text-gray-500">Diperbarui: 10 Mar 2023</div>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Pesanan Pembelian</div>
                    <div className="text-xs text-gray-500">Diperbarui: 05 Mar 2023</div>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengaturan Tambahan
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Sertakan tautan langsung ke dokumen</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Kirim notifikasi dalam aplikasi</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="text-sm text-gray-700">Kirim notifikasi SMS untuk persetujuan mendesak</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};