import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
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
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-[var(--text-primary)]">شكراً لتسجيلك!</CardTitle>
              <CardDescription className="text-[var(--text-muted)]">تم إنشاء حسابك بنجاح</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-[var(--bg-primary)] mb-4">
                <Mail className="h-5 w-5 text-[var(--accent-main)]" />
                <p className="text-sm text-[var(--text-secondary)]">تفقّد بريدك الإلكتروني لتأكيد حسابك</p>
              </div>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-[var(--border-color)] text-[var(--text-primary)] bg-transparent"
                >
                  الرجوع لتسجيل الدخول
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
