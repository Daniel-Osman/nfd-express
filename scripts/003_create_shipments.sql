-- Create shipments table (The Core Unit)
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status shipment_status DEFAULT 'pending' NOT NULL,
  weight_kg REAL,
  dimensions TEXT,
  arrival_photo_url TEXT,
  verification_status BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  is_consolidated BOOLEAN DEFAULT FALSE,
  parent_shipment_id UUID REFERENCES public.shipments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_shipments_user_id ON public.shipments(user_id);
CREATE INDEX idx_shipments_tracking ON public.shipments(tracking_number);
CREATE INDEX idx_shipments_status ON public.shipments(status);

-- Enable RLS
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shipments
-- Users can only see their own shipments
CREATE POLICY "shipments_select_own" ON public.shipments
  FOR SELECT USING (user_id = auth.uid());

-- Admins can see all shipments
CREATE POLICY "shipments_admin_select" ON public.shipments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can insert shipments
CREATE POLICY "shipments_admin_insert" ON public.shipments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can update shipments
CREATE POLICY "shipments_admin_update" ON public.shipments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can delete shipments
CREATE POLICY "shipments_admin_delete" ON public.shipments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
