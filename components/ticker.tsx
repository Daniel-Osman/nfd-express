"use client"

import { useI18n } from "@/lib/i18n/context"

export function Ticker() {
  const { t, dir } = useI18n()

  return (
    <div
      className="bg-[var(--text-primary)] text-[var(--bg-primary)] py-2 overflow-hidden"
      role="marquee"
      aria-label="Flight information ticker"
      dir="ltr" // Always LTR for marquee animation
    >
      <div className="flex whitespace-nowrap">
        <div className={`flex ${dir === "rtl" ? "animate-marquee-rtl" : "animate-marquee"}`}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-mono text-sm tracking-wider px-4" aria-hidden={i > 0}>
              {t.ticker.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
