"use server"

import { createClient } from "@/lib/supabase/server"
import type { CreateShipmentInput, ShipmentStatus, SubscriptionTier, Profile, Shipment } from "@/lib/types/database"
import { revalidatePath } from "next/cache"

// Helper to check admin status
async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) throw new Error("Not authorized")

  return { supabase, user }
}

// Get all shipments (admin only)
export async function getAllShipments(): Promise<Shipment[]> {
  const { supabase } = await requireAdmin()

  const { data, error } = await supabase
    .from("shipments")
    .select("*, profiles(full_name, phone_number, uae_mailbox_id)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Get shipment by tracking number (admin scanner)
export async function getShipmentByTracking(trackingNumber: string) {
  const { supabase } = await requireAdmin()

  const { data, error } = await supabase
    .from("shipments")
    .select("*, profiles(full_name, phone_number, uae_mailbox_id, subscription_tier)")
    .eq("tracking_number", trackingNumber)
    .single()

  if (error) return null
  return data
}

// Create new shipment
export async function createShipment(input: CreateShipmentInput) {
  const { supabase } = await requireAdmin()

  const { data, error } = await supabase
    .from("shipments")
    .insert({
      tracking_number: input.tracking_number,
      user_id: input.user_id,
      weight_kg: input.weight_kg,
      dimensions: input.dimensions,
      status: "pending",
    })
    .select()
    .single()

  if (error) throw error

  // Add initial event
  await supabase.from("shipment_events").insert({
    shipment_id: data.id,
    status: "Shipment Created",
    location: "System",
  })

  revalidatePath("/admin/dashboard")
  return data
}

// Update shipment status
export async function updateShipmentStatus(shipmentId: string, newStatus: ShipmentStatus, location?: string) {
  const { supabase } = await requireAdmin()

  const statusMessages: Record<ShipmentStatus, string> = {
    pending: "Shipment Pending",
    received_uae: "Received at UAE Warehouse",
    consolidating: "Consolidation in Progress",
    shipped: "Shipped to Lebanon",
    arrived_leb: "Arrived in Lebanon",
    delivered: "Delivered to Customer",
  }

  // Update shipment
  const { error: updateError } = await supabase
    .from("shipments")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", shipmentId)

  if (updateError) throw updateError

  // Add event
  await supabase.from("shipment_events").insert({
    shipment_id: shipmentId,
    status: statusMessages[newStatus],
    location: location || "NFD Express",
  })

  revalidatePath("/admin/dashboard")
}

// Upload proof photo
export async function uploadProofPhoto(shipmentId: string, file: File) {
  const { supabase } = await requireAdmin()

  const fileExt = file.name.split(".").pop()
  const fileName = `${shipmentId}-${Date.now()}.${fileExt}`

  // Upload to storage
  const { error: uploadError } = await supabase.storage.from("shipment-proofs").upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("shipment-proofs").getPublicUrl(fileName)

  // Update shipment
  await supabase
    .from("shipments")
    .update({
      arrival_photo_url: publicUrl,
      status: "received_uae",
      updated_at: new Date().toISOString(),
    })
    .eq("id", shipmentId)

  // Add event
  await supabase.from("shipment_events").insert({
    shipment_id: shipmentId,
    status: "Proof of Arrival Uploaded",
    location: "UAE Warehouse",
  })

  revalidatePath("/admin/dashboard")
  return publicUrl
}

// Add admin notes (verification)
export async function addVerificationNotes(shipmentId: string, notes: string) {
  const { supabase } = await requireAdmin()

  await supabase
    .from("shipments")
    .update({
      admin_notes: notes,
      verification_status: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", shipmentId)

  await supabase.from("shipment_events").insert({
    shipment_id: shipmentId,
    status: "Content Verified by Admin",
    location: "UAE Warehouse",
  })

  revalidatePath("/admin/dashboard")
}

// Consolidate packages
export async function consolidatePackages(shipmentIds: string[]) {
  const { supabase } = await requireAdmin()

  // Get all shipments to consolidate
  const { data: shipments } = await supabase.from("shipments").select("*").in("id", shipmentIds)

  if (!shipments || shipments.length < 2) {
    throw new Error("Need at least 2 shipments to consolidate")
  }

  // Check all belong to same user
  const userIds = [...new Set(shipments.map((s) => s.user_id))]
  if (userIds.length > 1) {
    throw new Error("All shipments must belong to the same user")
  }

  // Calculate total weight
  const totalWeight = shipments.reduce((sum, s) => sum + (s.weight_kg || 0), 0)

  // Create master shipment
  const masterTrackingNumber = `NFD-CONS-${Date.now()}`
  const { data: masterShipment, error } = await supabase
    .from("shipments")
    .insert({
      tracking_number: masterTrackingNumber,
      user_id: userIds[0],
      status: "consolidating",
      weight_kg: totalWeight,
      is_consolidated: true,
    })
    .select()
    .single()

  if (error) throw error

  // Update child shipments
  await supabase
    .from("shipments")
    .update({
      parent_shipment_id: masterShipment.id,
      status: "consolidating",
      updated_at: new Date().toISOString(),
    })
    .in("id", shipmentIds)

  // Add event to master
  await supabase.from("shipment_events").insert({
    shipment_id: masterShipment.id,
    status: `Consolidated ${shipments.length} packages`,
    location: "UAE Warehouse",
  })

  revalidatePath("/admin/dashboard")
  return masterShipment
}

// Get all users (for admin)
export async function getAllUsers(): Promise<Profile[]> {
  const { supabase } = await requireAdmin()

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Update user subscription tier
export async function updateUserTier(userId: string, tier: SubscriptionTier) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from("profiles")
    .update({ subscription_tier: tier, updated_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) throw error

  revalidatePath("/admin/dashboard")
}

// Search shipments
export async function searchShipments(query: string) {
  const { supabase } = await requireAdmin()

  const { data } = await supabase
    .from("shipments")
    .select("*, profiles(full_name, uae_mailbox_id)")
    .or(`tracking_number.ilike.%${query}%`)
    .limit(20)

  return data || []
}

// Get user by mailbox ID
export async function getUserByMailboxId(mailboxId: string) {
  const { supabase } = await requireAdmin()

  const { data } = await supabase.from("profiles").select("*").eq("uae_mailbox_id", mailboxId).single()

  return data
}
