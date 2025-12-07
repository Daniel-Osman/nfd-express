-- Create shipment_events table (Tracking History)
CREATE TABLE IF NOT EXISTS public.shipment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_shipment_events_shipment_id ON public.shipment_events(shipment_id);

-- Enable RLS
ALTER TABLE public.shipment_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shipment_events
-- Users can see events for their own shipments
CREATE POLICY "shipment_events_select_own" ON public.shipment_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shipments
      WHERE id = shipment_id AND user_id = auth.uid()
    )
  );

-- Admins can see all events
CREATE POLICY "shipment_events_admin_select" ON public.shipment_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can insert events
CREATE POLICY "shipment_events_admin_insert" ON public.shipment_events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
