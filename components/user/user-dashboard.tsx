"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  User,
  Crown,
  LogOut,
  Copy,
  Check,
  Eye,
  EyeOff,
  CheckCircle,
  Layers,
  Clock,
  MapPin,
  Loader2,
  Lock,
} from "lucide-react"
import type { Profile, SubscriptionTier, ShipmentStatus } from "@/lib/types/database"
import { getUserShipments } from "@/lib/actions/tracking"
import { signOut } from "@/lib/actions/user"
import { useRouter } from "next/navigation"

const tierColors: Record<SubscriptionTier, string> = {
  free: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  bronze: "bg-amber-600/10 text-amber-600 border-amber-600/20",
  silver: "bg-slate-400/10 text-slate-400 border-slate-400/20",
  gold: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
}

const tierFeatures: Record<SubscriptionTier, string[]> = {
  free: ["تتبع الشحنات الأساسي"],
  bronze: ["تتبع الشحنات", "صور الوصول"],
  silver: ["تتبع الشحنات", "صور الوصول", "التحقق من المحتوى"],
  gold: ["تتبع الشحنات", "صور الوصول", "التحقق من المحتوى", "دمج الطرود"],
}

const statusColors: Record<ShipmentStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  received_uae: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  consolidating: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  shipped: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  arrived_leb: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
}

const statusLabels: Record<ShipmentStatus, string> = {
  pending: "قيد الانتظار",
  received_uae: "وصل الإمارات",
  consolidating: "جاري الدمج",
  shipped: "تم الشحن",
  arrived_leb: "وصل لبنان",
  delivered: "تم التسليم",
}

interface UserDashboardProps {
  profile: Profile
}

export function UserDashboard({ profile }: UserDashboardProps) {
  const [copied, setCopied] = useState(false)
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("shipments")
  const router = useRouter()

  useEffect(() => {
    loadShipments()
  }, [])

  const loadShipments = async () => {
    try {
      const data = await getUserShipments()
      setShipments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyMailboxId = () => {
    if (profile.uae_mailbox_id) {
      navigator.clipboard.writeText(profile.uae_mailbox_id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  const canSeePhoto = profile.subscription_tier !== "free"
  const canSeeVerification = profile.subscription_tier === "silver" || profile.subscription_tier === "gold"
  const canConsolidate = profile.subscription_tier === "gold"

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--surface-card)]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-[var(--accent-main)]" />
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">NFD Express</h1>
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

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* User Info */}
          <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
                <User className="h-5 w-5" />
                معلوماتك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">الاسم:</span>
                <span className="text-[var(--text-primary)] font-medium">{profile.full_name || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">الهاتف:</span>
                <span className="text-[var(--text-primary)]">{profile.phone_number || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">صندوق البريد:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent-main)] font-mono font-bold">{profile.uae_mailbox_id}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={copyMailboxId}
                    title="نسخ رقم الصندوق"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-[var(--text-muted)]" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
                <Crown className="h-5 w-5" />
                اشتراكك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={`${tierColors[profile.subscription_tier]} text-lg px-4 py-1`}>
                  <Crown className="h-4 w-4 mr-2" />
                  {profile.subscription_tier.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[var(--text-muted)]">المميزات المتاحة:</p>
                <ul className="space-y-1">
                  {tierFeatures[profile.subscription_tier].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipments */}
        <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)] flex items-center gap-2">
              <Package className="h-5 w-5" />
              شحناتك
            </CardTitle>
            <CardDescription className="text-[var(--text-muted)]">جميع الطرود المرتبطة بحسابك</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--accent-main)]" />
              </div>
            ) : shipments.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-[var(--text-muted)] mb-4" />
                <p className="text-[var(--text-muted)]">ما في شحنات بعد</p>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  استخدم رقم صندوقك <span className="text-[var(--accent-main)]">{profile.uae_mailbox_id}</span> للشحن
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <ShipmentCard
                    key={shipment.id}
                    shipment={shipment}
                    canSeePhoto={canSeePhoto}
                    canSeeVerification={canSeeVerification}
                    tier={profile.subscription_tier}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function ShipmentCard({
  shipment,
  canSeePhoto,
  canSeeVerification,
  tier,
}: {
  shipment: any
  canSeePhoto: boolean
  canSeeVerification: boolean
  tier: SubscriptionTier
}) {
  const [showPhoto, setShowPhoto] = useState(false)

  return (
    <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[var(--text-primary)] font-medium">{shipment.tracking_number}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {new Date(shipment.created_at).toLocaleDateString("ar-LB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Badge className={statusColors[shipment.status as ShipmentStatus]}>
          {statusLabels[shipment.status as ShipmentStatus]}
        </Badge>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-muted)]">الوزن:</span>
          <span className="text-[var(--text-primary)]">{shipment.weight_kg || "—"} كغ</span>
        </div>
        {shipment.is_consolidated && (
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-500" />
            <span className="text-purple-500">طرد مدمج</span>
          </div>
        )}
      </div>

      {/* Photo Section */}
      {shipment.arrival_photo_url && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
              <Eye className="h-4 w-4" />
              صورة الوصول
            </span>
            {canSeePhoto ? (
              <Button variant="ghost" size="sm" onClick={() => setShowPhoto(!showPhoto)}>
                {showPhoto ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            ) : (
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                <Lock className="h-3 w-3 mr-1" />
                Bronze+
              </Badge>
            )}
          </div>
          {canSeePhoto && showPhoto && (
            <img
              src={shipment.arrival_photo_url || "/placeholder.svg"}
              alt="Proof of arrival"
              className="rounded-lg w-full max-h-48 object-cover border border-[var(--border-color)]"
            />
          )}
          {!canSeePhoto && (
            <div className="rounded-lg bg-[var(--surface-card)] p-4 text-center border border-dashed border-[var(--border-color)]">
              <Lock className="h-8 w-8 mx-auto text-[var(--text-muted)] mb-2" />
              <p className="text-sm text-[var(--text-muted)]">ترقّى لـ Bronze لتشوف الصورة</p>
            </div>
          )}
        </div>
      )}

      {/* Verification Section */}
      {shipment.verification_status && (
        <div className="space-y-2">
          <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            التحقق من المحتوى
          </span>
          {canSeeVerification ? (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-600">{shipment.admin_notes}</p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[var(--surface-card)] border border-dashed border-[var(--border-color)] text-center">
              <Badge className="bg-slate-400/10 text-slate-400">
                <Lock className="h-3 w-3 mr-1" />
                Silver+
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Events Timeline */}
      {shipment.shipment_events && shipment.shipment_events.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
          <span className="text-sm text-[var(--text-muted)] flex items-center gap-2">
            <Clock className="h-4 w-4" />
            سجل التتبع
          </span>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {shipment.shipment_events.slice(0, 5).map((event: any, i: number) => (
              <div key={event.id} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-main)] mt-1.5 shrink-0" />
                <div>
                  <p className="text-[var(--text-primary)]">{event.status}</p>
                  <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location} •{" "}
                    {new Date(event.timestamp).toLocaleDateString("ar-LB", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
