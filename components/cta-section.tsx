"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowLeft, Package, CheckCircle, Sparkles, Zap, Shield, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useRef } from "react"

export function CtaSection() {
  const { t, dir } = useI18n()
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="get-address" ref={containerRef} className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Main CTA Card */}
        <div className="bg-[var(--text-primary)] text-[var(--bg-primary)] relative min-h-[500px] flex items-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <motion.div
              className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--accent-main)]/20 rounded-full blur-3xl"
              style={{ y }}
            />
            <motion.div
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--accent-secondary)]/20 rounded-full blur-3xl"
              style={{ y: useTransform(y, (v) => -v) }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #F4F4F5 1px, transparent 1px), linear-gradient(to bottom, #F4F4F5 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
              aria-hidden="true"
            />

            {/* Floating icons */}
            {[Package, Zap, Shield, Clock].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute opacity-10"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                <Icon className="w-12 h-12" />
              </motion.div>
            ))}
          </div>

          {/* Decorative corners */}
          <div
            className={`absolute top-0 ${dir === "rtl" ? "right-0" : "left-0"} w-32 sm:w-48 h-6 hazard-stripes`}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-0 ${dir === "rtl" ? "left-0" : "right-0"} w-32 sm:w-48 h-6 hazard-stripes`}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 w-full p-8 md:p-12 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className={dir === "rtl" ? "lg:order-2" : ""}>
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-5 h-5 text-[var(--accent-main)]" aria-hidden="true" />
                  <span className="font-mono text-sm tracking-widest">{t.cta.label}</span>
                </motion.div>

                <motion.h2
                  className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[0.95]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t.cta.title}{" "}
                  <span className="relative inline-block">
                    <span className="text-[var(--accent-main)]">{t.cta.titleHighlight}</span>
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--accent-main)]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    />
                  </span>{" "}
                  {t.cta.titleEnd}
                </motion.h2>

                <motion.p
                  className="font-mono text-base md:text-lg opacity-80 max-w-lg leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {t.cta.description}
                </motion.p>

                {/* Benefits */}
                <motion.ul
                  className="grid sm:grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {t.cta.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 font-mono text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-[var(--accent-main)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      </div>
                      {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Right CTA */}
              <motion.div
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {/* Price highlight */}
                <div className="bg-white/10 backdrop-blur-sm p-6 text-center w-full max-w-xs">
                  <p className="font-mono text-sm opacity-70 mb-2">Starting from just</p>
                  <p className="font-heading text-5xl md:text-6xl text-[var(--accent-main)]">$6.5</p>
                  <p className="font-mono text-sm opacity-70">per kilogram</p>
                </div>

                <motion.a
                  href="/auth/sign-up"
                  className="w-full max-w-xs inline-flex bg-[var(--accent-main)] text-white font-mono font-bold text-lg px-10 py-5 hard-shadow items-center justify-center gap-3 group focus-ring relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Get your free Dubai address"
                >
                  <span className="relative z-10">{t.cta.button}</span>
                  <ArrowIcon
                    className="w-6 h-6 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform relative z-10"
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute inset-0 bg-[var(--accent-secondary)]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <p className="font-mono text-xs opacity-50 text-center">{t.cta.noCreditCard}</p>
              </motion.div>
            </div>
          </div>

          {/* Barcode decoration */}
          <div
            className={`absolute bottom-8 ${dir === "rtl" ? "right-8" : "left-8"} w-32 sm:w-40 h-8 sm:h-10 barcode-bg opacity-20`}
            aria-hidden="true"
          />
        </div>

        {/* Bottom floating card */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[var(--surface-card)] border border-[var(--border-color)] px-8 py-4 shadow-2xl hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-sm text-[var(--text-primary)]">Currently accepting shipments</span>
          </div>
          <div className="w-px h-6 bg-[var(--border-color)]" />
          <span className="font-mono text-sm text-[var(--muted-foreground)]">Est. delivery: 5-7 days</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
