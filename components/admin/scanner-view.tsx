"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Camera,
  Upload,
  CheckCircle,
  Package,
  User,
  Phone,
  Mail,
  Crown,
  AlertCircle,
  Loader2,
} from "lucide-react"
import {
  getShipmentByTracking,
  uploadProofPhoto,
  updateShipmentStatus,
  addVerificationNotes,
  getUserByMailboxId,
  createShipment,
} from "@/lib/actions/admin"
import type { ShipmentStatus, SubscriptionTier } from "@/lib/types/database"

const statusColors: Record<ShipmentStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  received_uae: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  consolidating: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  shipped: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  arrived_leb: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
}

const tierColors: Record<SubscriptionTier, string> = {
  free: "bg-gray-500/10 text-gray-500",
  bronze: "bg-amber-600/10 text-amber-600",
  silver: "bg-slate-400/10 text-slate-400",
  gold: "bg-yellow-500/10 text-yellow-500",
}

export function ScannerView() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [shipment, setShipment] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [notes, setNotes] = useState("")
  const [newStatus, setNewStatus] = useState<ShipmentStatus | "">("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // New shipment creation
  const [mailboxId, setMailboxId] = useState("")
  const [newShipmentUser, setNewShipmentUser] = useState<any>(null)
  const [creatingShipment, setCreatingShipment] = useState(false)
  const [newWeight, setNewWeight] = useState("")
  const [newDimensions, setNewDimensions] = useState("")

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return

    setLoading(true)
    setError(null)
    setShipment(null)

    try {
      const result = await getShipmentByTracking(trackingNumber)
      if (result) {
        setShipment(result)
      } else {
        setError("ما لقينا شحنة بهيدا الرقم")
      }
    } catch (err) {
      setError("صار خطأ بالبحث")
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !shipment) return

    setUploading(true)
    try {
      await uploadProofPhoto(shipment.id, file)
      // Refresh shipment
      const updated = await getShipmentByTracking(trackingNumber)
      setShipment(updated)
    } catch (err) {
      setError("فشل رفع الصورة")
    } finally {
      setUploading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!newStatus || !shipment) return

    setLoading(true)
    try {
      await updateShipmentStatus(shipment.id, newStatus)
      const updated = await getShipmentByTracking(trackingNumber)
      setShipment(updated)
      setNewStatus("")
    } catch (err) {
      setError("فشل تحديث الحالة")
    } finally {
      setLoading(false)
    }
  }

  const handleAddNotes = async () => {
    if (!notes.trim() || !shipment) return

    setLoading(true)
    try {
      await addVerificationNotes(shipment.id, notes)
      const updated = await getShipmentByTracking(trackingNumber)
      setShipment(updated)
      setNotes("")
    } catch (err) {
      setError("فشل إضافة الملاحظات")
    } finally {
      setLoading(false)
    }
  }

  const handleMailboxSearch = async () => {
    if (!mailboxId.trim()) return

    setLoading(true)
    try {
      const user = await getUserByMailboxId(mailboxId)
      setNewShipmentUser(user)
      if (!user) setError("ما لقينا مستخدم بهيدا الرقم")
    } catch (err) {
      setError("صار خطأ بالبحث")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateShipment = async () => {
    if (!newShipmentUser || !trackingNumber) return

    setCreatingShipment(true)
    try {
      await createShipment({
        tracking_number: trackingNumber,
        user_id: newShipmentUser.id,
        weight_kg: newWeight ? Number.parseFloat(newWeight) : undefined,
        dimensions: newDimensions || undefined,
      })
      // Refresh
      const result = await getShipmentByTracking(trackingNumber)
      setShipment(result)
      setNewShipmentUser(null)
      setMailboxId("")
      setNewWeight("")
      setNewDimensions("")
    } catch (err) {
      setError("فشل إنشاء الشحنة")
    } finally {
      setCreatingShipment(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Scanner Input */}
      <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
            <Search className="h-5 w-5" />
            بحث عن شحنة
          </CardTitle>
          <CardDescription className="text-[var(--text-muted)]">
            أدخل رقم التتبع للبحث أو إنشاء شحنة جديدة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="أدخل رقم التتبع..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {error && !shipment && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-500 mb-3">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>

              {/* Create new shipment section */}
              <div className="space-y-3 pt-3 border-t border-red-500/20">
                <p className="text-sm text-[var(--text-muted)]">إنشاء شحنة جديدة بهيدا الرقم:</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="رقم صندوق البريد (NFD-XXXX)"
                    value={mailboxId}
                    onChange={(e) => setMailboxId(e.target.value)}
                    className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                  />
                  <Button
                    variant="outline"
                    onClick={handleMailboxSearch}
                    disabled={loading}
                    className="border-[var(--border-color)] bg-transparent"
                  >
                    بحث
                  </Button>
                </div>

                {newShipmentUser && (
                  <div className="p-3 rounded-lg bg-[var(--bg-primary)] space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[var(--accent-main)]" />
                      <span className="text-[var(--text-primary)]">{newShipmentUser.full_name}</span>
                      <Badge className={tierColors[newShipmentUser.subscription_tier as SubscriptionTier]}>
                        {newShipmentUser.subscription_tier}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="الوزن (كغ)"
                        type="number"
                        step="0.1"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        className="bg-[var(--surface-card)] border-[var(--border-color)] text-[var(--text-primary)]"
                      />
                      <Input
                        placeholder="الأبعاد"
                        value={newDimensions}
                        onChange={(e) => setNewDimensions(e.target.value)}
                        className="bg-[var(--surface-card)] border-[var(--border-color)] text-[var(--text-primary)]"
                      />
                    </div>
                    <Button
                      onClick={handleCreateShipment}
                      disabled={creatingShipment}
                      className="w-full bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white"
                    >
                      {creatingShipment ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      إنشاء الشحنة
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipment Details */}
      {shipment && (
        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
                <Package className="h-5 w-5" />
                تفاصيل الشحنة
              </CardTitle>
              <Badge className={statusColors[shipment.status as ShipmentStatus]}>{shipment.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Info */}
            <div className="p-3 rounded-lg bg-[var(--bg-primary)] space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-primary)]">{shipment.profiles?.full_name || "—"}</span>
                <Badge className={tierColors[shipment.profiles?.subscription_tier as SubscriptionTier]}>
                  <Crown className="h-3 w-3 mr-1" />
                  {shipment.profiles?.subscription_tier}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Mail className="h-3 w-3" />
                <span>{shipment.profiles?.uae_mailbox_id}</span>
              </div>
              {shipment.profiles?.phone_number && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <Phone className="h-3 w-3" />
                  <span>{shipment.profiles.phone_number}</span>
                </div>
              )}
            </div>

            {/* Shipment Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[var(--text-muted)]">الوزن:</span>
                <span className="text-[var(--text-primary)] mr-2">{shipment.weight_kg || "—"} كغ</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">الأبعاد:</span>
                <span className="text-[var(--text-primary)] mr-2">{shipment.dimensions || "—"}</span>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-[var(--text-primary)]">صورة الوصول</Label>
              {shipment.arrival_photo_url ? (
                <div className="relative rounded-lg overflow-hidden border border-[var(--border-color)]">
                  <img
                    src={shipment.arrival_photo_url || "/placeholder.svg"}
                    alt="Proof of arrival"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      تم الرفع
                    </Badge>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[var(--border-color)] rounded-lg p-6 text-center cursor-pointer hover:border-[var(--accent-main)] transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[var(--accent-main)]" />
                  ) : (
                    <>
                      <Camera className="h-8 w-8 mx-auto text-[var(--text-muted)] mb-2" />
                      <p className="text-sm text-[var(--text-muted)]">اضغط لرفع صورة</p>
                    </>
                  )}
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </div>

            {/* Status Update */}
            <div className="space-y-2">
              <Label className="text-[var(--text-primary)]">تحديث الحالة</Label>
              <div className="flex gap-2">
                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ShipmentStatus)}>
                  <SelectTrigger className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="received_uae">Received UAE</SelectItem>
                    <SelectItem value="consolidating">Consolidating</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="arrived_leb">Arrived Lebanon</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={!newStatus || loading}
                  className="bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white"
                >
                  تحديث
                </Button>
              </div>
            </div>

            {/* Verification Notes */}
            <div className="space-y-2">
              <Label className="text-[var(--text-primary)]">ملاحظات التحقق (Silver+)</Label>
              {shipment.admin_notes && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-600 mb-2">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  {shipment.admin_notes}
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  placeholder="أضف ملاحظات التحقق..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] min-h-[80px]"
                />
              </div>
              <Button
                onClick={handleAddNotes}
                disabled={!notes.trim() || loading}
                variant="outline"
                className="w-full border-[var(--border-color)] bg-transparent"
              >
                <Upload className="h-4 w-4 mr-2" />
                حفظ الملاحظات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
