-- Create custom enum types for NFD Express

-- Subscription tiers enum
CREATE TYPE subscription_tier AS ENUM ('free', 'bronze', 'silver', 'gold');

-- Shipment status enum
CREATE TYPE shipment_status AS ENUM (
  'pending',
  'received_uae',
  'consolidating',
  'shipped',
  'arrived_leb',
  'delivered'
);
