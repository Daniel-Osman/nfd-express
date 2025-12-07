"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Menu, X } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, dir } = useI18n()

  const navLinks = [
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.calculator, href: "#calculator" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 focus-ring"
            aria-label="NFD Express - Dubai to Lebanon Shipping"
          >
            <Package className="w-6 h-6 text-[var(--accent-main)]" />
            <span className="font-heading text-lg tracking-tight">NFD EXPRESS</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm tracking-wider text-[var(--muted-foreground)] hover:text-[var(--text-primary)] transition-colors focus-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <motion.a
              href="#get-address"
              className="inline-flex items-center bg-[var(--accent-main)] text-white font-mono font-bold text-sm px-5 py-2.5 hard-shadow focus-ring"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.nav.getAddress}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 focus-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--surface-card)] border-b border-[var(--border-color)] overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation" dir={dir}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-sm tracking-wider py-3 border-b border-[var(--border-color)] last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#get-address"
                className="block bg-[var(--accent-main)] text-white font-mono font-bold text-sm px-5 py-3 mt-4 text-center hard-shadow"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.getDubaiAddress}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
