"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Package, Layers, Loader2 } from "lucide-react"
import { getAllShipments, consolidatePackages, searchShipments } from "@/lib/actions/admin"
import type { ShipmentStatus } from "@/lib/types/database"

const statusColors: Record<ShipmentStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  received_uae: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  consolidating: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  shipped: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  arrived_leb: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
}

export function ShipmentsTable() {
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [consolidating, setConsolidating] = useState(false)

  useEffect(() => {
    loadShipments()
  }, [])

  const loadShipments = async () => {
    setLoading(true)
    try {
      const data = await getAllShipments()
      setShipments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadShipments()
      return
    }

    setLoading(true)
    try {
      const results = await searchShipments(searchQuery)
      setShipments(results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleConsolidate = async () => {
    if (selectedIds.length < 2) return

    setConsolidating(true)
    try {
      await consolidatePackages(selectedIds)
      setSelectedIds([])
      loadShipments()
    } catch (err) {
      console.error(err)
    } finally {
      setConsolidating(false)
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
              <Package className="h-5 w-5" />
              جميع الشحنات
            </CardTitle>
            <CardDescription className="text-[var(--text-muted)]">إدارة جميع الشحنات في النظام</CardDescription>
          </div>
          {selectedIds.length >= 2 && (
            <Button
              onClick={handleConsolidate}
              disabled={consolidating}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {consolidating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Layers className="h-4 w-4 mr-2" />}
              دمج ({selectedIds.length})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="بحث برقم التتبع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
          />
          <Button
            onClick={handleSearch}
            variant="outline"
            className="border-[var(--border-color)] text-[var(--text-primary)] bg-transparent"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[var(--border-color)] bg-[var(--bg-primary)]">
                <TableHead className="w-10"></TableHead>
                <TableHead className="text-[var(--text-muted)]">رقم التتبع</TableHead>
                <TableHead className="text-[var(--text-muted)]">العميل</TableHead>
                <TableHead className="text-[var(--text-muted)]">الحالة</TableHead>
                <TableHead className="text-[var(--text-muted)]">الوزن</TableHead>
                <TableHead className="text-[var(--text-muted)]">التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-[var(--accent-main)]" />
                  </TableCell>
                </TableRow>
              ) : shipments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-[var(--text-muted)]">
                    لا توجد شحنات
                  </TableCell>
                </TableRow>
              ) : (
                shipments.map((shipment) => (
                  <TableRow key={shipment.id} className="border-[var(--border-color)]">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(shipment.id)}
                        onCheckedChange={() => toggleSelect(shipment.id)}
                      />
                    </TableCell>
                    <TableCell className="text-[var(--text-primary)] font-mono">{shipment.tracking_number}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-[var(--text-primary)]">{shipment.profiles?.full_name || "—"}</p>
                        <p className="text-xs text-[var(--text-muted)]">{shipment.profiles?.uae_mailbox_id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[shipment.status as ShipmentStatus]}>{shipment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-[var(--text-secondary)]">{shipment.weight_kg || "—"} kg</TableCell>
                    <TableCell className="text-[var(--text-muted)] text-sm">
                      {new Date(shipment.created_at).toLocaleDateString("ar-LB")}
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
