export const runtime = 'edge';

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UserDashboard } from "@/components/user/user-dashboard"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) redirect("/auth/login")

  // If admin, redirect to admin dashboard
  if (profile.is_admin) {
    redirect("/admin/dashboard")
  }

  return <UserDashboard profile={profile} />
}
