// TypeScript interfaces for all database tables

export type SubscriptionTier = "free" | "bronze" | "silver" | "gold"

export type ShipmentStatus = "pending" | "received_uae" | "consolidating" | "shipped" | "arrived_leb" | "delivered"

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone_number: string | null
  subscription_tier: SubscriptionTier
  uae_mailbox_id: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Shipment {
  id: string
  tracking_number: string
  user_id: string
  status: ShipmentStatus
  weight_kg: number | null
  dimensions: string | null
  arrival_photo_url: string | null
  verification_status: boolean
  admin_notes: string | null
  is_consolidated: boolean
  parent_shipment_id: string | null
  created_at: string
  updated_at: string
}

export interface ShipmentEvent {
  id: string
  shipment_id: string
  status: string
  location: string | null
  timestamp: string
}

// Extended types with relations
export interface ShipmentWithEvents extends Shipment {
  shipment_events: ShipmentEvent[]
}

export interface ShipmentWithUser extends Shipment {
  profiles: Profile
}

// Form types
export interface CreateShipmentInput {
  tracking_number: string
  user_id: string
  weight_kg?: number
  dimensions?: string
}

export interface UpdateShipmentInput {
  status?: ShipmentStatus
  weight_kg?: number
  dimensions?: string
  arrival_photo_url?: string
  verification_status?: boolean
  admin_notes?: string
  is_consolidated?: boolean
  parent_shipment_id?: string
}

// Public tracking response (for non-authenticated users)
export interface PublicTrackingInfo {
  tracking_number: string
  status: ShipmentStatus
  last_event: string | null
  last_location: string | null
}

// Tier-restricted shipment details
export interface ShipmentDetails extends Shipment {
  events: ShipmentEvent[]
  // These fields are conditionally included based on tier
  photo_accessible: boolean
  verification_accessible: boolean
  consolidation_accessible: boolean
}
