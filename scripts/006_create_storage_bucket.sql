-- Create storage bucket for shipment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('shipment-proofs', 'shipment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage: Only admins can upload
CREATE POLICY "shipment_proofs_admin_insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'shipment-proofs' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  )
);

-- Users can view proofs if they own the shipment and have paid tier
CREATE POLICY "shipment_proofs_select"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'shipment-proofs' AND
  (
    -- Admins can see all
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
    OR
    -- Users with paid tier can see their shipment proofs
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN public.shipments s ON s.user_id = p.id
      WHERE p.id = auth.uid()
        AND p.subscription_tier != 'free'
        AND s.arrival_photo_url LIKE '%' || name || '%'
    )
  )
);
