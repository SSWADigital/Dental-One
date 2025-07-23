import { supabase } from './supabaseClient';

// Login function: returns { user, role } or { error }
export async function login(email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (authError) {
    return { error: authError.message };
  }
  const userId = authData.user.id;
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  if (profileError) {
    return { error: 'Profile not found. Please contact support.' };
  }
  return { user: authData.user, role: profile.role };
}

// Get current session (returns user or null)
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session?.user || null;
}

// Logout function
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

// Create a new purchase request (beserta items)
export async function createPurchaseRequest(request: {
  submitted_by: string;
  date: string;
  department: string;
  required_by: string;
  items: number;
  total_cost: number;
  status: string;
  items_detail: Array<{
    product_id: string;
    name: string;
    sku: string;
    supplier_id: string;
    quantity: number;
    unit_price: number;
    total: number;
    status: string;
    comment?: string;
  }>;
}) {
  // 1. Insert ke purchase_requests
  const { data: reqData, error: reqError } = await supabase
    .from('purchase_requests')
    .insert([{
      submitted_by: request.submitted_by,
      date: request.date,
      department: request.department,
      required_by: request.required_by,
      items: request.items,
      total_cost: request.total_cost,
      status: request.status,
    }])
    .select('id')
    .single();

  if (reqError) return { error: reqError.message };

  // 2. Insert items ke purchase_request_items
  const itemsToInsert = request.items_detail.map(item => ({
    ...item,
    purchase_request_id: reqData.id,
  }));

  const { error: itemsError } = await supabase
    .from('purchase_request_items')
    .insert(itemsToInsert);

  if (itemsError) return { error: itemsError.message };

  return { success: true, id: reqData.id };
}

// Get all purchase requests (optionally by user)
export async function getPurchaseRequests(userId?: string) {
  let query = supabase
    .from('purchase_requests')
    .select('*, purchase_request_items(*)')
    .order('date', { ascending: false });

  if (userId) {
    query = query.eq('submitted_by', userId);
  }

  const { data, error } = await query;
  if (error) return { error: error.message };
  return { data };
}

// Get single purchase request by id
export async function getPurchaseRequestById(id: string) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*, purchase_request_items(*)')
    .eq('id', id)
    .single();

  if (error) return { error: error.message };
  return { data };
}

// Update purchase request status
export async function updatePurchaseRequestStatus(id: string, status: string) {
  const { error } = await supabase
    .from('purchase_requests')
    .update({ status })
    .eq('id', id);

  if (error) return { error: error.message };
  return { success: true };
}

// Delete purchase request (and its items)
export async function deletePurchaseRequest(id: string) {
  // Hapus items dulu (jika tidak pakai cascade)
  await supabase.from('purchase_request_items').delete().eq('purchase_request_id', id);
  const { error } = await supabase.from('purchase_requests').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}