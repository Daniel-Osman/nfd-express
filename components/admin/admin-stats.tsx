"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, TrendingUp, DollarSign, Loader2 } from "lucide-react"
import { getAllShipments, getAllUsers } from "@/lib/actions/admin"
import type { SubscriptionTier } from "@/lib/types/database"

export function AdminStats() {
  const [stats, setStats] = useState({
    totalShipments: 0,
    totalUsers: 0,
    pendingShipments: 0,
    deliveredShipments: 0,
    monthlyRevenue: 0,
    tierBreakdown: { free: 0, bronze: 0, silver: 0, gold: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [shipments, users] = await Promise.all([getAllShipments(), getAllUsers()])

      const tierPrices = { free: 0, bronze: 5, silver: 10, gold: 15 }
      const tierBreakdown = { free: 0, bronze: 0, silver: 0, gold: 0 }

      users.forEach((u) => {
        tierBreakdown[u.subscription_tier as SubscriptionTier]++
      })

      const monthlyRevenue = Object.entries(tierBreakdown).reduce(
        (sum, [tier, count]) => sum + tierPrices[tier as SubscriptionTier] * count,
        0,
      )

      setStats({
        totalShipments: shipments.length,
        totalUsers: users.length,
        pendingShipments: shipments.filter((s) => s.status === "pending" || s.status === "received_uae").length,
        deliveredShipments: shipments.filter((s) => s.status === "delivered").length,
        monthlyRevenue,
        tierBreakdown,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--accent-main)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-muted)]">إجمالي الشحنات</CardTitle>
            <Package className="h-4 w-4 text-[var(--accent-main)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.totalShipments}</div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-muted)]">المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-muted)]">قيد الانتظار</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.pendingShipments}</div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-muted)]">الإيرادات الشهرية</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">${stats.monthlyRevenue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Breakdown */}
      <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">توزيع الاشتراكات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-4 gap-4">
            {Object.entries(stats.tierBreakdown).map(([tier, count]) => (
              <div key={tier} className="p-4 rounded-lg bg-[var(--bg-primary)] text-center">
                <p className="text-2xl font-bold text-[var(--text-primary)]">{count}</p>
                <p className="text-sm text-[var(--text-muted)] capitalize">{tier}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
