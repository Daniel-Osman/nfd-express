"use client"

import { motion } from "framer-motion"
import { Plane, Smartphone, MapPin, Clock, Shield, ShoppingBag } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function BentoGrid() {
  const { t, dir, locale } = useI18n()

  const brands = ["SHEIN", "ALIEXPRESS", "AMAZON", "TEMU", "NOON"]

  return (
    <section id="services" className="px-4 py-12 md:py-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="mb-10 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-[2px] bg-[var(--accent-main)]" aria-hidden="true" />
          <span className="font-mono text-sm tracking-widest text-[var(--muted-foreground)]">
            {t.services.sectionLabel}
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl">{t.services.title}</h2>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Box 1 - Shein & AliExpress Specialists */}
        <motion.article
          className="sm:col-span-2 bg-[var(--surface-card)] border border-[var(--border-color)] p-5 sm:p-6 group cursor-pointer transition-all duration-300 hover:border-[var(--accent-secondary)]"
          variants={itemVariants}
          whileHover={{ y: -4 }}
          itemScope
          itemType="https://schema.org/Service"
        >
          <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--accent-main)] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </div>
                <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent-secondary)]" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">01</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl mb-3" itemProp="name">
              {t.services.box1.title}
            </h3>
            <p
              className="font-mono text-sm sm:text-base text-[var(--muted-foreground)] mb-4 flex-grow leading-relaxed"
              itemProp="description"
            >
              {t.services.box1.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto" aria-label="Supported platforms">
              {brands.map((brand, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)]"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Box 2 - Real-Time Tracking */}
        <motion.article
          className="bg-[var(--text-primary)] text-[var(--bg-primary)] p-5 sm:p-6 group cursor-pointer transition-all duration-300"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[var(--bg-primary)] flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs opacity-50">02</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl md:text-2xl mb-3">{t.services.box2.title}</h3>

            {/* Tracking Timeline */}
            <div
              className="flex-grow flex flex-col justify-center space-y-2 sm:space-y-3 my-4"
              aria-label="Tracking progress"
            >
              {t.services.box2.steps.map((step, i) => {
                const done = i < 2
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${done ? "bg-[var(--accent-main)]" : "border border-[var(--bg-primary)] opacity-30"}`}
                      aria-hidden="true"
                    />
                    <span className={`font-mono text-xs ${done ? "" : "opacity-30"}`}>{step}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.article>

        {/* Box 3 - WhatsApp Support */}
        <motion.article
          className="bg-[#25D366] text-white p-5 sm:p-6 group cursor-pointer transition-all duration-300"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col h-full min-h-[180px] sm:min-h-[200px]">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs opacity-50">03</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl md:text-2xl mb-2">{t.services.box3.title}</h3>
            <p className="font-mono text-sm opacity-80 mb-4">{t.services.box3.subtitle}</p>

            <motion.a
              href="https://wa.me/96171540088"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 font-mono text-sm font-bold bg-white text-[#25D366] px-4 py-2 w-fit focus-ring"
              style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.3)" }}
              whileHover={{ scale: 1.02 }}
              aria-label="Contact NFD Express on WhatsApp"
            >
              {t.services.box3.cta}
            </motion.a>
          </div>
        </motion.article>

        {/* Box 4 - Fast Delivery */}
        <motion.article
          className="bg-[var(--surface-card)] border border-[var(--border-color)] p-5 sm:p-6 group cursor-pointer transition-all duration-300 hover:border-[var(--accent-secondary)]"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col h-full min-h-[180px] sm:min-h-[200px]">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--accent-secondary)] flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">04</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl md:text-2xl mb-2">{t.services.box4.title}</h3>
            <p className="font-mono text-sm text-[var(--muted-foreground)] leading-relaxed mb-2">
              {t.services.box4.description}
            </p>
            <p className="font-mono text-xs text-[var(--muted-foreground)] leading-relaxed">
              {t.services.box4.subtext}
            </p>
          </div>
        </motion.article>

        {/* Box 5 - Secure */}
        <motion.article
          className="bg-[var(--surface-card)] border border-[var(--border-color)] p-5 sm:p-6 group cursor-pointer transition-all duration-300 hover:border-[var(--accent-secondary)]"
          variants={itemVariants}
          whileHover={{ y: -4 }}
        >
          <div className="flex flex-col h-full min-h-[180px] sm:min-h-[200px]">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[var(--text-primary)] flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs text-[var(--muted-foreground)]">05</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl md:text-2xl mb-2">{t.services.box5.title}</h3>
            <p className="font-mono text-sm text-[var(--muted-foreground)] leading-relaxed">
              {t.services.box5.description}
            </p>

            {/* Barcode Decoration */}
            <div className="mt-auto h-6 sm:h-8 barcode-bg opacity-30" aria-hidden="true" />
          </div>
        </motion.article>
      </motion.div>
    </section>
  )
}
