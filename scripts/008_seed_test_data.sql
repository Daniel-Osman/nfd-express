-- =====================================================
-- NFD EXPRESS - TEST DATA SEED SCRIPT
-- =====================================================
-- Run this AFTER creating test users in Supabase Auth
-- 
-- IMPORTANT: First create these users in Supabase Auth Dashboard:
-- 1. Admin: admin@nfd-express.com / password: Admin123!
-- 2. User:  user@nfd-express.com  / password: User123!
--
-- This script is IDEMPOTENT - safe to run multiple times
-- =====================================================

DO $$
DECLARE
    admin_uuid UUID;
    user_uuid UUID;
    shipment1_id UUID;
    shipment2_id UUID;
    shipment3_id UUID;
    shipment4_id UUID;
    shipment5_id UUID;
BEGIN
    -- Get actual user IDs from auth.users
    SELECT id INTO admin_uuid FROM auth.users WHERE email = 'admin@nfd-express.com' LIMIT 1;
    SELECT id INTO user_uuid FROM auth.users WHERE email = 'user@nfd-express.com' LIMIT 1;
    
    -- Exit if users don't exist
    IF admin_uuid IS NULL OR user_uuid IS NULL THEN
        RAISE EXCEPTION 'Please create test users in Supabase Auth first!';
    END IF;

    -- Delete existing test data first to prevent duplicate key errors
    -- Delete shipment events for user's shipments
    DELETE FROM shipment_events WHERE shipment_id IN (
        SELECT id FROM shipments WHERE user_id = user_uuid
    );
    
    -- Delete user's shipments
    DELETE FROM shipments WHERE user_id = user_uuid;

    -- =====================================================
    -- UPDATE PROFILES
    -- =====================================================
    
    -- Set admin profile
    UPDATE profiles SET
        email = 'admin@nfd-express.com',
        full_name = 'NFD Admin',
        phone = '+961 71 123 456',
        address_line1 = 'NFD Express HQ',
        address_line2 = 'Beirut Central District',
        city = 'Beirut',
        role = 'admin',
        subscription_tier = 'gold'
    WHERE id = admin_uuid;
    
    -- Set user profile
    UPDATE profiles SET
        email = 'user@nfd-express.com',
        full_name = 'Ahmad Khoury',
        phone = '+961 70 987 654',
        address_line1 = 'Hamra Street, Building 42',
        address_line2 = 'Floor 3, Apt 5',
        city = 'Beirut',
        role = 'user',
        subscription_tier = 'silver'
    WHERE id = user_uuid;

    -- =====================================================
    -- CREATE SHIPMENTS FOR TEST USER
    -- =====================================================
    
    -- Shipment 1: Delivered (from Amazon)
    shipment1_id := gen_random_uuid();
    INSERT INTO shipments (id, user_id, tracking_number, carrier, description, weight_kg, status, warehouse_location, cost_usd, created_at)
    VALUES (
        shipment1_id,
        user_uuid,
        'TBA123456789',
        'Amazon',
        'iPhone 15 Pro Case + Screen Protector',
        0.3,
        'delivered',
        'Shelf A-12',
        4.50,
        NOW() - INTERVAL '10 days'
    );
    
    -- Events for Shipment 1
    INSERT INTO shipment_events (shipment_id, status, location, notes, created_at) VALUES
    (shipment1_id, 'pending', 'Amazon Warehouse, USA', 'Order placed', NOW() - INTERVAL '10 days'),
    (shipment1_id, 'received_us', 'NFD US Warehouse', 'Package received at US facility', NOW() - INTERVAL '8 days'),
    (shipment1_id, 'in_transit', 'In Transit', 'Shipped to Lebanon', NOW() - INTERVAL '5 days'),
    (shipment1_id, 'customs', 'Beirut Airport', 'Customs clearance in progress', NOW() - INTERVAL '2 days'),
    (shipment1_id, 'out_for_delivery', 'Beirut', 'Out for delivery', NOW() - INTERVAL '1 day'),
    (shipment1_id, 'delivered', 'Beirut', 'Delivered successfully', NOW());

    -- Shipment 2: In Transit (from AliExpress)
    shipment2_id := gen_random_uuid();
    INSERT INTO shipments (id, user_id, tracking_number, carrier, description, weight_kg, status, warehouse_location, cost_usd, created_at)
    VALUES (
        shipment2_id,
        user_uuid,
        'LP00123456789CN',
        'AliExpress',
        'Wireless Earbuds + Charging Case',
        0.15,
        'in_transit',
        'Shelf B-05',
        2.25,
        NOW() - INTERVAL '5 days'
    );
    
    -- Events for Shipment 2
    INSERT INTO shipment_events (shipment_id, status, location, notes, created_at) VALUES
    (shipment2_id, 'pending', 'AliExpress Seller', 'Order confirmed', NOW() - INTERVAL '5 days'),
    (shipment2_id, 'received_us', 'NFD US Warehouse', 'Package received', NOW() - INTERVAL '3 days'),
    (shipment2_id, 'in_transit', 'In Transit', 'Currently in transit to Lebanon', NOW() - INTERVAL '1 day');

    -- Shipment 3: At Customs (from Shein)
    shipment3_id := gen_random_uuid();
    INSERT INTO shipments (id, user_id, tracking_number, carrier, description, weight_kg, status, warehouse_location, admin_notes, cost_usd, created_at)
    VALUES (
        shipment3_id,
        user_uuid,
        'SH2024789456',
        'Shein',
        'Summer Dress Collection (3 items)',
        0.8,
        'customs',
        'Shelf C-22',
        'Clothing items - standard customs',
        12.00,
        NOW() - INTERVAL '7 days'
    );
    
    -- Events for Shipment 3
    INSERT INTO shipment_events (shipment_id, status, location, notes, created_at) VALUES
    (shipment3_id, 'pending', 'Shein Warehouse', 'Order shipped', NOW() - INTERVAL '7 days'),
    (shipment3_id, 'received_us', 'NFD US Warehouse', 'Package received and verified', NOW() - INTERVAL '5 days'),
    (shipment3_id, 'in_transit', 'In Transit', 'Departed for Lebanon', NOW() - INTERVAL '3 days'),
    (shipment3_id, 'customs', 'Beirut Airport', 'Awaiting customs clearance', NOW() - INTERVAL '1 day');

    -- Shipment 4: Received at US Warehouse (from Temu)
    shipment4_id := gen_random_uuid();
    INSERT INTO shipments (id, user_id, tracking_number, carrier, description, weight_kg, status, warehouse_location, cost_usd, created_at)
    VALUES (
        shipment4_id,
        user_uuid,
        'TM98765432100',
        'Temu',
        'Kitchen Gadgets Set + Storage Containers',
        1.2,
        'received_us',
        'Shelf D-08',
        18.00,
        NOW() - INTERVAL '2 days'
    );
    
    -- Events for Shipment 4
    INSERT INTO shipment_events (shipment_id, status, location, notes, created_at) VALUES
    (shipment4_id, 'pending', 'Temu Fulfillment', 'Order dispatched', NOW() - INTERVAL '2 days'),
    (shipment4_id, 'received_us', 'NFD US Warehouse', 'Package received, awaiting next shipment batch', NOW());

    -- Shipment 5: Pending (from Amazon - just ordered)
    shipment5_id := gen_random_uuid();
    INSERT INTO shipments (id, user_id, tracking_number, carrier, description, weight_kg, status, cost_usd, created_at)
    VALUES (
        shipment5_id,
        user_uuid,
        'TBA987654321',
        'Amazon',
        'Kindle Paperwhite + Leather Cover',
        0.4,
        'pending',
        6.00,
        NOW()
    );
    
    -- Events for Shipment 5
    INSERT INTO shipment_events (shipment_id, status, location, notes, created_at) VALUES
    (shipment5_id, 'pending', 'Amazon', 'Awaiting shipment to NFD warehouse', NOW());

    RAISE NOTICE 'Test data seeded successfully!';
    RAISE NOTICE 'Admin UUID: %', admin_uuid;
    RAISE NOTICE 'User UUID: %', user_uuid;
END $$;
