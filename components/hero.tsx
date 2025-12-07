"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Plane, Package, ArrowRight, ArrowLeft, Sparkles, Globe, Zap } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useRef } from "react"

export function Hero() {
  const { t, dir, locale } = useI18n()
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative px-4 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto overflow-hidden"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-[var(--accent-main)]/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-[var(--accent-secondary)]/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        {/* Left Content */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Enhanced Badge with glow */}
          <motion.div
            className="inline-flex items-center gap-3 bg-[var(--surface-card)] border border-[var(--border-color)] px-5 py-2.5 mb-8 relative group"
            initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-[var(--accent-main)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-4 h-4 text-[var(--accent-main)]" aria-hidden="true" />
            <span className="font-mono text-sm font-bold tracking-wider relative" itemProp="provider">
              {t.hero.badge}
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          {/* Main headline with animated underline */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.9] mb-8 tracking-tight">
            <span itemProp="name" className="relative">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                {t.hero.headline}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="relative inline-block">
                  <Plane
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[var(--accent-main)] ${dir === "rtl" ? "rotate-[192deg]" : "-rotate-12"}`}
                    aria-hidden="true"
                  />
                  {/* Animated trail */}
                  <motion.div
                    className={`absolute top-1/2 ${dir === "rtl" ? "right-full" : "left-full"} h-0.5 bg-gradient-to-r from-[var(--accent-main)] to-transparent`}
                    initial={{ width: 0 }}
                    animate={{ width: "3rem" }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  />
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block text-[var(--accent-main)]"
              >
                {t.hero.headlineTo}
              </motion.span>
            </span>
          </h1>

          {/* Subheadline with highlighted price */}
          <motion.p
            className="font-mono text-lg sm:text-xl md:text-2xl mb-4 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            itemProp="description"
          >
            {t.hero.subheadline}{" "}
            <span className="relative inline-block">
              <span className="text-[var(--accent-main)] font-bold text-2xl sm:text-3xl" itemProp="price">
                $6.5{t.hero.perKg}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 bg-[var(--accent-main)]/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              />
            </span>
            . {t.hero.noHiddenFees}{" "}
            <span className="text-[var(--accent-secondary)] font-semibold">{t.hero.coldWater}</span>
          </motion.p>

          <motion.p
            className="font-mono text-base text-[var(--muted-foreground)] mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="/auth/sign-up"
              className="inline-flex bg-[var(--accent-main)] text-white font-mono font-bold text-lg px-8 py-4 hard-shadow items-center justify-center gap-3 group focus-ring relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <ArrowIcon
                className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform relative z-10"
                aria-hidden="true"
              />
              <motion.div
                className="absolute inset-0 bg-[var(--accent-secondary)]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#calculator"
              className="inline-flex bg-transparent border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-mono font-bold text-lg px-8 py-4 items-center justify-center gap-3 group focus-ring hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.calculator?.title || "Calculate Cost"}
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-10 flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)]">
              <Zap className="w-4 h-4 text-[var(--accent-main)]" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)]">
              <Globe className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span>UAE to BEY</span>
            </div>
            <div className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest" aria-hidden="true">
              {t.hero.trackingRef}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual - Enhanced Package Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[var(--accent-main)]"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="bg-[var(--surface-card)] border-2 border-[var(--border-color)] p-6 sm:p-8 relative shadow-2xl">
            {/* Corner Accents */}
            <div
              className={`absolute top-0 ${dir === "rtl" ? "left-0" : "right-0"} w-20 h-5 hazard-stripes`}
              aria-hidden="true"
            />
            <div
              className={`absolute bottom-0 ${dir === "rtl" ? "right-0" : "left-0"} w-20 h-5 hazard-stripes`}
              aria-hidden="true"
            />

            {/* Package Visual */}
            <div className="aspect-square bg-gradient-to-br from-[var(--bg-primary)] to-[var(--surface-card)] border border-[var(--border-color)] flex items-center justify-center relative overflow-hidden">
              {/* Animated grid overlay */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #09090B 1px, transparent 1px), linear-gradient(to bottom, #09090B 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbit path */}
                <motion.div
                  className="absolute w-[75%] h-[75%] border-2 border-dashed border-[var(--accent-main)]/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                <motion.div
                  className="absolute w-[75%] h-[75%]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {/* Shein Package */}
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="relative w-12 h-10 sm:w-14 sm:h-12" style={{ perspective: "200px" }}>
                      {/* Box front */}
                      <div className="absolute inset-0 bg-[#1a1a1a] border border-[#333] shadow-lg flex items-center justify-center">
                        <span className="font-bold text-[8px] sm:text-[10px] text-white tracking-wide">SHEIN</span>
                      </div>
                      {/* Box top */}
                      <div
                        className="absolute -top-2 left-0 right-0 h-2 bg-[#2a2a2a] border border-[#333] origin-bottom"
                        style={{ transform: "rotateX(-60deg)" }}
                      />
                      {/* Box side */}
                      <div className="absolute top-0 -right-1.5 bottom-0 w-1.5 bg-[#0f0f0f] border-r border-t border-b border-[#333]" />
                    </div>
                  </motion.div>

                  {/* AliExpress Package */}
                  <motion.div
                    className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="relative w-12 h-10 sm:w-14 sm:h-12" style={{ perspective: "200px" }}>
                      {/* Box front */}
                      <div className="absolute inset-0 bg-[#FF6A00] border border-[#cc5500] shadow-lg flex items-center justify-center">
                        <span className="font-bold text-[6px] sm:text-[8px] text-white text-center leading-tight">
                          Ali
                          <br />
                          Express
                        </span>
                      </div>
                      {/* Box top */}
                      <div
                        className="absolute -top-2 left-0 right-0 h-2 bg-[#ff8533] border border-[#cc5500] origin-bottom"
                        style={{ transform: "rotateX(-60deg)" }}
                      />
                      {/* Box side */}
                      <div className="absolute top-0 -right-1.5 bottom-0 w-1.5 bg-[#cc5500] border-r border-t border-b border-[#994400]" />
                    </div>
                  </motion.div>

                  {/* Temu Package */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="relative w-12 h-10 sm:w-14 sm:h-12" style={{ perspective: "200px" }}>
                      {/* Box front */}
                      <div className="absolute inset-0 bg-[#F97316] border border-[#c75e11] shadow-lg flex items-center justify-center">
                        <span className="font-bold text-[8px] sm:text-[10px] text-white">TEMU</span>
                      </div>
                      {/* Box top */}
                      <div
                        className="absolute -top-2 left-0 right-0 h-2 bg-[#fb923c] border border-[#c75e11] origin-bottom"
                        style={{ transform: "rotateX(-60deg)" }}
                      />
                      {/* Box side */}
                      <div className="absolute top-0 -right-1.5 bottom-0 w-1.5 bg-[#c75e11] border-r border-t border-b border-[#9a4a0d]" />
                    </div>
                  </motion.div>

                  {/* Amazon Package */}
                  <motion.div
                    className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <div className="relative w-12 h-10 sm:w-14 sm:h-12" style={{ perspective: "200px" }}>
                      {/* Box front - Amazon brown cardboard style */}
                      <div className="absolute inset-0 bg-[#c9a962] border border-[#a68b4a] shadow-lg flex items-center justify-center">
                        <span className="font-bold text-[7px] sm:text-[9px] text-[#232f3e]">amazon</span>
                      </div>
                      {/* Box top */}
                      <div
                        className="absolute -top-2 left-0 right-0 h-2 bg-[#d4b876] border border-[#a68b4a] origin-bottom"
                        style={{ transform: "rotateX(-60deg)" }}
                      />
                      {/* Box side */}
                      <div className="absolute top-0 -right-1.5 bottom-0 w-1.5 bg-[#a68b4a] border-r border-t border-b border-[#8a7340]" />
                      {/* Tape stripe */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#232f3e]/30 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ perspective: "500px" }}
              >
                <div
                  className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48"
                  style={{ transformStyle: "preserve-3d", transform: "rotateX(-5deg) rotateY(-10deg)" }}
                >
                  {/* Box front face */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513] to-[#6B3410] border-2 border-[#5a2d0d] shadow-2xl flex flex-col items-center justify-center">
                    {/* Tape stripe vertical */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 bg-[#d4a574]/40" />
                    {/* Tape stripe horizontal */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 sm:h-8 bg-[#d4a574]/40" />

                    {/* NFD Label */}
                    <div className="relative z-10 bg-white p-2 sm:p-3 shadow-md border border-gray-200">
                      <div className="bg-[var(--accent-main)] px-3 py-1 sm:px-4 sm:py-2 text-center">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto mb-0.5" aria-hidden="true" />
                        <div className="font-heading text-white text-sm sm:text-base md:text-lg font-bold tracking-tight">
                          NFD
                        </div>
                        <div className="font-mono text-white/90 text-[6px] sm:text-[8px] tracking-widest">EXPRESS</div>
                      </div>
                      {/* Barcode */}
                      <div className="mt-1 sm:mt-2 flex justify-center gap-[1px]">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-[1px] sm:w-[2px] bg-black ${i % 3 === 0 ? "h-2 sm:h-3" : "h-3 sm:h-4"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Box top face */}
                  <div
                    className="absolute -top-6 sm:-top-8 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-[#a0522d] to-[#8B4513] border-2 border-[#5a2d0d] border-b-0 origin-bottom"
                    style={{ transform: "rotateX(-60deg)" }}
                  >
                    {/* Top tape */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 sm:h-3 bg-[#d4a574]/50 mx-4" />
                  </div>

                  {/* Box right side face */}
                  <div className="absolute top-0 bottom-0 -right-4 sm:-right-6 w-4 sm:w-6 bg-gradient-to-r from-[#6B3410] to-[#5a2d0d] border-2 border-[#4a240a] border-l-0" />

                  {/* Box shadow on ground */}
                  <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 blur-md -z-10" />
                </div>
              </motion.div>
            </div>

            {/* Floating stat card */}
            <motion.div
              className={`absolute -bottom-6 ${dir === "rtl" ? "-left-6" : "-right-6"} bg-[var(--text-primary)] text-[var(--bg-primary)] p-4 shadow-2xl hidden sm:block`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="font-heading text-3xl text-[var(--accent-main)]">5K+</div>
              <div className="font-mono text-xs opacity-70">Packages Delivered</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
