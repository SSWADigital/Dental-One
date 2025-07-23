// src/api/purchaseRequest.ts
import { supabase } from '../supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

export interface DraftPurchaseRequest {
  id?: string;
  user_id: string;
  name: string;
  department: string;
  type: 'Barang' | 'Jasa';
  items: any[];
  notes?: string;
  location?: string;
  required_by?: string;
  status: string;
  total_item: number;
  est_cost: number;
  created_at?: string;
  updated_at?: string;
}

// Get the next PR number for the current year
export async function getNextPurchaseRequestNumber() {
  const year = new Date().getFullYear();
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('id, pr_id, date')
    .like('pr_id', `PR-${year}-%`);
  if (error) return { error: error.message };
  // Find the highest sequence number
  let maxSeq = 0;
  if (data && data.length > 0) {
    data.forEach(pr => {
      const match = pr.pr_id && pr.pr_id.match(/^PR-\d{4}-(\d{4})$/);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (seq > maxSeq) maxSeq = seq;
      }
    });
  }
  return { next: maxSeq + 1 };
}

// Create a new purchase request (with items) with formatted PR ID
export async function createPurchaseRequest(request: any) {
  // Generate PR ID
  const year = new Date().getFullYear();
  const { next } = await getNextPurchaseRequestNumber();
  const prId = `PR-${year}-${String(next).padStart(4, '0')}`;
  // Remove items_detail before insert
  const { items_detail, ...prFields } = request;
  // 1. Insert into purchase_requests
  const { data: pr, error: prError } = await supabase
    .from('purchase_requests')
    .insert([{
      ...prFields,
      pr_id: prId
    }])
    .select()
    .single();
  if (prError) return { error: prError.message };
  // 2. Insert items
  if (items_detail && items_detail.length > 0) {
    const itemsToInsert = items_detail.map((item: any) => ({
      purchase_request_id: pr.id,
      ...item,
    }));
    const { error: itemsError } = await supabase
      .from('purchase_request_items')
      .insert(itemsToInsert);
    if (itemsError) return { error: itemsError.message };
  }
  return { data: pr };
}

// Get all purchase requests for a user
export async function getPurchaseRequests(userId: string) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*, purchase_request_items(*)')
    .eq('submitted_by', userId)
    .order('date', { ascending: false });

  if (error) return { error: error.message };
  return { data };
}

// Get a single purchase request by ID
export async function getPurchaseRequestById(id: string) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*, purchase_request_items(*)')
    .eq('id', id)
    .single();

  if (error) return { error: error.message };
  return { data };
}

// Get purchase request detail by ID (with items)
export async function getPurchaseRequestDetail(prId: string) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*, purchase_request_items(*)')
    .eq('pr_id', prId)
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Update a purchase request (main fields only)
export async function updatePurchaseRequest(id: string, updates: Partial<Omit<any, 'id'>>) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
}

// Delete a purchase request (and its items)
export async function deletePurchaseRequest(id: string) {
  // Delete items first (if needed, or use ON DELETE CASCADE in DB)
  await supabase.from('purchase_request_items').delete().eq('purchase_request_id', id);
  const { error } = await supabase.from('purchase_requests').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// CRUD for purchase_request_items

// Create a new item for a purchase request
export async function createPurchaseRequestItem(item: {
  purchase_request_id: string;
  product_id: string;
  name: string;
  sku: string;
  supplier_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  status: string;
  comment?: string;
}) {
  const { data, error } = await supabase
    .from('purchase_request_items')
    .insert([item])
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Get all items for a purchase request
export async function getPurchaseRequestItems(purchase_request_id: string) {
  const { data, error } = await supabase
    .from('purchase_request_items')
    .select('*')
    .eq('purchase_request_id', purchase_request_id);
  if (error) return { error: error.message };
  return { data };
}

// Update a purchase request item
export async function updatePurchaseRequestItem(id: string, updates: Partial<Omit<any, 'id'>>) {
  const { data, error } = await supabase
    .from('purchase_request_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

// Delete a purchase request item
export async function deletePurchaseRequestItem(id: string) {
  const { error } = await supabase
    .from('purchase_request_items')
    .delete()
    .eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// Get available products for selection in a purchase request
export async function getAvailableProductsForRequest() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'Active');
  if (error) return { error: error.message };
  return { data };
}

// Submit a purchase request (set status to 'submitted' and update date to now)
export async function submitPurchaseRequest(id: string) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .update({ status: 'submitted', date: new Date().toISOString().slice(0, 10) })
    .eq('id', id)
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function createDraftPurchaseRequest(data: DraftPurchaseRequest): Promise<{ data: DraftPurchaseRequest | null; error: PostgrestError | null }> {
  const { data: result, error } = await supabase
    .from('purchase_request_drafts')
    .insert([data])
    .select()
    .single();
  return { data: result, error };
}

export async function getDraftPurchaseRequests(userId: string): Promise<{ data: DraftPurchaseRequest[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('purchase_request_drafts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function deleteDraftPurchaseRequest(id: string): Promise<{ error: PostgrestError | null }> {
  const { error } = await supabase
    .from('purchase_request_drafts')
    .delete()
    .eq('id', id);
  return { error };
}

export async function updateDraftPurchaseRequest(id: string, updates: Partial<DraftPurchaseRequest>): Promise<{ data: DraftPurchaseRequest | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from('purchase_request_drafts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}
