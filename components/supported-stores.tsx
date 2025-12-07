"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"

const stores = [
  { name: "SHEIN", nameAr: "شي ان" },
  { name: "ALIEXPRESS", nameAr: "علي اكسبرس" },
  { name: "AMAZON", nameAr: "امازون" },
  { name: "TEMU", nameAr: "تيمو" },
  { name: "NOON", nameAr: "نون" },
  { name: "NAMSHI", nameAr: "نمشي" },
  { name: "FARFETCH", nameAr: "فارفيتش" },
  { name: "ASOS", nameAr: "أسوس" },
]

export function SupportedStores() {
  const { t, locale } = useI18n()

  return (
    <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
      <motion.div
        className="bg-[var(--surface-card)] border border-[var(--border-color)] p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-mono text-sm tracking-widest text-[var(--muted-foreground)] mb-2">{t.stores.subtitle}</p>
          <h3 className="font-heading text-xl sm:text-2xl">{t.stores.title}</h3>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {stores.map((store, index) => (
            <motion.div
              key={index}
              className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-3 sm:p-4 text-center group hover:border-[var(--accent-main)] transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <p className="font-mono font-bold text-xs sm:text-sm group-hover:text-[var(--accent-main)] transition-colors">
                {locale === "ar" ? store.nameAr : store.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center font-mono text-xs text-[var(--muted-foreground)] mt-6">{t.stores.bottomNote}</p>
      </motion.div>
    </section>
  )
}
