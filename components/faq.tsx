"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, MessageSquare, ChevronRight, ChevronLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { t, dir } = useI18n()
  const ChevronIcon = dir === "rtl" ? ChevronLeft : ChevronRight

  return (
    <section id="faq" className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left Side - Header */}
        <motion.div
          className={`lg:col-span-2 ${dir === "rtl" ? "lg:order-2" : ""}`}
          initial={{ opacity: 0, x: dir === "rtl" ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="lg:sticky lg:top-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[var(--accent-main)] flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-mono text-sm tracking-widest text-[var(--muted-foreground)] uppercase">
                {t.faq.sectionLabel}
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">{t.faq.title}</h2>

            <p className="font-mono text-[var(--muted-foreground)] leading-relaxed mb-8">
              Find answers to the most common questions about our shipping services.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--surface-card)] border border-[var(--border-color)] p-4">
                <div className="font-heading text-3xl text-[var(--accent-main)]">24/7</div>
                <div className="font-mono text-xs text-[var(--muted-foreground)]">Support Available</div>
              </div>
              <div className="bg-[var(--surface-card)] border border-[var(--border-color)] p-4">
                <div className="font-heading text-3xl text-[var(--accent-secondary)]">&lt;1h</div>
                <div className="font-mono text-xs text-[var(--muted-foreground)]">Response Time</div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="p-6 bg-[var(--text-primary)] text-[var(--bg-primary)]">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-[var(--accent-main)] flex-shrink-0" />
                <div>
                  <p className="font-mono font-bold text-sm mb-1">{t.faq.stillQuestions}</p>
                  <p className="font-mono text-sm opacity-70 mb-4">{t.faq.teamAvailable}</p>
                  <a
                    href="https://wa.me/96171540088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-mono font-bold text-sm px-5 py-2.5 hard-shadow"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.faq.messageUs}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - FAQ Items */}
        <motion.div
          className={`lg:col-span-3 ${dir === "rtl" ? "lg:order-1" : ""}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-4">
            {t.faq.questions.map((faq, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`bg-[var(--surface-card)] border transition-all duration-300 ${
                    openIndex === index
                      ? "border-[var(--accent-main)] shadow-lg"
                      : "border-[var(--border-color)] hover:border-[var(--accent-main)]/50"
                  }`}
                >
                  <button
                    className="w-full p-6 flex items-start gap-4 text-start focus-ring"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {/* Number indicator */}
                    <div
                      className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold flex-shrink-0 transition-colors ${
                        openIndex === index
                          ? "bg-[var(--accent-main)] text-white"
                          : "bg-[var(--bg-primary)] text-[var(--muted-foreground)] group-hover:text-[var(--accent-main)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-mono font-bold text-base pr-8">{faq.question}</h3>
                    </div>

                    <div
                      className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        openIndex === index ? "rotate-180 bg-[var(--accent-main)]" : "bg-[var(--bg-primary)]"
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className={`w-4 h-4 ${openIndex === index ? "text-white" : ""}`} aria-hidden="true" />
                      ) : (
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-6 pb-6 ${dir === "rtl" ? "pr-20" : "pl-20"}`}>
                          <p className="font-mono text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Helpful prompt */}
                          <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center gap-4">
                            <span className="font-mono text-xs text-[var(--muted-foreground)]">Was this helpful?</span>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 font-mono text-xs border border-[var(--border-color)] hover:border-[var(--accent-main)] hover:text-[var(--accent-main)] transition-colors">
                                Yes
                              </button>
                              <button className="px-3 py-1 font-mono text-xs border border-[var(--border-color)] hover:border-[var(--accent-main)] hover:text-[var(--accent-main)] transition-colors">
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
