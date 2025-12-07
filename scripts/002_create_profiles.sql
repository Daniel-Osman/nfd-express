-- Create profiles table (Public User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  subscription_tier subscription_tier DEFAULT 'free' NOT NULL,
  uae_mailbox_id TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Users can read their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but not subscription_tier or is_admin)
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_select" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can update all profiles (including subscription_tier)
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Create function to auto-generate mailbox ID
CREATE OR REPLACE FUNCTION generate_mailbox_id()
RETURNS TRIGGER AS $$
DECLARE
  new_id TEXT;
  max_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(uae_mailbox_id FROM 5) AS INTEGER)), 1000)
  INTO max_num
  FROM public.profiles
  WHERE uae_mailbox_id IS NOT NULL;
  
  new_id := 'NFD-' || (max_num + 1)::TEXT;
  NEW.uae_mailbox_id := new_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto mailbox ID
CREATE TRIGGER set_mailbox_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  WHEN (NEW.uae_mailbox_id IS NULL)
  EXECUTE FUNCTION generate_mailbox_id();
