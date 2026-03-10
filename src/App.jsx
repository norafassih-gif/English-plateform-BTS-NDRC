import { useState, useEffect, useRef } from "react";

// ─── LUCIDE ICONS (inline SVG) ────────────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", sw = 1.75, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);
const Icons = {
  play:     "M5 3l14 9-14 9V3z",
  book:     ["M4 19.5A2.5 2.5 0 016.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
  pen:      "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  link:     ["M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71","M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"],
  brain:    ["M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.07-4.73A3 3 0 015 11c0-.53.14-1.02.38-1.46A2.5 2.5 0 015 8a2.5 2.5 0 012.5-2.5","M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.07-4.73A3 3 0 0019 11c0-.53-.14-1.02-.38-1.46A2.5 2.5 0 0019 8a2.5 2.5 0 00-2.5-2.5"],
  check:    "M20 6L9 17l-5-5",
  lock:     ["M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z","M7 11V7a5 5 0 0110 0v4"],
  chevron:  "M9 18l6-6-6-6",
  arrow:    "M5 12h14M12 5l7 7-7 7",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  clock:    ["M12 22a10 10 0 100-20 10 10 0 000 20z","M12 6v6l4 2"],
  user:     ["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"],
  target:   ["M22 12A10 10 0 1112 2","M22 12a10 10 0 01-10 10","M15 12a3 3 0 11-6 0 3 3 0 016 0","M22 12h-4","M6 12H2","M12 6V2","M12 22v-4"],
  bar:      ["M18 20V10","M12 20V4","M6 20v-6"],
  flag:     ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z","M4 22v-7"],
  back:     "M19 12H5M12 19l-7-7 7-7",
  video:    ["M23 7l-7 5 7 5V7z","M1 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"],
  globe:    ["M12 22a10 10 0 100-20 10 10 0 000 20z","M2 12h20","M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"],
  award:    ["M8.21 13.89L7 23l5-3 5 3-1.21-9.12","M12 15a7 7 0 100-14 7 7 0 000 14z"],
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MODULES_DATA = {
  negotiation: {
    id: "negotiation", title: "Commercial Negotiation", subtitle: "Maîtriser l'art de négocier en anglais",
    accent: "#3B6FE8", accentLight: "#EEF2FF", iconKey: "target", badge: "Négociation", estimatedTime: 120,
    videos: [
      {
        id: "v1", title: "Negotiating – English at Work #30", source: "BBC Learning English",
        ytId: "-HZrTUNJKCs", duration: "~5 min",
        tip: "Regardez comment Anna négocie avec un client. Notez les expressions utilisées pour faire et refuser une offre.",
        questions: [
          { q: "What is Anna trying to do in this episode?", opts: ["Resign from her job", "Negotiate a deal with a customer", "Organise a meeting", "Write a report"], ans: 1 },
          { q: "Which phrase is used to make an offer politely?", opts: ["Take it or leave it.", "What if we offered you…?", "We refuse to negotiate.", "That's impossible."], ans: 1 },
          { q: "What does 'to seal the deal' mean?", opts: ["Annuler un accord", "Finaliser et conclure un accord", "Ouvrir une négociation", "Reporter une réunion"], ans: 1 },
        ]
      },
      {
        id: "v2", title: "Negotiating a Deal – English at Work #32", source: "BBC Learning English",
        ytId: "o9KEaQCWqDg", duration: "~5 min",
        tip: "Observez comment Anna obtient le meilleur accord possible. Notez les expressions de compromis.",
        questions: [
          { q: "What does Anna need to do in this episode?", opts: ["Cancel a contract", "Get the best deal for her company", "Fire an employee", "Write a proposal"], ans: 1 },
          { q: "Which phrase shows you are willing to compromise?", opts: ["Absolutely not.", "We could meet you halfway on that.", "That's non-negotiable.", "I don't care."], ans: 1 },
          { q: "What is a 'deal-breaker'?", opts: ["Une condition acceptable", "Une condition qui empêche l'accord", "Une réduction de prix", "Un délai de livraison"], ans: 1 },
        ]
      },
    ],
    reading: {
      title: "A Difficult Negotiation Between Two Companies",
      text: `GlobalTech, a French software company, is negotiating a new contract with RetailMax, a major UK retail chain. The two companies have been working together for three years, but RetailMax has recently found a cheaper competitor.\n\nDuring the meeting, RetailMax's purchasing manager, James Harper, opens by saying: "We value our relationship with GlobalTech, but frankly, your prices are no longer competitive. Our new supplier is offering a 25% lower rate for the same services."\n\nSophie Martin, GlobalTech's account manager, responds calmly: "I understand your concerns, James. However, I'd like to point out that over the past three years, our software has helped you reduce customer service costs by 18%, and our uptime is 99.9% — something our competitor cannot guarantee."\n\nJames replies: "That's true, but our board is putting pressure on us to cut costs. We need at least a 15% reduction."\n\nSophie says: "We can offer a 10% reduction if you agree to a three-year contract renewal. In addition, we'll include premium support and a free system upgrade worth €5,000."\n\nAfter a short break, James accepts: "Alright, 10% plus the upgrade works for us. Let's get the legal team to draw up the new terms."\n\nBoth sides leave the meeting satisfied — a classic win-win outcome.`,
      instructions: "Rédigez un compte rendu en français de ce document (150 à 200 mots). Présentez le contexte, les positions des deux parties, les arguments échangés et l'issue de la négociation. Adoptez un style neutre et professionnel.",
      wordMin: 150, wordMax: 200,
      keyPoints: ["Contexte : entreprises et enjeux", "Position de RetailMax (–25%)", "Arguments de GlobalTech (ROI, uptime)", "Contre-proposition : –10% + upgrade", "Issue : accord win-win"],
    },
    quiz: [
      { q: "What does 'to close a deal' mean?", opts: ["Annuler un accord", "Conclure un accord", "Reporter une réunion", "Ouvrir un débat"], ans: 1 },
      { q: "How do you say 'marge de négociation' in English?", opts: ["Profit margin", "Wiggle room", "Budget limit", "Price range"], ans: 1 },
      { q: "Which phrase expresses a polite refusal?", opts: ["No way.", "I'm afraid we can't go below that figure.", "Whatever.", "That's your problem."], ans: 1 },
      { q: "A 'win-win outcome' means:", opts: ["Un accord défavorable", "Un accord bénéfique pour les deux parties", "Une négociation ratée", "Un compromis forcé"], ans: 1 },
      { q: "What does 'to make concessions' mean?", opts: ["Refuser de négocier", "Faire des concessions", "Augmenter le prix", "Rompre le contrat"], ans: 1 },
      { q: "Which sentence is used to buy time?", opts: ["I agree.", "Let me get back to you on that.", "Absolutely not.", "Sign here."], ans: 1 },
      { q: "What is a 'binding contract'?", opts: ["Un contrat annulable", "Un contrat juridiquement contraignant", "Un devis", "Une lettre d'intention"], ans: 1 },
      { q: "'The deal fell through' means:", opts: ["L'accord a été signé", "L'accord a échoué", "Les négociations reprennent", "Une réduction a été accordée"], ans: 1 },
    ],
    fill: [
      { sentence: "We'd like to ___ a long-term partnership with your company.", blank: "establish", opts: ["establish", "cancel", "ignore", "refuse"] },
      { sentence: "Could you give us a ___ on bulk orders?", blank: "discount", opts: ["increase", "discount", "penalty", "delay"] },
      { sentence: "Let's ___ the terms before signing the contract.", blank: "review", opts: ["forget", "review", "avoid", "hide"] },
      { sentence: "We are prepared to ___ on the delivery deadline.", blank: "negotiate", opts: ["insist", "negotiate", "demand", "ignore"] },
      { sentence: "I'm afraid that price is ___ our budget.", blank: "beyond", opts: ["within", "beyond", "under", "near"] },
      { sentence: "We need to reach a ___ that works for both sides.", blank: "compromise", opts: ["conflict", "compromise", "deadline", "profit"] },
    ],
    matching: [
      { en: "To haggle", fr: "Marchander" }, { en: "Binding contract", fr: "Contrat contraignant" },
      { en: "Win-win situation", fr: "Situation gagnant-gagnant" }, { en: "Make concessions", fr: "Faire des concessions" },
      { en: "Best and final offer", fr: "Offre finale irrévocable" }, { en: "Reach a stalemate", fr: "Être dans l'impasse" },
      { en: "Payment terms", fr: "Conditions de paiement" }, { en: "Counter-offer", fr: "Contre-offre" },
    ],
  },
  customer: {
    id: "customer", title: "Customer Relations", subtitle: "Gérer et fidéliser les clients en anglais",
    accent: "#059669", accentLight: "#ECFDF5", iconKey: "user", badge: "Relation Client", estimatedTime: 120,
    videos: [
      {
        id: "v1", title: "Dealing with Complaints – English at Work", source: "BBC Learning English",
        ytId: "X7nDkvYSbfs", duration: "~5 min",
        tip: "Regardez comment gérer un client mécontent. Notez les expressions pour s'excuser et proposer une solution.",
        questions: [
          { q: "What is the best first reaction when a customer complains?", opts: ["Argue back immediately", "Listen carefully and apologise", "Transfer the call", "Hang up"], ans: 1 },
          { q: "Which phrase is used to apologise professionally?", opts: ["It's not my fault.", "I'm really sorry to hear that.", "Call back later.", "That's your problem."], ans: 1 },
          { q: "What should you always do after solving a complaint?", opts: ["Forget about it", "Follow up to check the customer is satisfied", "Send an invoice", "Transfer to another department"], ans: 1 },
        ]
      },
      {
        id: "v2", title: "Good Customer Relations – English at Work #38", source: "BBC Learning English",
        ytId: "cJWe8BQcldI", duration: "~5 min",
        tip: "Observez les techniques utilisées pour garder les clients satisfaits et fidèles.",
        questions: [
          { q: "What is the main goal of good customer relations?", opts: ["Sell more products immediately", "Keep customers happy and loyal", "Reduce staff costs", "Avoid all complaints"], ans: 1 },
          { q: "Which phrase shows you value the customer?", opts: ["We're very busy right now.", "Your satisfaction is our priority.", "Read the manual.", "That's company policy."], ans: 1 },
          { q: "What does 'to retain a customer' mean?", opts: ["Trouver un nouveau client", "Garder un client existant", "Former un employé", "Annuler une commande"], ans: 1 },
        ]
      },
    ],
    reading: {
      title: "Turning a Complaint into an Opportunity",
      text: `CasaHome, a French online furniture retailer, received an angry email from a loyal customer, Mrs. Patricia Owen, who had been shopping with them for five years.\n\nMrs. Owen wrote: "I am extremely disappointed. I ordered a dining table six weeks ago, and it still hasn't arrived. Your customer service team has been completely unhelpful — I was told three different delivery dates. This is unacceptable."\n\nThe customer relations manager, Léa Dupont, responded within two hours: "Dear Mrs. Owen, I sincerely apologise for the inconvenience and confusion caused. After investigating, I can confirm that your table was delayed due to a supplier issue. I have personally arranged express delivery for this Friday. As a gesture of goodwill, I would like to offer you a €50 voucher and a 15% discount on your next purchase."\n\nMrs. Owen replied the following day: "Thank you for your prompt response and for taking ownership of the problem. I appreciate the gesture. I look forward to receiving my table on Friday."\n\nThe case became an internal training example at CasaHome, demonstrating that a well-handled complaint can strengthen customer loyalty rather than destroy it.`,
      instructions: "Rédigez un compte rendu en français de ce document (150 à 200 mots). Présentez la situation initiale, la réclamation de la cliente, la réponse de l'entreprise et les enseignements tirés.",
      wordMin: 150, wordMax: 200,
      keyPoints: ["Situation initiale (retard, mauvaise communication)", "Réclamation de Mme Owen", "Réponse rapide de Léa Dupont", "Geste commercial proposé", "Leçon managériale"],
    },
    quiz: [
      { q: "How do you greet a customer professionally on the phone?", opts: ["Yeah, what do you want?", "Good morning, how may I help you?", "Hello, speak.", "Hi!"], ans: 1 },
      { q: "What does 'customer retention' mean?", opts: ["Attirer de nouveaux clients", "Fidéliser les clients existants", "Former le personnel", "Gérer les stocks"], ans: 1 },
      { q: "What is a 'follow-up call'?", opts: ["Un premier appel", "Un appel de suivi après une vente", "Un appel annulé", "Une conférence"], ans: 1 },
      { q: "What does 'to escalate an issue' mean?", opts: ["Résoudre seul", "Faire remonter à un niveau supérieur", "Ignorer", "Clôturer"], ans: 1 },
      { q: "Which phrase shows empathy?", opts: ["I completely understand your frustration.", "That's your problem.", "Read the manual.", "We're busy."], ans: 0 },
      { q: "What is 'after-sales service'?", opts: ["La prospection", "Le service après-vente", "La facturation", "Le marketing"], ans: 1 },
      { q: "A 'loyalty programme' aims to:", opts: ["Recruter des employés", "Fidéliser les clients existants", "Former les équipes", "Réduire les coûts"], ans: 1 },
      { q: "What does 'goodwill gesture' mean?", opts: ["Un geste commercial de compensation", "Une politique de remboursement", "Un document légal", "Un avantage salarial"], ans: 0 },
    ],
    fill: [
      { sentence: "I'd like to ___ for the delay in processing your order.", blank: "apologise", opts: ["apologise", "congratulate", "blame", "ignore"] },
      { sentence: "We value your ___ and will resolve this quickly.", blank: "feedback", opts: ["silence", "feedback", "delay", "invoice"] },
      { sentence: "Could you please ___ your order number?", blank: "confirm", opts: ["forget", "confirm", "change", "hide"] },
      { sentence: "We will ___ the situation and get back to you within 24 hours.", blank: "investigate", opts: ["investigate", "ignore", "worsen", "delay"] },
      { sentence: "As a ___ of goodwill, we'd like to offer you a voucher.", blank: "gesture", opts: ["gesture", "demand", "threat", "fine"] },
      { sentence: "I'll make sure this issue is ___ to our technical team.", blank: "escalated", opts: ["escalated", "hidden", "deleted", "ignored"] },
    ],
    matching: [
      { en: "Customer satisfaction", fr: "Satisfaction client" }, { en: "Handle a complaint", fr: "Gérer une réclamation" },
      { en: "Loyalty programme", fr: "Programme de fidélité" }, { en: "After-sales service", fr: "Service après-vente" },
      { en: "Escalate an issue", fr: "Faire remonter un problème" }, { en: "Goodwill gesture", fr: "Geste commercial" },
      { en: "Customer churn", fr: "Perte de clients" }, { en: "To follow up", fr: "Assurer le suivi" },
    ],
  },
  marketing: {
    id: "marketing", title: "Marketing & Sales", subtitle: "Stratégies et vocabulaire marketing en anglais",
    accent: "#7C3AED", accentLight: "#F5F3FF", iconKey: "bar", badge: "Marketing", estimatedTime: 120,
    videos: [
      {
        id: "v1", title: "Marketing Strategies – Business English", source: "Business English",
        ytId: "UHCgzff8X3U", duration: "~6 min",
        tip: "Concentrez-vous sur le vocabulaire des stratégies marketing et les expressions clés.",
        questions: [
          { q: "What does 'target audience' mean?", opts: ["Tous les consommateurs", "Le groupe de personnes visé par une campagne", "Le budget marketing", "L'équipe commerciale"], ans: 1 },
          { q: "What is a 'marketing campaign'?", opts: ["Une réunion d'équipe", "Un ensemble d'actions pour promouvoir un produit", "Un rapport financier", "Une formation"], ans: 1 },
          { q: "What does 'brand image' refer to?", opts: ["Le logo d'une entreprise uniquement", "La perception globale d'une marque par les consommateurs", "Le chiffre d'affaires", "Le budget publicité"], ans: 1 },
        ]
      },
      {
        id: "v2", title: "Digital Marketing – Business English", source: "Business English",
        ytId: "OvJ1qH0KDGE", duration: "~6 min",
        tip: "Notez les termes liés au marketing digital : SEO, CTA, conversion rate, social media.",
        questions: [
          { q: "What is the purpose of social media marketing?", opts: ["Former les employés", "Atteindre et engager les clients en ligne", "Gérer la comptabilité", "Organiser des réunions"], ans: 1 },
          { q: "What does 'engagement' mean in digital marketing?", opts: ["Un contrat signé", "L'interaction des utilisateurs avec le contenu", "Le coût d'une publicité", "Le nombre d'employés"], ans: 1 },
          { q: "What is 'content marketing'?", opts: ["Vendre des produits physiques", "Créer du contenu utile pour attirer des clients", "Former les équipes de vente", "Gérer les réclamations"], ans: 1 },
        ]
      },
    ],
    reading: {
      title: "Launching a Product on a New Market",
      text: `FreshGo, a French startup specialising in healthy meal kits, decided to expand to the UK market in January 2024. The company had achieved strong success in France with a turnover of €12 million, but faced increasing competition at home.\n\nThe marketing director, Antoine Renard, developed a full go-to-market strategy. For the product, FreshGo adapted its recipes to British tastes, introducing new options such as "British Beef Stew Kit" and "Sunday Roast Box."\n\nOn pricing, the company adopted a penetration strategy, offering an introductory price of £4.99 per meal — 30% lower than the main competitor, HelloFresh.\n\nFor distribution (place), FreshGo partnered with Ocado, the UK's leading online supermarket, and launched its own website with a subscription model.\n\nThe promotional strategy focused heavily on social media: influencer partnerships on Instagram and TikTok, a referral programme offering one free box for every friend invited, and targeted Google Ads campaigns.\n\nWithin six months, FreshGo acquired 15,000 subscribers in the UK and was named "Best New Food Brand" by a consumer magazine.`,
      instructions: "Rédigez un compte rendu en français de ce document (150 à 200 mots). Présentez l'entreprise, sa stratégie marketing (les 4P) et les résultats obtenus sur le marché britannique.",
      wordMin: 150, wordMax: 200,
      keyPoints: ["Présentation de FreshGo", "Stratégie Produit (adaptation recettes)", "Stratégie Prix (pénétration)", "Distribution (Ocado + site web)", "Promotion (influenceurs, Google Ads)", "Résultats (15 000 abonnés)"],
    },
    quiz: [
      { q: "What is a 'USP'?", opts: ["Unique Selling Proposition", "Universal Sales Plan", "User Support Programme", "Unified Strategy Point"], ans: 0 },
      { q: "What does 'B2B' stand for?", opts: ["Back to Basics", "Business to Business", "Brand to Buyer", "Budget to Benefit"], ans: 1 },
      { q: "Which term means dividing a market into groups?", opts: ["Targeting", "Positioning", "Segmentation", "Branding"], ans: 2 },
      { q: "What is 'brand awareness'?", opts: ["Le chiffre d'affaires", "La notoriété d'une marque", "La valeur boursière", "Le budget pub"], ans: 1 },
      { q: "What does 'market share' mean?", opts: ["Le budget marketing", "La part de marché", "Le coût par clic", "Le taux de fidélité"], ans: 1 },
      { q: "What is 'SEO'?", opts: ["Social Engagement Online", "Search Engine Optimisation", "Sales and Export Operations", "Structured Email Output"], ans: 1 },
      { q: "A 'conversion rate' measures:", opts: ["Le coût d'une pub", "Le % de visiteurs qui réalisent une action", "Le nombre d'abonnés", "Le budget alloué"], ans: 1 },
      { q: "What is a 'go-to-market strategy'?", opts: ["Un plan pour quitter un marché", "Un plan pour lancer un produit", "Une stratégie RH", "Un rapport financier"], ans: 1 },
    ],
    fill: [
      { sentence: "Our campaign aims to ___ brand awareness among young professionals.", blank: "boost", opts: ["boost", "reduce", "hide", "cancel"] },
      { sentence: "We need to identify our ___ audience before launching.", blank: "target", opts: ["random", "target", "unknown", "internal"] },
      { sentence: "The product's ___ point is its eco-friendly packaging.", blank: "selling", opts: ["selling", "breaking", "hiding", "falling"] },
      { sentence: "Let's analyse the ___ to understand our competitors.", blank: "market", opts: ["weather", "market", "traffic", "colour"] },
      { sentence: "We adopted a ___ pricing strategy to enter the UK market.", blank: "penetration", opts: ["penetration", "luxury", "random", "exit"] },
      { sentence: "The ___ rate shows how many visitors actually buy something.", blank: "conversion", opts: ["conversion", "inflation", "rejection", "retention"] },
    ],
    matching: [
      { en: "Market share", fr: "Part de marché" }, { en: "Lead generation", fr: "Génération de prospects" },
      { en: "ROI", fr: "Retour sur investissement" }, { en: "Customer journey", fr: "Parcours client" },
      { en: "Conversion rate", fr: "Taux de conversion" }, { en: "Brand awareness", fr: "Notoriété de marque" },
      { en: "Go-to-market strategy", fr: "Stratégie de lancement" }, { en: "Call to action", fr: "Appel à l'action" },
    ],
  },
  prospecting: {
    id: "prospecting", title: "Prospecting & Cold Call", subtitle: "Techniques de prospection commerciale en anglais",
    accent: "#EA580C", accentLight: "#FFF7ED", iconKey: "globe", badge: "Prospection", estimatedTime: 120,
    videos: [
      {
        id: "v1", title: "Making a Cold Call – English at Work #29", source: "BBC Learning English",
        ytId: "7XXXo_7HlP8", duration: "~5 min",
        tip: "Regardez comment passer un appel de prospection. Notez les expressions pour se présenter et obtenir un rendez-vous.",
        questions: [
          { q: "What is Anna trying to do in this episode?", opts: ["Order office supplies", "Make a cold call to a potential client", "Organise a team meeting", "Send an email"], ans: 1 },
          { q: "How should you introduce yourself on a cold call?", opts: ["Just say your first name", "State your full name and company clearly", "Ask who you're speaking to first", "Start with the price"], ans: 1 },
          { q: "What is the goal of a cold call?", opts: ["Vendre immédiatement", "Obtenir un rendez-vous ou qualifier le prospect", "Présenter tout le catalogue", "Négocier un contrat"], ans: 1 },
        ]
      },
      {
        id: "v2", title: "The Elevator Pitch – English at Work #45", source: "BBC Learning English",
        ytId: "2dpVQ8aIRis", duration: "~5 min",
        tip: "Observez comment présenter une idée de façon convaincante en peu de temps.",
        questions: [
          { q: "What is an 'elevator pitch'?", opts: ["Une longue présentation formelle", "Un discours court et percutant pour convaincre rapidement", "Un email de prospection", "Un rapport de vente"], ans: 1 },
          { q: "How long should an elevator pitch be?", opts: ["30 minutes", "1 hour", "30 to 60 seconds", "10 minutes"], ans: 2 },
          { q: "What is the most important element of a good pitch?", opts: ["Using technical jargon", "Clearly explaining the value you bring", "Listing all product features", "Reading from notes"], ans: 1 },
        ]
      },
    ],
    reading: {
      title: "The Art of Prospecting in the Digital Age",
      text: `For decades, cold calling was the primary method of business prospecting. However, with the rise of digital technology, sales teams must now combine traditional phone techniques with social selling strategies.\n\nClickSales, a Lyon-based sales training company, recently published a study showing that 78% of B2B buyers are influenced by content they find on LinkedIn before agreeing to a meeting. The study also found that salespeople who use a combination of cold calls, personalised emails, and LinkedIn messages achieve a 45% higher conversion rate than those who rely on phone calls alone.\n\nMarc Faure, ClickSales' head of training, explains: "Modern prospecting is about being where your prospect is. Before calling, research them on LinkedIn, read their company news, and find a genuine reason to contact them. A cold call becomes a warm call when you say: 'I saw that your company just launched a new product line — I believe we could help you with your distribution strategy.'"\n\nThe study recommends a 'multi-touch' approach: three touchpoints over ten days — a LinkedIn connection request with a personalised note, a follow-up email, and a phone call. Companies that applied this method reported a 60% increase in meetings booked.`,
      instructions: "Rédigez un compte rendu en français de ce document (150 à 200 mots). Présentez l'évolution des méthodes de prospection, les résultats de l'étude ClickSales et les recommandations proposées.",
      wordMin: 150, wordMax: 200,
      keyPoints: ["Évolution : cold call → prospection digitale", "Étude ClickSales : 78% influencés par LinkedIn", "Taux de conversion +45% (multi-canal)", "Citation Marc Faure (warm call)", "Approche multi-touch : 3 contacts en 10 jours", "Résultat : +60% de RDV obtenus"],
    },
    quiz: [
      { q: "What is the main goal of a cold call?", opts: ["Vendre immédiatement", "Qualifier un prospect et obtenir un RDV", "Résoudre une réclamation", "Former un client"], ans: 1 },
      { q: "What does 'gatekeeper' refer to?", opts: ["Le directeur commercial", "La personne qui contrôle l'accès au décideur", "Un logiciel CRM", "Un type de contrat"], ans: 1 },
      { q: "What is a 'prospect'?", opts: ["Un client fidèle", "Un client potentiel non encore converti", "Un fournisseur", "Un concurrent"], ans: 1 },
      { q: "What does 'to qualify a lead' mean?", opts: ["Envoyer un email", "Évaluer le potentiel commercial d'un contact", "Clôturer une vente", "Annuler un RDV"], ans: 1 },
      { q: "What is 'social selling'?", opts: ["Vendre sur les marchés", "Utiliser les réseaux sociaux pour prospecter", "Former les équipes", "Gérer les réclamations"], ans: 1 },
      { q: "What is a 'pipeline' in sales?", opts: ["Un logiciel de compta", "L'ensemble des opportunités commerciales en cours", "Un rapport mensuel", "Une formation"], ans: 1 },
      { q: "A 'warm call' means:", opts: ["Un appel avec un inconnu total", "Un appel avec quelqu'un déjà informé de votre offre", "Un appel depuis l'étranger", "Un appel automatique"], ans: 1 },
      { q: "What does 'multi-touch approach' mean?", opts: ["Appeler plusieurs fois par jour", "Utiliser plusieurs canaux sur une période", "Contacter plusieurs décideurs à la fois", "Envoyer des messages en masse"], ans: 1 },
    ],
    fill: [
      { sentence: "I'm calling to ___ an appointment with your sales director.", blank: "schedule", opts: ["schedule", "cancel", "forget", "avoid"] },
      { sentence: "Could I ask who is ___ for purchasing decisions?", blank: "responsible", opts: ["responsible", "unaware", "absent", "confused"] },
      { sentence: "I'd love to show you how we can ___ your conversion rate.", blank: "improve", opts: ["improve", "reduce", "ignore", "hide"] },
      { sentence: "I'll send a ___ email with more details.", blank: "follow-up", opts: ["follow-up", "complaint", "invoice", "refusal"] },
      { sentence: "We use a ___ approach: LinkedIn, email, then phone.", blank: "multi-touch", opts: ["multi-touch", "single", "random", "offline"] },
      { sentence: "Before calling, ___ the prospect on LinkedIn to personalise your pitch.", blank: "research", opts: ["research", "ignore", "block", "delete"] },
    ],
    matching: [
      { en: "Decision maker", fr: "Décideur" }, { en: "Sales pitch", fr: "Argumentaire de vente" },
      { en: "Qualify a lead", fr: "Qualifier un prospect" }, { en: "Objection handling", fr: "Traitement des objections" },
      { en: "Pipeline", fr: "Tunnel de vente" }, { en: "Social selling", fr: "Vente via les réseaux sociaux" },
      { en: "Warm call", fr: "Appel sur prospect déjà informé" }, { en: "Follow-up email", fr: "Email de relance / suivi" },
    ],
  },
};

const STEPS = [
  { key: "video-0",  label: "Vidéo 1",             iconKey: "video",   type: "video",   idx: 0, time: 20 },
  { key: "video-1",  label: "Vidéo 2",             iconKey: "video",   type: "video",   idx: 1, time: 20 },
  { key: "reading",  label: "Texte & Compte rendu",iconKey: "pen",     type: "reading",         time: 35 },
  { key: "quiz",     label: "Quiz QCM",             iconKey: "brain",   type: "quiz",            time: 20 },
  { key: "fill",     label: "Fill in the blank",    iconKey: "book",    type: "fill",            time: 15 },
  { key: "matching", label: "Matching",             iconKey: "link",    type: "matching",        time: 15 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

function ProgressRing({ value, max, size = 52, accent = "#3B6FE8" }) {
  const r = 20, circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / Math.max(1, max));
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#E5E7EB" strokeWidth="4" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={accent} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" transform="rotate(-90 24 24)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

function LinearBar({ value, max, accent = "#3B6FE8" }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accent }} />
    </div>
  );
}

// ─── SCORE SCREEN ─────────────────────────────────────────────────────────────
function ScoreScreen({ score, total, onRetry, onFinish, accent = "#3B6FE8" }) {
  const pct = Math.round((score / total) * 100);
  const msg = pct >= 80 ? "Excellent travail !" : pct >= 60 ? "Bien joué, continuez !" : "Bon effort, réessayez !";
  const col = pct >= 80 ? "#059669" : pct >= 60 ? "#D97706" : "#DC2626";
  return (
    <div className="text-center py-10 space-y-6">
      <ProgressRing value={score} max={total} size={80} accent={col} />
      <div>
        <p className="text-2xl font-bold text-gray-800">{score} / {total}</p>
        <p className="text-gray-500 text-sm mt-1">{msg}</p>
      </div>
      <div className="flex gap-3 justify-center">
        <button onClick={onRetry} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          <Icon d={Icons.refresh} size={16} /> Réessayer
        </button>
        <button onClick={onFinish} className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: accent }}>
          <Icon d={Icons.check} size={16} /> Valider
        </button>
      </div>
    </div>
  );
}

// ─── VIDEO ────────────────────────────────────────────────────────────────────
function VideoActivity({ video, accent, onComplete }) {
  const [phase, setPhase] = useState("watch");
  const [idx, setIdx] = useState(0); const [sel, setSel] = useState(null); const [score, setScore] = useState(0);
  const q = video.questions[idx];
  const choose = i => {
    if (sel !== null) return; setSel(i);
    if (i === q.ans) setScore(s => s + 1);
    setTimeout(() => { if (idx + 1 < video.questions.length) { setIdx(i => i + 1); setSel(null); } else setPhase("done"); }, 1100);
  };
  if (phase === "watch") return (
    <div className="space-y-4">
      <div className="rounded-xl p-3 text-sm border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D", color: "#92400E" }}>
        <p className="font-semibold mb-1">Consigne</p>
        <p>{video.tip}</p>
      </div>
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow" style={{ paddingTop: "56.25%" }}>
        <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${video.ytId}?rel=0`}
          title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">{video.title}</p>
          <p className="text-xs text-gray-400">{video.source} · {video.duration}</p>
        </div>
      </div>
      <button onClick={() => setPhase("quiz")} className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2" style={{ backgroundColor: accent }}>
        <Icon d={Icons.check} size={16} /> J'ai regardé — Passer aux questions
      </button>
    </div>
  );
  if (phase === "done") return <ScoreScreen score={score} total={video.questions.length} accent={accent}
    onRetry={() => { setIdx(0); setSel(null); setScore(0); setPhase("quiz"); }}
    onFinish={() => onComplete(score, video.questions.length)} />;
  return (
    <div className="space-y-5">
      <div className="flex justify-between text-xs text-gray-400 font-medium">
        <span>Question {idx + 1} / {video.questions.length}</span>
        <span>{score} pt{score > 1 ? "s" : ""}</span>
      </div>
      <LinearBar value={idx + 1} max={video.questions.length} accent={accent} />
      <p className="text-gray-800 font-semibold text-base leading-snug pt-1">{q.q}</p>
      <div className="grid gap-2.5">
        {q.opts.map((opt, i) => {
          let cls = "p-3 rounded-xl border text-left text-sm font-medium cursor-pointer transition-all ";
          if (sel === null) cls += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
          else if (i === q.ans) cls += "border-green-300 bg-green-50 text-green-800";
          else if (i === sel)   cls += "border-red-200 bg-red-50 text-red-700";
          else cls += "border-gray-100 bg-gray-50 text-gray-400";
          return <button key={i} className={cls} onClick={() => choose(i)}>{opt}</button>;
        })}
      </div>
    </div>
  );
}

// ─── READING ──────────────────────────────────────────────────────────────────
function ReadingActivity({ reading, accent, onComplete }) {
  const [phase, setPhase] = useState("read");
  const [text, setText] = useState("");
  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  const ok = wc >= reading.wordMin && wc <= reading.wordMax;

  if (phase === "read") return (
    <div className="space-y-4">
      <div className="rounded-xl p-3 text-sm border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D", color: "#92400E" }}>
        <p className="font-semibold mb-1">Consigne</p>
        <p>Lisez le texte, puis rédigez un <strong>compte rendu en français</strong> ({reading.wordMin}–{reading.wordMax} mots).</p>
      </div>
      <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
        <div className="px-4 py-3 bg-gray-50 rounded-t-xl">
          <p className="font-bold text-gray-800 text-sm">{reading.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">Document anglais — niveau B1</p>
        </div>
        <div className="px-4 py-4 text-sm text-gray-700 leading-relaxed max-h-72 overflow-y-auto">
          {reading.text.split("\n\n").map((p, i) => <p key={i} className="mb-3 last:mb-0">{p}</p>)}
        </div>
      </div>
      <button onClick={() => setPhase("write")} className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: accent }}>
        <Icon d={Icons.pen} size={16} /> Passer à la rédaction
      </button>
    </div>
  );

  if (phase === "done") return (
    <div className="space-y-4 py-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: ok ? "#D1FAE5" : "#FEF3C7" }}>
          <Icon d={Icons.check} size={22} stroke={ok ? "#059669" : "#D97706"} sw={2.5} />
        </div>
        <p className="text-lg font-bold text-gray-800">{ok ? "Compte rendu validé" : "Compte rendu enregistré"}</p>
        <p className="text-sm text-gray-500">{wc} mots · {ok ? "Longueur conforme BTS ✓" : `Objectif : ${reading.wordMin}–${reading.wordMax} mots`}</p>
      </div>
      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Points clés attendus</p>
        <div className="space-y-2">
          {reading.keyPoints.map((kp, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <Icon d={Icons.check} size={14} stroke="#059669" sw={2.5} />
              <span>{kp}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onComplete(ok ? 1 : 0, 1)} className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: accent }}>
        <Icon d={Icons.arrow} size={16} /> Continuer
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-3 text-sm border" style={{ backgroundColor: "#FFFBEB", borderColor: "#FCD34D", color: "#92400E" }}>
        <p className="font-semibold mb-1">{reading.instructions}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {reading.keyPoints.map((kp, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">{kp}</span>
          ))}
        </div>
      </div>
      <details className="border border-gray-200 rounded-xl">
        <summary className="px-4 py-3 text-sm text-gray-600 cursor-pointer select-none font-medium flex items-center gap-2">
          <Icon d={Icons.book} size={15} stroke="#6B7280" /> Revoir le texte anglais
        </summary>
        <div className="px-4 pb-4 pt-2 text-sm text-gray-600 leading-relaxed max-h-48 overflow-y-auto border-t border-gray-100">
          {reading.text.split("\n\n").map((p, i) => <p key={i} className="mb-2 last:mb-0">{p}</p>)}
        </div>
      </details>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={10}
        placeholder="Rédigez votre compte rendu ici en français…"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none resize-none leading-relaxed bg-white"
        style={{ focusBorderColor: accent }} />
      <div className="flex justify-between items-center">
        <span className={`text-sm font-semibold ${ok ? "text-green-600" : wc < reading.wordMin ? "text-amber-600" : "text-red-500"}`}>
          {wc} / {reading.wordMin}–{reading.wordMax} mots
        </span>
        <button onClick={() => setPhase("done")} disabled={wc < 30}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-40"
          style={{ backgroundColor: accent }}>
          Soumettre <Icon d={Icons.arrow} size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function QuizGame({ data, accent, onFinish }) {
  const [idx, setIdx] = useState(0); const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0); const [done, setDone] = useState(false);
  const q = data[idx];
  const choose = i => {
    if (sel !== null) return; setSel(i);
    if (i === q.ans) setScore(s => s + 1);
    setTimeout(() => { if (idx + 1 < data.length) { setIdx(i => i + 1); setSel(null); } else setDone(true); }, 1100);
  };
  if (done) return <ScoreScreen score={score} total={data.length} accent={accent}
    onRetry={() => { setIdx(0); setSel(null); setScore(0); setDone(false); }} onFinish={() => onFinish(score, data.length)} />;
  return (
    <div className="space-y-5">
      <div className="flex justify-between text-xs font-medium text-gray-400">
        <span>{idx + 1} / {data.length}</span><span>{score} pt{score > 1 ? "s" : ""}</span>
      </div>
      <LinearBar value={idx + 1} max={data.length} accent={accent} />
      <p className="text-gray-800 font-semibold text-base leading-snug pt-1">{q.q}</p>
      <div className="grid gap-2.5">
        {q.opts.map((opt, i) => {
          let cls = "p-3 rounded-xl border text-left text-sm font-medium cursor-pointer transition-all ";
          if (sel === null) cls += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
          else if (i === q.ans) cls += "border-green-300 bg-green-50 text-green-800";
          else if (i === sel) cls += "border-red-200 bg-red-50 text-red-700";
          else cls += "border-gray-100 bg-gray-50 text-gray-400";
          return <button key={i} className={cls} onClick={() => choose(i)}>{opt}</button>;
        })}
      </div>
    </div>
  );
}

// ─── FILL ─────────────────────────────────────────────────────────────────────
function FillGame({ data, accent, onFinish }) {
  const [idx, setIdx] = useState(0); const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0); const [done, setDone] = useState(false);
  const shuffled = useRef([]);
  useEffect(() => { shuffled.current = shuffle(data[idx].opts); }, [idx]);
  if (!shuffled.current.length) shuffled.current = shuffle(data[0].opts);
  const q = data[idx];
  const choose = opt => {
    if (sel !== null) return; setSel(opt);
    if (opt === q.blank) setScore(s => s + 1);
    setTimeout(() => { if (idx + 1 < data.length) { setIdx(i => i + 1); setSel(null); } else setDone(true); }, 1100);
  };
  if (done) return <ScoreScreen score={score} total={data.length} accent={accent}
    onRetry={() => { setIdx(0); setSel(null); setScore(0); setDone(false); }} onFinish={() => onFinish(score, data.length)} />;
  const parts = q.sentence.split("___");
  return (
    <div className="space-y-5">
      <div className="flex justify-between text-xs font-medium text-gray-400">
        <span>{idx + 1} / {data.length}</span><span>{score} pt{score > 1 ? "s" : ""}</span>
      </div>
      <LinearBar value={idx + 1} max={data.length} accent={accent} />
      <p className="text-xs font-medium text-gray-400 pt-1">Choisissez le bon mot pour compléter la phrase :</p>
      <p className="text-gray-800 text-base font-semibold leading-relaxed">
        {parts[0]}
        <span className={`inline-block min-w-24 px-3 py-0.5 mx-1 rounded-lg border text-center text-sm transition-all ${
          sel === null ? "border-dashed border-gray-300 text-gray-300"
          : sel === q.blank ? "border-green-300 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-600"}`}>
          {sel || "· · ·"}
        </span>
        {parts[1]}
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {shuffled.current.map((opt, i) => {
          let cls = "p-3 rounded-xl border text-center text-sm font-medium cursor-pointer transition-all ";
          if (sel === null) cls += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
          else if (opt === q.blank) cls += "border-green-300 bg-green-50 text-green-800";
          else if (opt === sel) cls += "border-red-200 bg-red-50 text-red-700";
          else cls += "border-gray-100 bg-gray-50 text-gray-400";
          return <button key={i} className={cls} onClick={() => choose(opt)}>{opt}</button>;
        })}
      </div>
    </div>
  );
}

// ─── MATCHING ─────────────────────────────────────────────────────────────────
function MatchingGame({ data, accent, onFinish }) {
  const [pairs] = useState(() => shuffle(data));
  const [rights, setRights] = useState(() => shuffle(data.map(d => d.fr)));
  const [matched, setMatched] = useState({});
  const [tapSel, setTapSel] = useState(null);
  const [errors, setErrors] = useState(0);
  const [flash, setFlash] = useState(null);
  const [done, setDone] = useState(false);
  const mc = Object.keys(matched).length;
  useEffect(() => { if (mc === pairs.length && pairs.length > 0) setTimeout(() => setDone(true), 600); }, [matched]);
  const tryMatch = (leftIdx, fr) => {
    if (matched[leftIdx]) return;
    if (pairs[leftIdx].fr === fr) { setMatched(m => ({ ...m, [leftIdx]: fr })); setFlash({ idx: leftIdx, ok: true }); }
    else { setErrors(e => e + 1); setFlash({ idx: leftIdx, ok: false }); }
    setTimeout(() => setFlash(null), 700); setTapSel(null);
  };
  const score = Math.max(0, pairs.length - errors);
  if (done) return <ScoreScreen score={score} total={pairs.length} accent={accent}
    onRetry={() => { setMatched({}); setErrors(0); setRights(shuffle(data.map(d => d.fr))); setDone(false); }}
    onFinish={() => onFinish(score, pairs.length)} />;
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-medium text-gray-400">
        <span>{mc} / {pairs.length} paires</span>
        <span>{errors} erreur{errors > 1 ? "s" : ""}</span>
      </div>
      <LinearBar value={mc} max={pairs.length} accent={accent} />
      <p className="text-xs text-gray-400 pt-1">Cliquez sur un mot anglais, puis son équivalent français.</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center pb-1">English</p>
          {pairs.map((p, i) => {
            const isM = matched[i] !== undefined, isS = tapSel === i, isF = flash?.idx === i;
            let cls = "w-full p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ";
            if (isM) cls += "border-green-200 bg-green-50 text-green-700 opacity-60 cursor-default";
            else if (isF) cls += flash.ok ? "border-green-300 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600";
            else if (isS) cls += "border-blue-300 bg-blue-50 text-blue-700 ring-1 ring-blue-200";
            else cls += "border-gray-200 bg-white text-gray-700 hover:border-gray-300";
            return <div key={i} className={cls} onClick={() => !isM && setTapSel(i)}>{p.en}</div>;
          })}
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center pb-1">Français</p>
          {rights.map((fr, i) => {
            const isM = Object.values(matched).includes(fr);
            let cls = "w-full p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ";
            if (isM) cls += "border-green-200 bg-green-50 text-green-700 opacity-60 cursor-default";
            else if (tapSel !== null) cls += "border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-200";
            else cls += "border-gray-200 bg-white text-gray-700 hover:border-gray-300";
            return <div key={i} className={cls} onClick={() => !isM && tapSel !== null && tryMatch(tapSel, fr)}>{fr}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MODULE VIEW ──────────────────────────────────────────────────────────────
function ModuleView({ module, scores, onScore, onBack }) {
  const [activeStep, setActiveStep] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef(null);
  useEffect(() => { timer.current = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(timer.current); }, []);
  const completedSteps = STEPS.filter(s => scores[`${module.id}-${s.key}`] !== undefined).length;
  const handleScore = (stepKey, s, t) => { onScore(`${module.id}-${stepKey}`, s, t); setActiveStep(null); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 sticky top-0 z-10">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-3 transition-colors">
          <Icon d={Icons.back} size={16} /> Retour
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: module.accentLight }}>
              <Icon d={Icons[module.iconKey]} size={20} stroke={module.accent} sw={1.75} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">{module.title}</h2>
              <p className="text-xs text-gray-400">{completedSteps}/{STEPS.length} activités complétées</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
            <Icon d={Icons.clock} size={14} stroke="#9CA3AF" />
            <span className="font-mono font-medium text-gray-600">{formatTime(elapsed)}</span>
          </div>
        </div>
        <div className="mt-3">
          <LinearBar value={completedSteps} max={STEPS.length} accent={module.accent} />
        </div>
      </div>

      {activeStep ? (
        <div className="max-w-xl mx-auto px-4 py-6">
          <button onClick={() => setActiveStep(null)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors">
            <Icon d={Icons.back} size={16} /> Activités
          </button>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: module.accentLight }}>
                <Icon d={Icons[activeStep.iconKey]} size={15} stroke={module.accent} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{activeStep.label}</p>
                <p className="text-xs text-gray-400">~{activeStep.time} min</p>
              </div>
            </div>
            {activeStep.type === "video"    && <VideoActivity   video={module.videos[activeStep.idx]} accent={module.accent} onComplete={(s,t) => handleScore(activeStep.key,s,t)} />}
            {activeStep.type === "reading"  && <ReadingActivity reading={module.reading}              accent={module.accent} onComplete={(s,t) => handleScore(activeStep.key,s,t)} />}
            {activeStep.type === "quiz"     && <QuizGame        data={module.quiz}                   accent={module.accent} onFinish={(s,t)  => handleScore(activeStep.key,s,t)} />}
            {activeStep.type === "fill"     && <FillGame        data={module.fill}                   accent={module.accent} onFinish={(s,t)  => handleScore(activeStep.key,s,t)} />}
            {activeStep.type === "matching" && <MatchingGame    data={module.matching}               accent={module.accent} onFinish={(s,t)  => handleScore(activeStep.key,s,t)} />}
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto px-4 py-6 space-y-2">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-4">Parcours séquentiel</p>
          {STEPS.map((step, i) => {
            const done   = scores[`${module.id}-${step.key}`] !== undefined;
            const locked = i > 0 && !scores[`${module.id}-${STEPS[i-1].key}`];
            const sc     = scores[`${module.id}-${step.key}`];
            const pct    = sc ? Math.round(sc.score / sc.total * 100) : 0;
            return (
              <button key={step.key} disabled={locked} onClick={() => setActiveStep(step)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  done   ? "border-gray-100 bg-white hover:bg-gray-50"
                  : locked ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm cursor-pointer"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${done ? "" : locked ? "bg-gray-100" : ""}`}
                  style={done ? { backgroundColor: module.accentLight } : locked ? {} : { backgroundColor: module.accentLight }}>
                  {done
                    ? <Icon d={Icons.check} size={18} stroke={module.accent} sw={2.5} />
                    : locked
                    ? <Icon d={Icons.lock} size={17} stroke="#9CA3AF" />
                    : <Icon d={Icons[step.iconKey]} size={18} stroke={module.accent} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${locked ? "text-gray-400" : "text-gray-800"}`}>{step.label}</p>
                  <p className="text-xs text-gray-400">~{step.time} min</p>
                </div>
                {sc && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pct >= 80 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {sc.score}/{sc.total}
                  </span>
                )}
                {!done && !locked && <Icon d={Icons.chevron} size={18} stroke="#D1D5DB" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
const MODULES_LIST = Object.values(MODULES_DATA);

export default function App() {
  const [view, setView]       = useState("home");
  const [activeModule, setAM] = useState(null);
  const [scores, setScores]   = useState({});
  const addScore = (key, score, total) => setScores(s => ({ ...s, [key]: { score, total } }));
  const totalPts = Object.values(scores).reduce((a, v) => a + v.score, 0);
  const totalMax = Object.values(scores).reduce((a, v) => a + v.total, 0);

  if (view === "module" && activeModule)
    return <ModuleView module={activeModule} scores={scores} onScore={addScore} onBack={() => setView("home")} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-4 sticky top-0 z-10">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Icon d={Icons.globe} size={18} stroke="white" sw={2} />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-none">BTS NDRC</h1>
              <p className="text-xs text-gray-400 mt-0.5">English for Business · B1</p>
            </div>
          </div>
          {totalMax > 0 && (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
              <Icon d={Icons.star} size={14} stroke="#F59E0B" fill="#F59E0B" />
              <span className="text-sm font-bold text-gray-700">{totalPts}</span>
              <span className="text-xs text-gray-400">/ {totalMax}</span>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-xl mx-auto px-5 py-8">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Parcours E-Learning</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">English for Business</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">4 modules · ~2h chacun · Déblocage séquentiel<br/>Vidéos BBC & Bloomberg · Quiz · Compte rendu BTS</p>
          {/* Sequence strip */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            {[["video","Vidéo 1"],["video","Vidéo 2"],["pen","Compte rendu"],["brain","Quiz"],["book","Fill-in"],["link","Matching"]].map(([iconK, label], i, arr) => (
              <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-1 flex-shrink-0">
                    <Icon d={Icons[iconK]} size={14} stroke="#6B7280" />
                  </div>
                  <p className="text-center text-gray-400 leading-tight" style={{ fontSize: "9px" }}>{label}</p>
                </div>
                {i < arr.length - 1 && <Icon d={Icons.chevron} size={12} stroke="#D1D5DB" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <main className="max-w-xl mx-auto px-4 py-6 space-y-3">
        {MODULES_LIST.map(mod => {
          const done = STEPS.filter(s => scores[`${mod.id}-${s.key}`]).length;
          const pct  = Math.round(done / STEPS.length * 100);
          return (
            <button key={mod.id} onClick={() => { setAM(mod); setView("module"); }}
              className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden text-left hover:shadow-md hover:border-gray-200 transition-all group">
              <div className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: mod.accentLight }}>
                  <Icon d={Icons[mod.iconKey]} size={22} stroke={mod.accent} sw={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-gray-900 text-sm">{mod.title}</p>
                    <span className="text-xs font-medium text-gray-400">{done}/{STEPS.length}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 truncate">{mod.subtitle}</p>
                  <LinearBar value={done} max={STEPS.length} accent={mod.accent} />
                </div>
                <Icon d={Icons.chevron} size={18} stroke="#D1D5DB" />
              </div>
              <div className="px-4 pb-3 flex gap-3 text-xs text-gray-400 border-t border-gray-50 pt-3">
                <span className="flex items-center gap-1"><Icon d={Icons.video} size={12} stroke="#9CA3AF" /> 2 vidéos</span>
                <span className="flex items-center gap-1"><Icon d={Icons.pen} size={12} stroke="#9CA3AF" /> Compte rendu</span>
                <span className="flex items-center gap-1"><Icon d={Icons.brain} size={12} stroke="#9CA3AF" /> 8 questions</span>
                <span className="flex items-center gap-1"><Icon d={Icons.clock} size={12} stroke="#9CA3AF" /> ~{mod.estimatedTime} min</span>
              </div>
            </button>
          );
        })}

        {/* Global progress */}
        {totalMax > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">Progression globale</p>
              <span className="text-sm font-bold text-gray-500">{Math.round(totalPts / totalMax * 100)}%</span>
            </div>
            <LinearBar value={totalPts} max={totalMax} accent="#3B6FE8" />
            <p className="text-xs text-gray-400 mt-2">{totalPts} / {totalMax} points</p>
          </div>
        )}
      </main>
    </div>
  );
}
