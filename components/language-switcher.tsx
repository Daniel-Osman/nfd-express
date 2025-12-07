"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-1 bg-[var(--bg-primary)] border border-[var(--border-color)] p-1">
      <motion.button
        onClick={() => setLocale("en")}
        className={`font-mono text-xs px-3 py-1.5 transition-colors focus-ring ${
          locale === "en"
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
            : "text-[var(--muted-foreground)] hover:text-[var(--text-primary)]"
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        EN
      </motion.button>
      <motion.button
        onClick={() => setLocale("ar")}
        className={`font-arabic text-sm px-3 py-1.5 transition-colors focus-ring ${
          locale === "ar"
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
            : "text-[var(--muted-foreground)] hover:text-[var(--text-primary)]"
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label="التبديل إلى العربية"
        aria-pressed={locale === "ar"}
      >
        عربي
      </motion.button>
    </div>
  )
}
