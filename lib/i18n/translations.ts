export type Locale = "en" | "ar"

export const translations = {
  en: {
    // Header
    nav: {
      howItWorks: "How It Works",
      services: "Services",
      calculator: "Calculator",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
      getAddress: "GET ADDRESS",
      getDubaiAddress: "GET DUBAI ADDRESS",
    },

    // Ticker
    ticker: {
      text: "NEXT FLIGHT: TUESDAY /// DUBAI TO BEIRUT /// $6.5 FLAT RATE /// SHEIN LEBANON /// ALIEXPRESS SHIPPING /// TRACK IN REAL-TIME /// NO HIDDEN FEES /// ",
    },

    // Hero
    hero: {
      badge: "NFD EXPRESS",
      headline: "DUBAI",
      headlineTo: "LEBANON.",
      subheadline: "Ship for",
      perKg: "/kg",
      noHiddenFees: "No Hidden Fees.",
      coldWater: "Put your hands in cold water.",
      description:
        "Get your free Dubai address. Shop from Shein, AliExpress, Amazon, Temu & more. Delivered to Beirut in 3-5 days.",
      cta: "Get Dubai Address",
      trackingRef: "REF: NFD-2025-DXB-BEY-001",
      maxWeight: "MAX 30KG",
      route: "DXB → BEY",
      accepting: "ACCEPTING SHIPMENTS",
      estDays: "EST. 3-5 DAYS",
    },

    // Supported Stores
    stores: {
      title: "POPULAR STORES WE SHIP FROM",
      subtitle: "SHOP FROM ANY STORE WORLDWIDE",
      bottomNote: "+ thousands more stores that ship to UAE",
    },

    // How It Works
    howItWorks: {
      sectionLabel: "SIMPLE PROCESS",
      title: "HOW IT WORKS.",
      bottomNote: "Start shipping in",
      underMinutes: "under 5 minutes",
      noCreditCard: ". No credit card required.",
      steps: [
        {
          number: "01",
          title: "SIGN UP FREE",
          description:
            "Create your account and get your personal Dubai warehouse address instantly. No fees, no commitments.",
        },
        {
          number: "02",
          title: "SHOP ONLINE",
          description: "Order from Shein, AliExpress, Amazon, Temu, or any store. Use your Dubai address at checkout.",
        },
        {
          number: "03",
          title: "WE RECEIVE",
          description: "Your packages arrive at our Dubai warehouse. We consolidate and prepare them for shipping.",
        },
        {
          number: "04",
          title: "DELIVERED",
          description: "Your packages arrive in Lebanon within 3-5 days. Track every step of the journey.",
        },
      ],
    },

    // Bento Grid / Services
    services: {
      sectionLabel: "WHY NFD EXPRESS",
      title: "SERVICES.",
      box1: {
        title: "SHEIN & ALIEXPRESS SPECIALISTS",
        description:
          "We handle all your online shopping orders with expert care. Ship from Shein, AliExpress, Amazon, Temu, Noon, and any store worldwide directly to Lebanon.",
      },
      box2: {
        title: "REAL-TIME TRACKING",
        steps: ["PICKED UP", "IN TRANSIT", "CUSTOMS", "DELIVERED"],
      },
      box3: {
        title: "WHATSAPP SUPPORT",
        subtitle: "24/7 Direct Line",
        cta: "MESSAGE US",
      },
      box4: {
        title: "3-5 DAYS",
        description: "Express delivery from Dubai to anywhere in Lebanon.",
        subtext: "Beirut, Tripoli, Sidon, Jounieh, Zahle & all Lebanon",
      },
      box5: {
        title: "INSURED",
        description: "Full insurance coverage on all shipments. Your Shein & AliExpress orders protected.",
      },
    },

    // Calculator
    calculator: {
      headerTitle: "SHIPPING CALCULATOR",
      title: "HOW MUCH?",
      description: "Calculate your Shein, AliExpress & Amazon shipping cost to Lebanon.",
      weight: "WEIGHT",
      rate: "RATE (Dubai → Lebanon)",
      total: "TOTAL",
      note: "* Final price. No hidden fees. Includes insurance & tracking.",
      ctaText: "Ready to ship your Shein & AliExpress orders?",
      ctaButton: "START SHIPPING",
    },

    // Testimonials
    testimonials: {
      sectionLabel: "WHAT PEOPLE SAY",
      title: "TESTIMONIALS.",
      stats: {
        packages: { value: "5000+", label: "PACKAGES SHIPPED" },
        onTime: { value: "99%", label: "ON-TIME DELIVERY" },
        rating: { value: "4.9", label: "CUSTOMER RATING" },
        experience: { value: "3+", label: "YEARS EXPERIENCE" },
      },
      reviews: [
        {
          name: "Sarah M.",
          location: "Beirut",
          message: "Shipped my Shein haul and it arrived in 4 days! Best service to Lebanon. Amazing!",
          time: "2:34 PM",
        },
        {
          name: "Ahmad K.",
          location: "Tripoli",
          message:
            "I order from AliExpress every month. NFD Express has the best rates from Dubai to Lebanon. No hidden fees like other companies. Highly recommend!",
          time: "Yesterday",
        },
        {
          name: "Maya R.",
          location: "Jounieh",
          message:
            "The tracking is so detailed. I knew exactly where my Amazon order was at all times. Professional service from Dubai to Jounieh in 3 days!",
          time: "3 days ago",
        },
        {
          name: "Rami H.",
          location: "Sidon",
          message:
            "Finally found a reliable company for Temu orders! $6.5/kg is unbeatable. My packages always arrive safely to Sidon.",
          time: "1 week ago",
        },
      ],
    },

    // FAQ
    faq: {
      sectionLabel: "COMMON QUESTIONS",
      title: "FAQ.",
      stillQuestions: "Still have questions?",
      teamAvailable: "Our team is available 24/7 on WhatsApp",
      messageUs: "MESSAGE US",
      questions: [
        {
          question: "How do I ship Shein orders to Lebanon?",
          answer:
            "Sign up for NFD Express to get your free Dubai warehouse address. When shopping on Shein, use this address at checkout. Once your order arrives at our warehouse, we'll ship it to Lebanon for $6.5/kg within 3-5 days.",
        },
        {
          question: "Can I ship AliExpress orders to Lebanon?",
          answer:
            "Yes! NFD Express ships all AliExpress orders from our Dubai warehouse to anywhere in Lebanon. Simply select your NFD Express Dubai address during checkout on AliExpress.",
        },
        {
          question: "What is the shipping cost from Dubai to Lebanon?",
          answer:
            "Our flat rate is $6.5 per kilogram with no hidden fees. This includes full insurance coverage, real-time tracking, and delivery to any location in Lebanon including Beirut, Tripoli, Sidon, and all other cities.",
        },
        {
          question: "How long does shipping from Dubai to Lebanon take?",
          answer:
            "Standard delivery takes 3-5 business days from our Dubai warehouse to anywhere in Lebanon. We ship on regular flight schedules, typically every Tuesday.",
        },
        {
          question: "Can I ship Amazon UAE orders to Lebanon?",
          answer:
            "You can ship from Amazon UAE, Amazon.com, or any Amazon marketplace. Use your NFD Express Dubai address and we'll handle the rest.",
        },
        {
          question: "What stores can I shop from?",
          answer:
            "You can shop from any online store that ships to the UAE! This includes Shein, AliExpress, Amazon, Temu, Noon, Namshi, Farfetch, ASOS, H&M, Zara, Nike, and thousands more.",
        },
        {
          question: "Is there a minimum weight or order limit?",
          answer:
            "No minimum order! You can ship packages starting from just 1kg. Maximum weight per package is 30kg. For heavier items, contact our support team.",
        },
        {
          question: "How do I track my package?",
          answer:
            "Once your package leaves our Dubai warehouse, you'll receive a tracking number via WhatsApp and email. You can track your shipment in real-time through our website or by messaging our support team.",
        },
      ],
    },

    // CTA Section
    cta: {
      label: "START TODAY",
      title: "GET YOUR",
      titleHighlight: "DUBAI",
      titleEnd: "ADDRESS",
      description:
        "Sign up now and receive your personal Dubai warehouse address. Start shipping Shein, AliExpress, Amazon orders to Lebanon within minutes.",
      benefits: ["Free Dubai Address", "No Monthly Fees", "Track All Packages", "Arabic Support"],
      button: "GET STARTED FREE",
      noCreditCard: "No credit card required",
    },

    // Footer
    footer: {
      description:
        "Your trusted partner for shipping from Dubai to Lebanon. Ship Shein, AliExpress, Amazon, Temu & more for $6.5/kg. Fast, reliable, transparent.",
      deliveryAreas: "Delivery Areas:",
      areas: "Beirut, Tripoli, Sidon, Jounieh, Zahle, Batroun, Byblos, Tyre & all Lebanon",
      weShipFrom: "WE SHIP FROM",
      contact: "CONTACT",
      lebanon: "Lebanon",
      copyright: "© 2025 NFD EXPRESS. ALL RIGHTS RESERVED.",
      seoText: "Dubai to Lebanon Shipping | Shein Lebanon | AliExpress Lebanon",
    },
  },

  ar: {
    // Header
    nav: {
      howItWorks: "كيف بتشتغل",
      services: "خدماتنا",
      calculator: "احسب الكلفة",
      reviews: "شو قالوا عنّا",
      faq: "أسئلة متكررة",
      contact: "تواصل معنا",
      getAddress: "خود عنوانك",
      getDubaiAddress: "خود عنوان دبي",
    },

    // Ticker
    ticker: {
      text: "الرحلة الجاية: يوم التلات /// دبي ع بيروت /// $6.5 سعر ثابت /// شي ان لبنان /// شحن علي اكسبرس /// تتبّع لحظة بلحظة /// ما في رسوم مخفية /// ",
    },

    // Hero
    hero: {
      badge: "NFD EXPRESS",
      headline: "دبي",
      headlineTo: "لبنان.",
      subheadline: "الشحنة بـ",
      perKg: "/كلغ",
      noHiddenFees: "بلا رسوم مخفية.",
      coldWater: "حط إيدك بمي باردة.",
      description:
        "خود عنوانك المجاني بدبي. تسوّق من شي ان، علي اكسبرس، أمازون، تيمو وغيرن. التوصيل لعندك ببيروت بـ 3-5 أيام.",
      cta: "خود عنوان دبي",
      trackingRef: "REF: NFD-2025-DXB-BEY-001",
      maxWeight: "أقصى حد 30 كلغ",
      route: "دبي ← بيروت",
      accepting: "عم نستقبل شحنات",
      estDays: "3-5 أيام",
    },

    // Supported Stores
    stores: {
      title: "أهم المتاجر يلّي منشحن منها",
      subtitle: "تسوّق من أي محل بالعالم",
      bottomNote: "+ آلاف المحلات التانية يلّي بتشحن عالإمارات",
    },

    // How It Works
    howItWorks: {
      sectionLabel: "خطوات بسيطة",
      title: "كيف بتشتغل.",
      bottomNote: "ابدأ الشحن بـ",
      underMinutes: "أقل من 5 دقايق",
      noCreditCard: ". ما في حاجة لكرت بنك.",
      steps: [
        {
          number: "01",
          title: "سجّل ببلاش",
          description: "افتح حساب وخود عنوان مستودعك بدبي فوراً. بلا رسوم، بلا التزام.",
        },
        {
          number: "02",
          title: "تسوّق أونلاين",
          description: "اطلب من شي ان، علي اكسبرس، أمازون، تيمو أو أي محل. حط عنوان دبي وقت الدفع.",
        },
        {
          number: "03",
          title: "منستلم طلبك",
          description: "بتوصل طرودك عمستودعنا بدبي. منجمّعها ومنحضّرها للشحن.",
        },
        {
          number: "04",
          title: "بتوصلك لبابك",
          description: "بتوصل طرودك للبنان بـ 3-5 أيام. تتبّع كل خطوة بالرحلة.",
        },
      ],
    },

    // Bento Grid / Services
    services: {
      sectionLabel: "ليش NFD EXPRESS",
      title: "خدماتنا.",
      box1: {
        title: "متخصصين بشي ان وعلي اكسبرس",
        description:
          "منتعامل مع كل طلباتك أونلاين بعناية. اشحن من شي ان، علي اكسبرس، أمازون، تيمو، نون، وأي محل بالعالم مباشرة عالبنان.",
      },
      box2: {
        title: "تتبّع لحظة بلحظة",
        steps: ["تم الاستلام", "عالطريق", "بالجمرك", "وصلت"],
      },
      box3: {
        title: "دعم واتساب",
        subtitle: "متواجدين 24/7",
        cta: "راسلنا",
      },
      box4: {
        title: "3-5 أيام",
        description: "توصيل سريع من دبي لأي منطقة بلبنان.",
        subtext: "بيروت، طرابلس، صيدا، جونية، زحلة وكل لبنان",
      },
      box5: {
        title: "مأمّن",
        description: "تأمين كامل على كل الشحنات. طلباتك من شي ان وعلي اكسبرس محمية.",
      },
    },

    // Calculator
    calculator: {
      headerTitle: "حاسبة الشحن",
      title: "قدّيش بتكلّف؟",
      description: "احسب كلفة شحن طلباتك من شي ان وعلي اكسبرس وأمازون عالبنان.",
      weight: "الوزن",
      rate: "السعر (دبي ← لبنان)",
      total: "المجموع",
      note: "* السعر النهائي. ما في رسوم مخفية. مع التأمين والتتبّع.",
      ctaText: "جاهز تشحن طلباتك من شي ان وعلي اكسبرس؟",
      ctaButton: "ابدأ الشحن",
    },

    // Testimonials
    testimonials: {
      sectionLabel: "شو قالوا عنّا",
      title: "آراء الزباين.",
      stats: {
        packages: { value: "5000+", label: "طرد تم شحنو" },
        onTime: { value: "99%", label: "توصيل بوقتو" },
        rating: { value: "4.9", label: "تقييم الزباين" },
        experience: { value: "3+", label: "سنين خبرة" },
      },
      reviews: [
        {
          name: "سارة م.",
          location: "بيروت",
          message: "شحنت طلبيتي من شي ان ووصلت بـ 4 أيام! أحسن خدمة عالبنان. روعة!",
          time: "2:34 PM",
        },
        {
          name: "أحمد ك.",
          location: "طرابلس",
          message:
            "بطلب من علي اكسبرس كل شهر. NFD Express عندن أحسن أسعار من دبي عالبنان. ما في رسوم مخفية متل الشركات التانية. كتير منصحكن فيها!",
          time: "مبارح",
        },
        {
          name: "مايا ر.",
          location: "جونية",
          message: "التتبّع مفصّل كتير. عرفت وين طلبيتي من أمازون بالضبط بكل لحظة. خدمة محترفة من دبي لجونية بـ 3 أيام!",
          time: "من 3 أيام",
        },
        {
          name: "رامي ح.",
          location: "صيدا",
          message: "أخيراً لقيت شركة موثوقة لطلبات تيمو! $6.5 للكيلو سعر ما إلو منافس. طرودي دايماً بتوصل بأمان لصيدا.",
          time: "من أسبوع",
        },
      ],
    },

    // FAQ
    faq: {
      sectionLabel: "أسئلة متكررة",
      title: "أسئلة شائعة.",
      stillQuestions: "عندك سؤال تاني؟",
      teamAvailable: "فريقنا موجود 24/7 عالواتساب",
      messageUs: "راسلنا",
      questions: [
        {
          question: "كيف بشحن طلبات شي ان عالبنان؟",
          answer:
            "سجّل بـ NFD Express وخود عنوان مستودعك بدبي ببلاش. لمّا تتسوق من شي ان، حط هالعنوان وقت الدفع. بس يوصل طلبك عمستودعنا، منشحنلك ياه عالبنان بـ $6.5/كلغ خلال 3-5 أيام.",
        },
        {
          question: "فيني شحن طلبات علي اكسبرس عالبنان؟",
          answer:
            "أكيد! NFD Express بتشحن كل طلبات علي اكسبرس من مستودعنا بدبي لأي منطقة بلبنان. بس اختار عنوان NFD Express دبي وقت الدفع بعلي اكسبرس.",
        },
        {
          question: "قدّيش كلفة الشحن من دبي عالبنان؟",
          answer:
            "سعرنا الثابت $6.5 للكيلو من دون رسوم مخفية. هالسعر بيشمل تأمين كامل، تتبّع لحظة بلحظة، وتوصيل لأي منطقة بلبنان يعني بيروت، طرابلس، صيدا، وكل المناطق التانية.",
        },
        {
          question: "قدّيش بياخد وقت الشحن من دبي عالبنان؟",
          answer:
            "التوصيل العادي بياخد 3-5 أيام شغل من مستودعنا بدبي لأي منطقة بلبنان. منشحن حسب جدول رحلات ثابت، عادةً كل نهار تلات.",
        },
        {
          question: "فيني شحن طلبات أمازون الإمارات عالبنان؟",
          answer:
            "فيك تشحن من أمازون الإمارات، Amazon.com، أو أي أمازون تاني. استخدم عنوان NFD Express دبي ونحنا منكمّل الباقي.",
        },
        {
          question: "من أي محلات فيني أتسوّق؟",
          answer:
            "فيك تتسوّق من أي محل أونلاين بيشحن عالإمارات! يعني شي ان، علي اكسبرس، أمازون، تيمو، نون، نمشي، فارفيتش، أسوس، H&M، زارا، نايكي، وآلاف المحلات التانية.",
        },
        {
          question: "في حد أدنى للوزن أو للطلبات؟",
          answer:
            "ما في حد أدنى! فيك تشحن طرود من كيلو واحد. الحد الأقصى للوزن لكل طرد 30 كلغ. للأغراض الأتقل، تواصل مع فريق الدعم.",
        },
        {
          question: "كيف بتتبّع طردي؟",
          answer:
            "بس يطلع طردك من مستودعنا بدبي، بتوصلك رقم تتبّع عالواتساب والإيميل. فيك تتتبّع شحنتك لحظة بلحظة من موقعنا أو براسل فريق الدعم.",
        },
      ],
    },

    // CTA Section
    cta: {
      label: "ابدأ اليوم",
      title: "خود عنوان",
      titleHighlight: "دبي",
      titleEnd: "الخاص فيك",
      description: "سجّل هلّق وخود عنوان مستودعك الخاص بدبي. ابدأ شحن طلبات شي ان وعلي اكسبرس وأمازون عالبنان بدقايق.",
      benefits: ["عنوان دبي ببلاش", "بلا رسوم شهرية", "تتبّع كل الطرود", "دعم بالعربي"],
      button: "ابدأ ببلاش",
      noCreditCard: "ما في حاجة لكرت بنك",
    },

    // Footer
    footer: {
      description:
        "شريكك الموثوق للشحن من دبي عالبنان. اشحن من شي ان، علي اكسبرس، أمازون، تيمو وغيرن بـ $6.5/كلغ. سريع، موثوق، شفاف.",
      deliveryAreas: "مناطق التوصيل:",
      areas: "بيروت، طرابلس، صيدا، جونية، زحلة، البترون، جبيل، صور وكل لبنان",
      weShipFrom: "منشحن من",
      contact: "تواصل معنا",
      lebanon: "لبنان",
      copyright: "© 2025 NFD EXPRESS. كل الحقوق محفوظة.",
      seoText: "شحن من دبي عالبنان | شي ان لبنان | علي اكسبرس لبنان",
    },
  },
} as const

export type TranslationKeys = typeof translations.en
