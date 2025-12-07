"use client"

import { motion, useInView } from "framer-motion"
import { CheckCheck, Star, Quote, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useRef, useState, useEffect } from "react"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          if (value.includes("+")) {
            setDisplayValue(Math.floor(current).toString() + "+")
          } else if (value.includes("%")) {
            setDisplayValue(Math.floor(current).toString() + "%")
          } else if (value.includes(".")) {
            setDisplayValue(current.toFixed(1))
          } else {
            setDisplayValue(Math.floor(current).toString())
          }
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

export function Testimonials() {
  const { t, dir } = useI18n()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto overflow-hidden" id="reviews">
      {/* Section Header */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="w-12 h-[2px] bg-[var(--accent-secondary)]"
            aria-hidden="true"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          <span className="font-mono text-sm tracking-widest text-[var(--muted-foreground)]">
            {t.testimonials.sectionLabel}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">{t.testimonials.title}</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-[var(--accent-main)] text-[var(--accent-main)]" />
                </motion.div>
              ))}
            </div>
            <span className="font-mono text-sm text-[var(--muted-foreground)]">4.9/5 from 500+ reviews</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mb-12 md:mb-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { ...t.testimonials.stats.packages, icon: "📦", trend: "+23%" },
          { ...t.testimonials.stats.onTime, icon: "⏱️", trend: "+2%" },
          { ...t.testimonials.stats.rating, icon: "⭐", trend: "+0.2" },
          { ...t.testimonials.stats.experience, icon: "🏆", trend: null },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-[var(--surface-card)] border border-[var(--border-color)] p-5 sm:p-6 relative group overflow-hidden"
            whileHover={{ y: -4, borderColor: "var(--accent-main)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div className="absolute inset-0 bg-[var(--accent-main)] opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              {stat.trend && (
                <div className="flex items-center gap-1 text-green-600 text-xs font-mono">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--accent-main)] mb-1">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="font-mono text-xs sm:text-sm text-[var(--muted-foreground)]">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        role="list"
        aria-label="Customer testimonials"
      >
        {t.testimonials.reviews.map((testimonial, index) => (
          <motion.article
            key={index}
            className={`bg-[var(--surface-card)] border border-[var(--border-color)] p-6 relative group cursor-pointer transition-all duration-300 ${
              activeIndex === index ? "border-[var(--accent-main)]" : ""
            }`}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5 },
              },
            }}
            role="listitem"
            onHoverStart={() => setActiveIndex(index)}
            onHoverEnd={() => setActiveIndex(null)}
            whileHover={{ y: -4 }}
          >
            {/* Quote icon */}
            <motion.div
              className={`absolute top-4 ${dir === "rtl" ? "left-4" : "right-4"} opacity-10 group-hover:opacity-20 transition-opacity`}
              animate={activeIndex === index ? { rotate: [0, 10, 0], scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Quote className="w-12 h-12 text-[var(--accent-main)]" />
            </motion.div>

            {/* Rating stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--accent-main)] text-[var(--accent-main)]" />
              ))}
            </div>

            {/* Message */}
            <p className="font-mono text-base sm:text-lg mb-6 leading-relaxed relative z-10">"{testimonial.message}"</p>

            {/* Author info */}
            <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent-main)] text-white flex items-center justify-center font-heading text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <span className="font-mono font-bold text-sm block">{testimonial.name}</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">{testimonial.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] font-mono">
                <span>{testimonial.time}</span>
                <CheckCheck className="w-4 h-4 text-[var(--accent-secondary)]" aria-label="Verified" />
              </div>
            </div>

            {/* Hover accent line */}
            <motion.div
              className={`absolute bottom-0 ${dir === "rtl" ? "right-0" : "left-0"} h-1 bg-[var(--accent-main)]`}
              initial={{ width: "0%" }}
              animate={activeIndex === index ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 bg-[var(--text-primary)] text-[var(--bg-primary)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {["S", "A", "M", "R"].map((letter, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 bg-[var(--accent-main)] text-white flex items-center justify-center font-heading text-sm border-2 border-[var(--text-primary)]"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
          <div>
            <p className="font-mono font-bold text-sm">Join 5,000+ happy customers</p>
            <p className="font-mono text-xs opacity-70">Shipping from Dubai to Lebanon</p>
          </div>
        </div>
        <motion.a
          href="#get-address"
          className="font-mono font-bold text-sm bg-[var(--accent-main)] text-white px-6 py-3 hard-shadow whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          START SHIPPING TODAY
        </motion.a>
      </motion.div>
    </section>
  )
}
