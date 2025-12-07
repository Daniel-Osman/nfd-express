"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Users, Scan, BarChart3, LogOut } from "lucide-react"
import { ScannerView } from "./scanner-view"
import { ShipmentsTable } from "./shipments-table"
import { UsersTable } from "./users-table"
import { AdminStats } from "./admin-stats"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions/user"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("scanner")
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--surface-card)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-[var(--accent-main)]" />
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">NFD Express Admin</h1>
              <p className="text-sm text-[var(--text-muted)]">لوحة التحكم</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-[var(--border-color)] text-[var(--text-primary)] bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[var(--surface-card)] border border-[var(--border-color)] p-1">
            <TabsTrigger
              value="scanner"
              className="data-[state=active]:bg-[var(--accent-main)] data-[state=active]:text-white"
            >
              <Scan className="h-4 w-4 mr-2" />
              الماسح
            </TabsTrigger>
            <TabsTrigger
              value="shipments"
              className="data-[state=active]:bg-[var(--accent-main)] data-[state=active]:text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              الشحنات
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-[var(--accent-main)] data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-[var(--accent-main)] data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner">
            <ScannerView />
          </TabsContent>

          <TabsContent value="shipments">
            <ShipmentsTable />
          </TabsContent>

          <TabsContent value="users">
            <UsersTable />
          </TabsContent>

          <TabsContent value="stats">
            <AdminStats />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
