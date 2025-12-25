"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Package } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("كلمات المرور مش متطابقة")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
            address_line1: addressLine1,
            address_line2: addressLine2,
            city: city,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "صار خطأ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[var(--bg-primary)]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-[var(--accent-main)]" />
            <span className="text-2xl font-bold text-[var(--text-primary)]">NFD Express</span>
          </div>
          <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-2xl text-[var(--text-primary)]">إنشاء حساب</CardTitle>
              <CardDescription className="text-[var(--text-muted)]">سجّل حساب جديد للبدء بالشحن</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName" className="text-[var(--text-primary)]">
                      الاسم الكامل *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="محمد أحمد"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-[var(--text-primary)]">
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+961 XX XXX XXX"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addressLine1" className="text-[var(--text-primary)]">
                      العنوان - السطر الأول *
                    </Label>
                    <Input
                      id="addressLine1"
                      type="text"
                      placeholder="اسم الشارع والمبنى"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="addressLine2" className="text-[var(--text-primary)]">
                      العنوان - السطر الثاني
                    </Label>
                    <Input
                      id="addressLine2"
                      type="text"
                      placeholder="الطابق، الشقة (اختياري)"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city" className="text-[var(--text-primary)]">
                      المدينة *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="بيروت"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[var(--text-primary)]">
                      البريد الإلكتروني *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-[var(--text-primary)]">
                      كلمة المرور *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password" className="text-[var(--text-primary)]">
                      تأكيد كلمة المرور *
                    </Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-[var(--text-muted)]">
                  عندك حساب؟{" "}
                  <Link href="/auth/login" className="underline underline-offset-4 text-[var(--accent-main)]">
                    سجّل دخول
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
