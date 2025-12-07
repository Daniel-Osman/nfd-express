"use client"

import { motion } from "framer-motion"
import { Package, Instagram, Send, Phone, MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const storesList = {
  en: ["Shein", "AliExpress", "Amazon", "Temu", "Noon", "Any UAE Store"],
  ar: ["شي ان", "علي اكسبرس", "امازون", "تيمو", "نون", "أي متجر إماراتي"],
}

export function Footer() {
  const { t, dir, locale } = useI18n()

  return (
    <footer id="contact" className="mt-8 md:mt-16" itemScope itemType="https://schema.org/Organization">
      {/* Hazard Stripe Divider */}
      <div className="h-3 sm:h-4 hazard-stripes" aria-hidden="true" />

      <div className="bg-[var(--text-primary)] text-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--accent-main)]" aria-hidden="true" />
                <span className="font-heading text-xl sm:text-2xl" itemProp="name">
                  NFD EXPRESS
                </span>
              </div>
              <p className="font-mono text-sm opacity-70 max-w-sm mb-4 leading-relaxed" itemProp="description">
                {t.footer.description}
              </p>

              <p className="font-mono text-xs opacity-50 mb-4">
                <span className="text-[var(--accent-main)]">{t.footer.deliveryAreas}</span> {t.footer.areas}
              </p>
            </div>

            <div>
              <h4 className="font-mono font-bold text-sm tracking-widest mb-4 text-[var(--accent-main)]">
                {t.footer.weShipFrom}
              </h4>
              <ul className="space-y-2 font-mono text-sm">
                {storesList[locale].map((store, i) => (
                  <li key={i} className="opacity-70">
                    {store}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono font-bold text-sm tracking-widest mb-4 text-[var(--accent-main)]">
                {t.footer.contact}
              </h4>
              <ul className="space-y-3 font-mono text-sm">
                <li>
                  <a
                    href="tel:+971000000000"
                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity focus-ring"
                    itemProp="telephone"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>+971 00 000 0000</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+96100000000"
                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity focus-ring"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>+961 00 000 000 ({t.footer.lebanon})</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@nfdexpress.com"
                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity focus-ring"
                    itemProp="email"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>info@nfdexpress.com</span>
                  </a>
                </li>
                <li
                  className="flex items-start gap-2 opacity-70"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-4 h-4 mt-0.5" aria-hidden="true" />
                  <span>
                    <span itemProp="addressLocality">{locale === "ar" ? "بيروت" : "Beirut"}</span>,{" "}
                    <span itemProp="addressCountry">{t.footer.lebanon}</span>
                  </span>
                </li>
              </ul>

              {/* Social */}
              <div className="flex gap-3 mt-6">
                <motion.a
                  href="https://www.instagram.com/nfd.express/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[var(--bg-primary)] flex items-center justify-center hover:bg-[var(--accent-main)] hover:border-[var(--accent-main)] transition-colors focus-ring"
                  whileHover={{ y: -2 }}
                  aria-label="Follow NFD Express on Instagram"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                  href="https://wa.me/96171540088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[var(--bg-primary)] flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-colors focus-ring"
                  whileHover={{ y: -2 }}
                  aria-label="Contact NFD Express on WhatsApp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-mono text-xs opacity-50">{t.footer.copyright}</div>

            <div className="font-mono text-xs opacity-30 text-center">{t.footer.seoText}</div>

            {/* Barcode Decoration */}
            <div className="flex items-center gap-4">
              <div className="w-24 sm:w-32 h-6 sm:h-8 barcode-bg opacity-30" aria-hidden="true" />
              <span className="font-mono text-xs opacity-50">NFD-2025-V1</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
