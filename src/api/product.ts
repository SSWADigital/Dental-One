import { supabase } from '../supabaseClient';

// Get all products
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
  if (error) return { error: error.message };
  return { data };
}

// Get product by ID
export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Create product
export async function createProduct(product: any) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Update product
export async function updateProduct(id: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Delete product
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// Fetch external products with filter
export async function fetchExternalProducts({ sku, name, supplier }: { sku?: string; name?: string; supplier?: string }) {
  const baseUrl = 'https://app.cobradental.co.id:1780/sales_opti_neww2/public/api/v1/get-price-list';
  const queryParams: Record<string, string> = { };
  if (sku) queryParams['namabarang'] = sku;
  // if (sku) queryParams['namabarang'] = sku;
  // if (sku) queryParams['suplier'] = sku;
  const url = baseUrl + '?' + new URLSearchParams(queryParams).toString();
  const res = await fetch(url);
  const json = await res.json();
  if (json.success && Array.isArray(json.data)) {
    return json.data.map((item: any) => ({
      id: `external-${item.id_product}`,
      name: item.deskripsi,
      sku: item.code,
      supplier: item.supplier,
      price: item.harga_per_satuan_jual,
      rating: 0,
      reviewCount: 0,
      image: item.foto_url,
      stock: Number(item.stok),
      stockStatus: Number(item.stok) > 0 ? (Number(item.stok) <= 5 ? 'low-stock' : 'in-stock') : 'out-of-stock',
      category: '',
      description: item.deskripsi,
      isRecommended: false,
      isCustom: false,
      dateAdded: undefined,
      isUrgentNeed: false
    }));
  }
  return [];
}

// Get all products merged with external API, with optional filter
export async function getAllProductsMerged(filter?: { sku?: string; name?: string; supplier?: string }) {
  // Fetch from Supabase
  const { data: supabaseProducts, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
  if (error) return { error: error.message };

  // Fetch from external API with filter
  let externalProducts: any[] = [];
  try {
    externalProducts = await fetchExternalProducts(filter || {});
  } catch (e) {
    // ignore error, just use supabase data
  }

  // Gabungkan, prioritaskan Supabase jika SKU sama
  const supabaseSkuSet = new Set((supabaseProducts || []).map((p: any) => p.sku));
  const merged = [
    ...(supabaseProducts || []),
    ...externalProducts.filter((p: any) => !supabaseSkuSet.has(p.sku))
  ];
  return { data: merged };
} 