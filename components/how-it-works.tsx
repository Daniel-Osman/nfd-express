"use client"

import { motion } from "framer-motion"
import { UserPlus, ShoppingCart, Package, Truck } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const icons = [UserPlus, ShoppingCart, Package, Truck]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export function HowItWorks() {
  const { t, dir } = useI18n()

  return (
    <section id="how-it-works" className="px-4 py-12 md:py-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="mb-10 md:mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[2px] bg-[var(--accent-main)]" aria-hidden="true" />
          <span className="font-mono text-sm tracking-widest text-[var(--muted-foreground)]">
            {t.howItWorks.sectionLabel}
          </span>
          <div className="w-12 h-[2px] bg-[var(--accent-main)]" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">{t.howItWorks.title}</h2>
      </motion.div>

      {/* Steps Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {t.howItWorks.steps.map((step, index) => {
          const Icon = icons[index]
          return (
            <motion.div
              key={index}
              className="relative bg-[var(--surface-card)] border border-[var(--border-color)] p-5 sm:p-6 group hover:border-[var(--accent-main)] transition-colors"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Step Number */}
              <div
                className={`absolute top-4 ${dir === "rtl" ? "left-4" : "right-4"} font-mono text-4xl sm:text-5xl font-bold text-[var(--border-color)] group-hover:text-[var(--accent-main)]/20 transition-colors`}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-[var(--accent-main)] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg sm:text-xl mb-3">{step.title}</h3>
              <p className="font-mono text-sm text-[var(--muted-foreground)] leading-relaxed">{step.description}</p>

              {/* Connector Line (not on last item) */}
              {index < t.howItWorks.steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-1/2 ${dir === "rtl" ? "-left-2" : "-right-2"} w-4 h-[2px] bg-[var(--border-color)]`}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom Note */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-mono text-sm text-[var(--muted-foreground)]">
          {t.howItWorks.bottomNote}{" "}
          <span className="text-[var(--accent-main)] font-bold">{t.howItWorks.underMinutes}</span>
          {t.howItWorks.noCreditCard}
        </p>
      </motion.div>
    </section>
  )
}
