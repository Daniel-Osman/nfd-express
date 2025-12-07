import { Ticker } from "@/components/ticker"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SupportedStores } from "@/components/supported-stores"
import { HowItWorks } from "@/components/how-it-works"
import { BentoGrid } from "@/components/bento-grid"
import { Calculator } from "@/components/calculator"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Ticker />
      <Header />
      <Hero />
      <SupportedStores />
      <HowItWorks />
      <BentoGrid />
      <Calculator />
      <Testimonials />
      <FAQ />
      <CtaSection />
      <Footer />
    </main>
  )
}
