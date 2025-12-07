"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, ArrowRight, ArrowLeft, Scale, Truck, CableIcon as CalcIcon, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Calculator() {
  const [weight, setWeight] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)
  const pricePerKg = 6.5
  const total = (weight * pricePerKg).toFixed(2)
  const { t, dir } = useI18n()
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight

  const fillPercentage = ((weight - 1) / 29) * 100

  // Animate price change
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [weight])

  return (
    <section id="calculator" className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="mb-12 md:mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-[2px] bg-[var(--accent-main)]" />
          <span className="font-mono text-sm tracking-widest text-[var(--muted-foreground)] uppercase">
            {t.calculator.headerTitle}
          </span>
          <div className="w-12 h-[2px] bg-[var(--accent-main)]" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">{t.calculator.title}</h2>
        <p className="font-mono text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">{t.calculator.description}</p>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Main Calculator Card */}
        <div className="bg-[var(--surface-card)] border-2 border-[var(--border-color)] overflow-hidden shadow-2xl">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-[var(--accent-main)] via-[var(--accent-secondary)] to-[var(--accent-main)]" />

          <div className="grid lg:grid-cols-5 min-h-[500px]">
            {/* Left Panel - Weight Display */}
            <div
              className={`lg:col-span-2 bg-[var(--text-primary)] text-[var(--bg-primary)] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden ${dir === "rtl" ? "lg:order-2" : ""}`}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Scale className="w-6 h-6 text-[var(--accent-main)]" />
                  <span className="font-mono text-sm tracking-widest opacity-70">PACKAGE WEIGHT</span>
                </div>

                {/* Animated Weight Counter */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={weight}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-baseline gap-4"
                    >
                      <span className="font-heading text-8xl sm:text-9xl text-[var(--accent-main)]">{weight}</span>
                      <span className="font-mono text-3xl opacity-50">KG</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Visual Weight Bar */}
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--accent-main)] to-[var(--accent-secondary)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPercentage}%` }}
                      transition={{ type: "spring", stiffness: 100 }}
                    />
                    {/* Tick marks */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 bottom-0 w-px bg-white/20"
                        style={{ left: `${(i + 1) * 16.67}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between font-mono text-xs opacity-50">
                    <span>1 KG</span>
                    <span>15 KG</span>
                    <span>30 KG</span>
                  </div>
                </div>

                {/* Weight Category Badge */}
                <motion.div
                  className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 font-mono text-sm"
                  animate={{ scale: isAnimating ? 1.05 : 1 }}
                >
                  <Package className="w-4 h-4" />
                  {weight <= 5 ? "Light Package" : weight <= 15 ? "Medium Package" : "Heavy Package"}
                </motion.div>
              </div>
            </div>

            {/* Right Panel - Controls & Price */}
            <div
              className={`lg:col-span-3 p-8 md:p-12 flex flex-col justify-center ${dir === "rtl" ? "lg:order-1" : ""}`}
            >
              {/* Slider Control */}
              <div className="mb-10">
                <label
                  htmlFor="weight-slider"
                  className="flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)] mb-4"
                >
                  <CalcIcon className="w-4 h-4" />
                  Drag to adjust weight
                </label>

                <div className="relative py-4">
                  <input
                    id="weight-slider"
                    type="range"
                    min="1"
                    max="30"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="nfd-slider w-full h-3 cursor-pointer"
                    style={{
                      background: `linear-gradient(to ${dir === "rtl" ? "left" : "right"}, var(--accent-main) 0%, var(--accent-main) ${fillPercentage}%, var(--border-color) ${fillPercentage}%, var(--border-color) 100%)`,
                    }}
                    aria-valuemin={1}
                    aria-valuemax={30}
                    aria-valuenow={weight}
                    aria-valuetext={`${weight} kilograms`}
                  />

                  {/* Quick select buttons */}
                  <div className="flex gap-2 mt-6">
                    {[1, 5, 10, 20, 30].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeight(w)}
                        className={`flex-1 py-2 font-mono text-sm border transition-all ${
                          weight === w
                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
                            : "border-[var(--border-color)] hover:border-[var(--accent-main)] hover:text-[var(--accent-main)]"
                        }`}
                      >
                        {w}kg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 mb-8">
                <div className="space-y-4 font-mono">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--muted-foreground)]">{t.calculator.weight}</span>
                    <span className="font-semibold">{weight} KG</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--muted-foreground)]">{t.calculator.rate}</span>
                    <span className="font-semibold">${pricePerKg}/KG</span>
                  </div>
                  <div className="h-px bg-[var(--border-color)]" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">{t.calculator.total}</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={total}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-4xl font-heading text-[var(--accent-main)]"
                      >
                        ${total}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-3 text-sm text-[var(--muted-foreground)] font-mono mb-8">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{t.calculator.note}</p>
              </div>

              {/* CTA */}
              <motion.a
                href="#get-address"
                className="inline-flex bg-[var(--accent-main)] text-white font-mono font-bold text-lg px-8 py-5 hard-shadow items-center justify-center gap-3 group focus-ring relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Truck className="w-5 h-5" />
                <span>{t.calculator.ctaButton}</span>
                <ArrowIcon
                  className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Floating decoration */}
        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-[var(--accent-main)]/10 hidden md:block" />
      </motion.div>
    </section>
  )
}
