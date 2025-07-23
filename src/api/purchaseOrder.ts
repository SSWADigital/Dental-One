import { supabase } from '../supabaseClient';

export interface PurchaseOrder {
  id: string;
  clinic: string;
  clinic_code: string;
  order_date: string;
  items: number;
  total_value: number;
  status: string;
  shipping_address: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
}

export interface FetchPurchaseOrdersOptions {
  page?: number;
  pageSize?: number;
  timeFilter?: 'Last 7 days' | 'Last 30 days' | 'Last 90 days' | 'This year';
}

export async function getPurchaseOrders({ page = 1, pageSize = 10, timeFilter }: FetchPurchaseOrdersOptions = {}) {
  let from = (page - 1) * pageSize;
  let to = from + pageSize - 1;

  let query = supabase
    .from('purchase_orders')
    .select('*', { count: 'exact' })
    .order('order_date', { ascending: false })
    .range(from, to);

  // Apply time filter
  if (timeFilter) {
    const today = new Date();
    let fromDate: Date | null = null;
    if (timeFilter === 'Last 7 days') {
      fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 7);
    } else if (timeFilter === 'Last 30 days') {
      fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 30);
    } else if (timeFilter === 'Last 90 days') {
      fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 90);
    } else if (timeFilter === 'This year') {
      fromDate = new Date(today.getFullYear(), 0, 1);
    }
    if (fromDate) {
      query = query.gte('order_date', fromDate.toISOString().slice(0, 10));
    }
  }

  const { data, error, count } = await query;
  if (error) return { error: error.message };
  return { data, count };
} 