-- Add missing fields to products table
alter table products add column if not exists rating numeric;
alter table products add column if not exists review_count integer;
alter table products add column if not exists is_recommended boolean;
alter table products add column if not exists is_custom boolean;
alter table products add column if not exists date_added date;
alter table products add column if not exists stock_status text;

-- Add missing fields to custom_products table
alter table custom_products add column if not exists image_url text;
alter table custom_products add column if not exists is_urgent_need boolean;
alter table custom_products add column if not exists date_added date;

-- Add missing fields to suppliers table
alter table suppliers add column if not exists logo text;
alter table suppliers add column if not exists rating numeric;
alter table suppliers add column if not exists quality_score text;
alter table suppliers add column if not exists is_preferred boolean;
alter table suppliers add column if not exists estimated_delivery text; 