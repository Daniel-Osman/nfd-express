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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // Check if user is admin
      const { data: profile } = await supabase.from("profiles").select("is_admin").single()

      if (profile?.is_admin) {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
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
              <CardTitle className="text-2xl text-[var(--text-primary)]">تسجيل الدخول</CardTitle>
              <CardDescription className="text-[var(--text-muted)]">
                أدخل بريدك الإلكتروني للدخول لحسابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[var(--text-primary)]">
                      البريد الإلكتروني
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
                      كلمة المرور
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
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري الدخول..." : "دخول"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-[var(--text-muted)]">
                  ما عندك حساب؟{" "}
                  <Link href="/auth/sign-up" className="underline underline-offset-4 text-[var(--accent-main)]">
                    سجّل هلق
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
