"use server"

import { createClient } from "@/lib/supabase/server"
import type { Profile } from "@/lib/types/database"

// Get current user profile
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return profile
}

// Update user profile
export async function updateProfile(updates: { full_name?: string; phone_number?: string }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", user.id)

  if (error) throw error
}

// Sign out
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
