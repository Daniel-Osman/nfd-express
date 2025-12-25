-- Add address fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line1 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_line2 TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS city TEXT;

-- Drop redundant columns if they exist (cleanup)
-- Note: 'phone' is redundant with 'phone_number'
-- Note: 'role' is redundant with 'is_admin'
ALTER TABLE profiles DROP COLUMN IF EXISTS phone;
ALTER TABLE profiles DROP COLUMN IF EXISTS role;

-- Update the trigger function to include address fields on profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  new_mailbox_id TEXT;
BEGIN
  -- Generate unique mailbox ID (NFD-XXXXX format)
  new_mailbox_id := 'NFD-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE mailbox_id = new_mailbox_id) LOOP
    new_mailbox_id := 'NFD-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  END LOOP;

  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    phone_number,
    address_line1,
    address_line2,
    city,
    mailbox_id, 
    subscription_tier, 
    is_admin
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
    COALESCE(NEW.raw_user_meta_data->>'address_line1', ''),
    COALESCE(NEW.raw_user_meta_data->>'address_line2', ''),
    COALESCE(NEW.raw_user_meta_data->>'city', ''),
    new_mailbox_id,
    'free',
    false
  );
  RETURN NEW;
END;
$$;
