-- Add email column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Update existing profiles with emails from auth.users
UPDATE profiles
SET email = auth.users.email
FROM auth.users
WHERE profiles.id = auth.users.id
AND profiles.email IS NULL;

-- Update the trigger function to include email on profile creation
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

  INSERT INTO public.profiles (id, email, full_name, mailbox_id, tier, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    new_mailbox_id,
    'free',
    false
  );
  RETURN NEW;
END;
$$;
