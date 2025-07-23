import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import { getCompanyInfo, updateCompanyInfo, createCompanyInfo } from '../api/companyInfo';
import { useAuth } from '../App';

export const CompanyInfoSection: React.FC = () => {
  const { user } = useAuth();
  const [info, setInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (user) {
      getCompanyInfo(user.id).then(res => {
        if (res.data) setInfo(res.data);
        else createCompanyInfo(user.id, {}).then(r => setInfo(r.data));
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (field: string, value: any) => {
    setInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMsg('');
    const res = await updateCompanyInfo(user.id, info);
    if (res.error) setSaveMsg('Gagal menyimpan: ' + res.error);
    else setSaveMsg('Berhasil disimpan!');
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Building2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Informasi Perusahaan</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan</label>
          <input type="text" value={info.company_name || ''} onChange={e => handleChange('company_name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <input type="text" value={info.address || ''} onChange={e => handleChange('address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
            <input type="text" value={info.city || ''} onChange={e => handleChange('city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <input type="text" value={info.province || ''} onChange={e => handleChange('province', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
            <input type="text" value={info.postal_code || ''} onChange={e => handleChange('postal_code', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
          <input type="text" value={info.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={info.email || ''} onChange={e => handleChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input type="text" value={info.website || ''} onChange={e => handleChange('website', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NPWP</label>
          <input type="text" value={info.npwp || ''} onChange={e => handleChange('npwp', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        {saveMsg && <div className="mt-2 text-green-600">{saveMsg}</div>}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mt-2" onClick={handleSave} disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
      </div>
    </div>
  );
};