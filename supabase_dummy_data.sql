-- Roles
insert into roles (id, name, description) values
  (gen_random_uuid(), 'staff', 'Basic access to system features'),
  (gen_random_uuid(), 'manager', 'Extended access with approval rights'),
  (gen_random_uuid(), 'supplier', 'External access to supplier portal'),
  (gen_random_uuid(), 'superadmin', 'Full system access and configuration');

-- Suppliers
insert into suppliers (id, name, contact_person, contact_email, contact_phone, address) values
  (gen_random_uuid(), 'Cobra Dental Indonesia', 'Andi Wijaya', 'andi@cobra.co.id', '+62 812-3456-7890', 'Jl. Sudirman No. 10, Jakarta'),
  (gen_random_uuid(), 'DentaMed Supplies', 'Maria Sari', 'maria@dentamed.com', '+62 812-9876-5432', 'Jl. Thamrin No. 20, Jakarta'),
  (gen_random_uuid(), 'MediSupply Co.', 'Budi Santoso', 'budi@medisupply.com', '+62 813-1234-5678', 'Jl. Gatot Subroto No. 30, Jakarta');

-- Products
insert into products (id, name, sku, category, tags, price, stock, stock_status, delivery_time, status, image, supplier_id, description) values
  (gen_random_uuid(), 'Premium Dental Brush', 'DB-1001', 'Brushes', ARRAY['dental', 'brush'], 12.50, 3, 'low-stock', '2 days', 'Active', 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 'Premium dental brush for professional cleaning.'),
  (gen_random_uuid(), 'Latex Gloves (Box)', 'LG-3045', 'Gloves', ARRAY['latex', 'gloves'], 15.00, 5, 'in-stock', '1 day', 'Active', 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 'High-quality latex gloves.'),
  (gen_random_uuid(), 'Charmflex Regular', 'CR-2034', 'Restorative', ARRAY['restorative', 'material'], 8.75, 2, 'low-stock', '3 days', 'Active', 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg', (select id from suppliers where name = 'DentaMed Supplies' limit 1), 'Restorative dental material.');

-- Custom Products
insert into custom_products (id, name, sku, no_akl, category, price, supplier_id, image_url, is_urgent_need) values
  (gen_random_uuid(), 'Custom Dental Mirror', 'CDM-2001', 'AKL123456', 'Instruments', 25.00, (select id from suppliers where name = 'MediSupply Co.' limit 1), 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg', false),
  (gen_random_uuid(), 'Urgent Suction Tube', 'UST-3002', 'AKL654321', 'Equipment', 40.00, (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg', true);

-- Purchase Requests
insert into purchase_requests (id, submitted_by, date, department, required_by, items, total_cost, status) values
  (gen_random_uuid(), null, '2024-06-01', 'Dental Surgery', '2024-06-10', 2, 256.25, 'pending'),
  (gen_random_uuid(), null, '2024-06-02', 'Pediatric Dentistry', '2024-06-12', 1, 131.25, 'approved');

-- Purchase Request Items
insert into purchase_request_items (id, purchase_request_id, product_id, name, sku, supplier_id, quantity, unit_price, total, status, comment) values
  (gen_random_uuid(), (select id from purchase_requests limit 1), (select id from products where sku = 'DB-1001' limit 1), 'Premium Dental Brush', 'DB-1001', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 10, 12.50, 125.00, 'pending', null),
  (gen_random_uuid(), (select id from purchase_requests limit 1), (select id from products where sku = 'CR-2034' limit 1), 'Charmflex Regular', 'CR-2034', (select id from suppliers where name = 'DentaMed Supplies' limit 1), 15, 8.75, 131.25, 'pending', null);

-- Purchase Orders
insert into purchase_orders (id, clinic, clinic_code, order_date, items, total_value, status, shipping_address, contact_person, contact_email, contact_phone) values
  (gen_random_uuid(), 'Bright Smile', 'BS-001', '2024-06-03', 2, 256.25, 'New', 'Jl. Sudirman No. 10, Jakarta', 'Andi Wijaya', 'andi@cobra.co.id', '+62 812-3456-7890');

-- Order Items
insert into order_items (id, order_id, product_id, name, sku, quantity, unit_price, total_price, status) values
  (gen_random_uuid(), (select id from purchase_orders limit 1), (select id from products where sku = 'DB-1001' limit 1), 'Premium Dental Brush', 'DB-1001', 10, 12.50, 125.00, 'ordered'),
  (gen_random_uuid(), (select id from purchase_orders limit 1), (select id from products where sku = 'CR-2034' limit 1), 'Charmflex Regular', 'CR-2034', 15, 8.75, 131.25, 'ordered');

-- Shipments
insert into shipments (id, order_id, carrier, tracking_number, shipping_date, estimated_delivery, shipment_type, additional_notes) values
  (gen_random_uuid(), (select id from purchase_orders limit 1), 'JNE', 'JNE123456', '2024-06-04', '2024-06-07', 'Full Shipment', 'Handle with care.');

-- Inventory
insert into inventory (id, product_id, location, par_level, current_stock, usage, status, forecast) values
  (gen_random_uuid(), (select id from products where sku = 'DB-1001' limit 1), 'Main Clinic', '15-25', 3, 8, 'Low', 'Order Soon'),
  (gen_random_uuid(), (select id from products where sku = 'LG-3045' limit 1), 'Main Clinic', '20-30', 5, 12, 'Low', 'Order Now'),
  (gen_random_uuid(), (select id from products where sku = 'CR-2034' limit 1), 'Main Clinic', '10-20', 2, 5, 'Optimal', 'Stable'); 