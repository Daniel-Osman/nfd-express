import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[var(--bg-primary)]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-[var(--accent-main)]" />
            <span className="text-2xl font-bold text-[var(--text-primary)]">NFD Express</span>
          </div>
          <Card className="bg-[var(--surface-card)] border-[var(--border-color)]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-[var(--text-primary)]">صار خطأ</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {params?.error ? (
                <p className="text-sm text-[var(--text-muted)] mb-4">رمز الخطأ: {params.error}</p>
              ) : (
                <p className="text-sm text-[var(--text-muted)] mb-4">صار خطأ غير محدد</p>
              )}
              <Link href="/auth/login">
                <Button className="w-full bg-[var(--accent-main)] hover:bg-[var(--accent-main)]/90 text-white">
                  حاول مرة تانية
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
