-- Users are handled by Supabase Auth

-- Roles table
create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text
);

-- Permissions table
create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid references roles(id) on delete cascade,
  module text not null,
  can_view boolean default false,
  can_create boolean default false,
  can_edit boolean default false,
  can_delete boolean default false,
  can_approve boolean default false
);

-- Suppliers table
create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_person text,
  contact_email text,
  contact_phone text,
  address text
);

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique not null,
  category text,
  tags text[],
  price numeric not null,
  stock integer default 0,
  stock_status text,
  delivery_time text,
  status text,
  image text,
  supplier_id uuid references suppliers(id) on delete set null,
  description text
);

-- Custom Products table
create table if not exists custom_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique not null,
  no_akl text,
  category text,
  price numeric not null,
  supplier_id uuid references suppliers(id) on delete set null,
  image_url text,
  is_urgent_need boolean default false
);

-- Purchase Requests table
create table if not exists purchase_requests (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references auth.users(id) on delete set null,
  date date not null,
  department text,
  required_by date,
  items integer,
  total_cost numeric,
  status text
);

-- Purchase Request Items table
create table if not exists purchase_request_items (
  id uuid primary key default gen_random_uuid(),
  purchase_request_id uuid references purchase_requests(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  name text,
  sku text,
  supplier_id uuid references suppliers(id) on delete set null,
  quantity integer,
  unit_price numeric,
  total numeric,
  status text,
  comment text
);

-- Purchase Orders table
create table if not exists purchase_orders (
  id uuid primary key default gen_random_uuid(),
  clinic text,
  clinic_code text,
  order_date date,
  items integer,
  total_value numeric,
  status text,
  shipping_address text,
  contact_person text,
  contact_email text,
  contact_phone text
);

-- Order Items table
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references purchase_orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  name text,
  sku text,
  quantity integer,
  unit_price numeric,
  total_price numeric,
  status text
);

-- Shipments table
create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references purchase_orders(id) on delete cascade,
  carrier text,
  tracking_number text,
  shipping_date date,
  estimated_delivery date,
  shipment_type text,
  additional_notes text
);

-- Inventory table
create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  location text,
  par_level text,
  current_stock integer,
  usage integer,
  status text,
  forecast text
);

-- User Settings Table
create table if not exists user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  currency text default 'USD',
  language text default 'en',
  notification_email boolean default true,
  notification_push boolean default true,
  theme text default 'light',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Company Info Table
create table if not exists company_info (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  company_name text,
  address text,
  city text,
  province text,
  postal_code text,
  phone text,
  email text,
  website text,
  npwp text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Notification Settings Table
create table if not exists notification_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  po_alert boolean default true,
  low_stock_alert boolean default true,
  payment_reminder boolean default true,
  supplier_update boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tabel draft purchase request
create table if not exists purchase_request_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  name text,
  department text,
  type text, -- 'Barang' atau 'Jasa'
  items jsonb,
  notes text,
  location text,
  required_by date,
  status text, -- 'Baru', 'Perlu Persetujuan', 'Ditolak'
  total_item int,
  est_cost numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
); 