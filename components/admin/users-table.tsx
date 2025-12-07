"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Crown, Loader2 } from "lucide-react"
import { getAllUsers, updateUserTier } from "@/lib/actions/admin"
import type { SubscriptionTier, Profile } from "@/lib/types/database"

const tierColors: Record<SubscriptionTier, string> = {
  free: "bg-gray-500/10 text-gray-500",
  bronze: "bg-amber-600/10 text-amber-600",
  silver: "bg-slate-400/10 text-slate-400",
  gold: "bg-yellow-500/10 text-yellow-500",
}

const tierPrices: Record<SubscriptionTier, string> = {
  free: "$0",
  bronze: "$5",
  silver: "$10",
  gold: "$15",
}

export function UsersTable() {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTierChange = async (userId: string, tier: SubscriptionTier) => {
    setUpdatingId(userId)
    try {
      await updateUserTier(userId, tier)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, subscription_tier: tier } : u)))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
      <CardHeader>
        <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
          <Users className="h-5 w-5" />
          إدارة المستخدمين
        </CardTitle>
        <CardDescription className="text-[var(--text-muted)]">تعديل اشتراكات المستخدمين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--border-color)] bg-[var(--bg-primary)]">
                <TableHead className="text-[var(--text-muted)]">المستخدم</TableHead>
                <TableHead className="text-[var(--text-muted)]">صندوق البريد</TableHead>
                <TableHead className="text-[var(--text-muted)]">الهاتف</TableHead>
                <TableHead className="text-[var(--text-muted)]">الاشتراك</TableHead>
                <TableHead className="text-[var(--text-muted)]">تعديل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-[var(--accent-main)]" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-[var(--text-muted)]">
                    لا يوجد مستخدمين
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="border-[var(--border-color)]">
                    <TableCell>
                      <div>
                        <p className="text-[var(--text-primary)] font-medium">{user.full_name || "—"}</p>
                        {user.is_admin && <Badge className="bg-red-500/10 text-red-500 text-xs mt-1">Admin</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-[var(--text-secondary)] font-mono">
                      {user.uae_mailbox_id || "—"}
                    </TableCell>
                    <TableCell className="text-[var(--text-secondary)]">{user.phone_number || "—"}</TableCell>
                    <TableCell>
                      <Badge className={tierColors[user.subscription_tier]}>
                        <Crown className="h-3 w-3 mr-1" />
                        {user.subscription_tier} ({tierPrices[user.subscription_tier]}/mo)
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.subscription_tier}
                        onValueChange={(v) => handleTierChange(user.id, v as SubscriptionTier)}
                        disabled={updatingId === user.id}
                      >
                        <SelectTrigger className="w-32 bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
