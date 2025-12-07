import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo_Black, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google"

import { I18nProvider } from "@/lib/i18n/context"
import "./globals.css"

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
  display: "swap",
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nfdexpress.com"),
  title: {
    default: "NFD Express | شحن من دبي الى لبنان - Shein & AliExpress Shipping Lebanon $6.5/kg",
    template: "%s | NFD Express - Dubai to Lebanon Shipping",
  },
  description:
    "Ship Shein, AliExpress, Amazon & Temu orders from Dubai to Lebanon for $6.5/kg. Get your free UAE address, shop from any store worldwide, and receive packages in Beirut within 3-5 days. شحن شي ان الى لبنان - توصيل سريع وموثوق.",
  keywords: [
    // Primary English keywords
    "Dubai to Lebanon shipping",
    "Lebanon shipping service",
    "ship to Lebanon from Dubai",
    "UAE to Lebanon cargo",
    "Beirut shipping service",
    // Shein specific
    "Shein Lebanon",
    "Shein shipping Lebanon",
    "Shein delivery Lebanon",
    "order Shein to Lebanon",
    "Shein شي ان لبنان",
    // AliExpress specific
    "AliExpress Lebanon",
    "AliExpress shipping Lebanon",
    "AliExpress delivery Beirut",
    "order AliExpress to Lebanon",
    // Amazon specific
    "Amazon Lebanon shipping",
    "Amazon UAE to Lebanon",
    "Amazon delivery Lebanon",
    // Temu specific
    "Temu Lebanon",
    "Temu shipping Lebanon",
    // General e-commerce
    "online shopping Lebanon delivery",
    "international shipping Lebanon",
    "package forwarding Lebanon",
    "Dubai address for shopping",
    "UAE warehouse address",
    "shop and ship Lebanon",
    "parcel forwarding Beirut",
    // Arabic keywords
    "شحن من دبي الى لبنان",
    "شحن شي ان لبنان",
    "توصيل طرود لبنان",
    "شحن علي اكسبرس لبنان",
    "شحن امازون لبنان",
    "عنوان دبي للتسوق",
    "شحن سريع لبنان",
    // Location specific
    "shipping to Beirut",
    "shipping to Tripoli Lebanon",
    "shipping to Sidon Lebanon",
    "shipping to Jounieh",
    "توصيل بيروت",
    // Price related
    "cheap shipping Lebanon",
    "affordable shipping Dubai Lebanon",
    "$6.5 per kg shipping",
  ],
  authors: [{ name: "NFD Express", url: "https://nfdexpress.com" }],
  creator: "NFD Express",
  publisher: "NFD Express",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://nfdexpress.com",
    languages: {
      "en-US": "https://nfdexpress.com",
      "ar-LB": "https://nfdexpress.com/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_LB"],
    url: "https://nfdexpress.com",
    siteName: "NFD Express",
    title: "NFD Express | Ship Shein, AliExpress & Amazon to Lebanon - $6.5/kg",
    description:
      "Get your free Dubai address and ship from Shein, AliExpress, Amazon, Temu to Lebanon. Fast 3-5 day delivery to Beirut and all Lebanon. شحن من دبي الى لبنان.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NFD Express - Dubai to Lebanon Shipping Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFD Express | Ship from Dubai to Lebanon - $6.5/kg",
    description:
      "Ship Shein, AliExpress, Amazon orders to Lebanon. Free Dubai address. 3-5 day delivery. No hidden fees.",
    images: ["/og-image.png"],
    creator: "@nfdexpress",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Shipping & Logistics",
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F5" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nfdexpress.com/#organization",
        name: "NFD Express",
        alternateName: ["NFD Express Lebanon", "ان اف دي اكسبرس"],
        url: "https://nfdexpress.com",
        logo: {
          "@type": "ImageObject",
          url: "https://nfdexpress.com/logo.png",
          width: 512,
          height: 512,
        },
        description:
          "Professional shipping service from Dubai to Lebanon. Ship Shein, AliExpress, Amazon and Temu orders for $6.5/kg with 3-5 day delivery.",
        foundingDate: "2020",
        areaServed: [
          { "@type": "Country", name: "Lebanon" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 33.8938,
            longitude: 35.5018,
          },
          geoRadius: "150000",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+971-50-000-0000",
            contactType: "customer service",
            availableLanguage: ["English", "Arabic"],
            areaServed: ["LB", "AE"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+961-00-000-000",
            contactType: "customer service",
            availableLanguage: ["English", "Arabic"],
            areaServed: "LB",
          },
        ],
        sameAs: [
          "https://www.instagram.com/nfdexpress",
          "https://www.facebook.com/nfdexpress",
          "https://wa.me/+971500000000",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://nfdexpress.com/#localbusiness",
        name: "NFD Express Lebanon",
        image: "https://nfdexpress.com/og-image.png",
        priceRange: "$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Beirut",
          addressCountry: "LB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.8938,
          longitude: 35.5018,
        },
        url: "https://nfdexpress.com",
        telephone: "+961-00-000-000",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://nfdexpress.com/#shipping-service",
        name: "Dubai to Lebanon Shipping",
        alternateName: "شحن من دبي الى لبنان",
        description:
          "International shipping service from Dubai, UAE to Lebanon. Ship packages from Shein, AliExpress, Amazon, Temu and any online store.",
        provider: {
          "@id": "https://nfdexpress.com/#organization",
        },
        areaServed: {
          "@type": "Country",
          name: "Lebanon",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Shipping Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Standard Shipping",
                description: "3-5 day delivery from Dubai to Lebanon",
              },
              price: "6.50",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "6.50",
                priceCurrency: "USD",
                unitCode: "KGM",
                unitText: "per kilogram",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://nfdexpress.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I ship Shein orders to Lebanon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sign up for NFD Express to get your free Dubai warehouse address. Use this address when ordering from Shein. We'll receive your packages and ship them to Lebanon for $6.5/kg within 3-5 days.",
            },
          },
          {
            "@type": "Question",
            name: "Can I ship AliExpress orders to Lebanon through NFD Express?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! NFD Express ships all AliExpress orders from our Dubai warehouse to anywhere in Lebanon. Simply use your NFD Express Dubai address at checkout.",
            },
          },
          {
            "@type": "Question",
            name: "What is the shipping cost from Dubai to Lebanon?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our flat rate is $6.5 per kilogram with no hidden fees. This includes full insurance coverage and real-time tracking.",
            },
          },
          {
            "@type": "Question",
            name: "How long does shipping from Dubai to Lebanon take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Standard delivery takes 3-5 business days from Dubai to anywhere in Lebanon, including Beirut, Tripoli, Sidon, and all other cities.",
            },
          },
          {
            "@type": "Question",
            name: "كيف أشحن طلبات شي ان إلى لبنان؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "سجل في NFD Express للحصول على عنوان مستودع دبي المجاني. استخدم هذا العنوان عند الطلب من شي ان. سنستلم طرودك ونشحنها إلى لبنان بسعر 6.5 دولار للكيلو خلال 3-5 أيام.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://nfdexpress.com/#website",
        url: "https://nfdexpress.com",
        name: "NFD Express",
        description: "Dubai to Lebanon shipping service",
        publisher: {
          "@id": "https://nfdexpress.com/#organization",
        },
        inLanguage: ["en-US", "ar-LB"],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://nfdexpress.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://nfdexpress.com",
          },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <JsonLd />
        <meta name="geo.region" content="LB" />
        <meta name="geo.placename" content="Beirut" />
        <meta name="geo.position" content="33.8938;35.5018" />
        <meta name="ICBM" content="33.8938, 35.5018" />
        <meta name="language" content="English, Arabic" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <link rel="alternate" hrefLang="ar-LB" href="https://nfdexpress.com/ar" />
        <link rel="alternate" hrefLang="en" href="https://nfdexpress.com" />
        <link rel="alternate" hrefLang="x-default" href="https://nfdexpress.com" />
      </head>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${ibmPlexArabic.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>{children}</I18nProvider>

      </body>
    </html>
  )
}
