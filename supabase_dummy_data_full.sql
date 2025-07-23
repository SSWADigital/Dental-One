-- SUPPLIERS
insert into suppliers (name, logo, rating, is_preferred, estimated_delivery, quality_score, contact_person, contact_email, contact_phone, address)
values
  ('Cobra Dental Indonesia', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', 4.9, true, '2-3 days', '98/100', 'Andi Wijaya', 'andi@cobra.co.id', '+62 812-3456-7890', 'Jl. Sudirman No. 10, Jakarta'),
  ('DentaMed Supplies', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', 4.7, false, '3-5 days', '95/100', 'Maria Sari', 'maria@dentamed.com', '+62 812-9876-5432', 'Jl. Thamrin No. 20, Jakarta'),
  ('MediSupply Co.', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', 4.5, false, '4-6 days', '92/100', 'Budi Santoso', 'budi@medisupply.com', '+62 813-1234-5678', 'Jl. Gatot Subroto No. 30, Jakarta')
ON CONFLICT (name) DO NOTHING;

-- PRODUCTS
insert into products (name, sku, supplier_id, price, rating, review_count, image, stock, stock_status, category, description, is_recommended, is_custom, date_added, status, tags, delivery_time)
values
  ('Premium Dental Brush', 'DB-1001', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 12.50, 4.8, 124, 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', 3, 'low-stock', 'Brushes', 'Premium dental brush designed for professional dental cleaning procedures. Features soft bristles that are gentle on teeth and gums.', true, false, '2024-06-16', 'Active', ARRAY['dental', 'brush'], '2 days'),
  ('Latex Gloves (Box)', 'LG-3045', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 15.00, 4.5, 98, 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', 5, 'in-stock', 'Gloves', 'High-quality latex gloves for medical and dental procedures. Powder-free and comfortable fit.', true, false, '2024-06-16', 'Active', ARRAY['latex', 'gloves'], '1 day'),
  ('Charmflex Regular', 'CR-2034', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 8.75, 4.2, 56, 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', 2, 'low-stock', 'Restorative', 'Flexible dental material for various restorative procedures.', true, false, '2024-06-16', 'Active', ARRAY['restorative', 'material'], '3 days'),
  ('Dental Impression Material', 'DI-5023', (select id from suppliers where name = 'DentaMed Supplies' limit 1), 45.00, 4.7, 87, 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop', 8, 'in-stock', 'Instruments', 'High-precision dental impression material for accurate dental molds.', true, false, '2024-06-16', 'Active', ARRAY['impression', 'material'], '4 days')
ON CONFLICT (sku) DO NOTHING;

-- CUSTOM PRODUCTS
insert into custom_products (name, sku, no_akl, category, price, supplier_id, image_url, is_urgent_need, date_added)
values
  ('Dental Mirror', 'DM-2023-001', 'AKL 92383', 'Dental Instruments', 12.50, (select id from suppliers where name = 'Cahaya Asia' limit 1), null, false, '2024-06-16'),
  ('Dental Forceps', 'DF-2023-002', 'AKL 393049', 'Dental Instruments', 45.00, (select id from suppliers where name = 'Nazi Great' limit 1), null, false, '2024-06-16'),
  ('Dental Explorer', 'DE-2023-003', 'AKL 303940', 'Dental Instruments', 18.75, (select id from suppliers where name = 'Anama key' limit 1), null, false, '2024-06-16'),
  ('Gum Massager', 'GM-2024-001', 'AKL 112233', 'Dental Instruments', 22.00, (select id from suppliers where name = 'Cahaya Asia' limit 1), null, false, '2024-06-16'),
  ('Bleaching Whitener', 'BW-2024-002', 'AKL 445566', 'Restorative', 65.00, (select id from suppliers where name = 'Nazi Great' limit 1), null, false, '2024-06-16'),
  ('Instrument Cleaner', 'IC-2024-003', 'AKL 778899', 'Infection Control', 30.00, (select id from suppliers where name = 'Anama key' limit 1), null, false, '2024-06-16'),
  ('Oral Mouthwash (Large)', 'OM-2024-004', 'AKL 101112', 'Disposables', 10.00, (select id from suppliers where name = 'Cahaya Asia' limit 1), null, false, '2024-06-16'),
  ('Luxury Dental Chair', 'LUX-2024-005', 'N/A', 'Furniture', 1500.00, (select id from suppliers where name = 'Modern Furnishings' limit 1), null, false, '2024-06-16'),
  ('Adapter Cable USB-C', 'ADAPT-2024-006', 'N/A', 'IT & Peripherals', 15.00, (select id from suppliers where name = 'Tech Supply' limit 1), null, false, '2024-06-16')
ON CONFLICT (sku) DO NOTHING;

-- INVENTORY
insert into inventory (product_id, location, par_level, current_stock, usage, status, forecast)
values
  ((select id from products where sku = 'DB-1001' limit 1), 'Main Clinic', '15-25', 3, 8, 'Low', 'Order Soon'),
  ((select id from products where sku = 'LG-3045' limit 1), 'Main Clinic', '20-30', 5, 12, 'Low', 'Order Now'),
  ((select id from products where sku = 'CR-2034' limit 1), 'Main Clinic', '10-20', 2, 5, 'Optimal', 'Stable'),
  ((select id from products where sku = 'DI-5023' limit 1), 'Branch A', '5-15', 4, 3, 'Low', 'Order Soon')
ON CONFLICT DO NOTHING;

-- PURCHASE REQUESTS
insert into purchase_requests (submitted_by, date, department, required_by, items, total_cost, status)
values
  (null, '2024-06-01', 'Dental Surgery', '2024-06-10', 2, 256.25, 'pending'),
  (null, '2024-06-02', 'Pediatric Dentistry', '2024-06-12', 1, 131.25, 'approved')
ON CONFLICT DO NOTHING;

-- PURCHASE REQUEST ITEMS
insert into purchase_request_items (purchase_request_id, product_id, name, sku, supplier_id, quantity, unit_price, total, status, comment)
values
  ((select id from purchase_requests limit 1), (select id from products where sku = 'DB-1001' limit 1), 'Premium Dental Brush', 'DB-1001', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 10, 12.50, 125.00, 'pending', null),
  ((select id from purchase_requests limit 1), (select id from products where sku = 'CR-2034' limit 1), 'Charmflex Regular', 'CR-2034', (select id from suppliers where name = 'Cobra Dental Indonesia' limit 1), 15, 8.75, 131.25, 'pending', null)
ON CONFLICT DO NOTHING;

-- PURCHASE ORDERS
insert into purchase_orders (clinic, clinic_code, order_date, items, total_value, status, shipping_address, contact_person, contact_email, contact_phone)
values
  ('Bright Smile', 'BS-001', '2024-06-03', 2, 256.25, 'New', 'Jl. Sudirman No. 10, Jakarta', 'Andi Wijaya', 'andi@cobra.co.id', '+62 812-3456-7890')
ON CONFLICT DO NOTHING;

-- ORDER ITEMS
insert into order_items (order_id, product_id, name, sku, quantity, unit_price, total_price, status)
values
  ((select id from purchase_orders limit 1), (select id from products where sku = 'DB-1001' limit 1), 'Premium Dental Brush', 'DB-1001', 10, 12.50, 125.00, 'ordered'),
  ((select id from purchase_orders limit 1), (select id from products where sku = 'CR-2034' limit 1), 'Charmflex Regular', 'CR-2034', 15, 8.75, 131.25, 'ordered')
ON CONFLICT DO NOTHING;

-- SHIPMENTS
insert into shipments (order_id, carrier, tracking_number, shipping_date, estimated_delivery, shipment_type, additional_notes)
values
  ((select id from purchase_orders limit 1), 'JNE', 'JNE123456', '2024-06-04', '2024-06-07', 'Full Shipment', 'Handle with care.')
ON CONFLICT DO NOTHING;

-- Dummy user_settings (replace <USER_UUID_1> and <USER_UUID_2> with real UUIDs)
insert into user_settings (user_id, currency, language, notification_email, notification_push, theme)
values
  ('<USER_UUID_1>', 'USD', 'en', true, true, 'light'),
  ('<USER_UUID_2>', 'IDR', 'id', false, true, 'dark')
ON CONFLICT (user_id) DO NOTHING; 