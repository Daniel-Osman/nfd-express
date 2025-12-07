"use server"

import { createClient } from "@/lib/supabase/server"
import type { PublicTrackingInfo, ShipmentDetails, ShipmentStatus } from "@/lib/types/database"

// Public tracking - no auth required
export async function getPublicTracking(trackingNumber: string): Promise<PublicTrackingInfo | null> {
  const supabase = await createClient()

  const { data: shipment, error } = await supabase
    .from("shipments")
    .select("tracking_number, status")
    .eq("tracking_number", trackingNumber)
    .single()

  if (error || !shipment) {
    return null
  }

  // Get latest event
  const { data: latestEvent } = await supabase
    .from("shipment_events")
    .select("status, location")
    .eq("shipment_id", shipment.tracking_number)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single()

  return {
    tracking_number: shipment.tracking_number,
    status: shipment.status as ShipmentStatus,
    last_event: latestEvent?.status || null,
    last_location: latestEvent?.location || null,
  }
}

// Protected shipment details - tier-restricted
export async function getShipmentDetails(shipmentId: string): Promise<ShipmentDetails | null> {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  // Get user profile for tier check
  const { data: profile } = await supabase.from("profiles").select("subscription_tier").eq("id", user.id).single()

  if (!profile) return null

  // Get shipment
  const { data: shipment, error } = await supabase.from("shipments").select("*").eq("id", shipmentId).single()

  if (error || !shipment) return null

  // Get events
  const { data: events } = await supabase
    .from("shipment_events")
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("timestamp", { ascending: false })

  const tier = profile.subscription_tier

  // Apply tier restrictions
  return {
    ...shipment,
    // Hide photo for free tier
    arrival_photo_url: tier === "free" ? null : shipment.arrival_photo_url,
    // Hide verification for free and bronze
    verification_status: tier === "free" || tier === "bronze" ? false : shipment.verification_status,
    admin_notes: tier === "free" || tier === "bronze" ? null : shipment.admin_notes,
    events: events || [],
    photo_accessible: tier !== "free",
    verification_accessible: tier === "silver" || tier === "gold",
    consolidation_accessible: tier === "gold",
  }
}

// Get all shipments for current user
export async function getUserShipments() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*, shipment_events(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return shipments || []
}
