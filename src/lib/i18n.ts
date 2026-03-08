// Sistema di traduzione bilingue (Italiano / Inglese)
// Ogni chiave corrisponde a un testo usato nel sito

export type Locale = "it" | "en";

// Dizionario delle traduzioni
const translations = {
  // === NAVIGAZIONE ===
  nav: {
    home: { it: "Home", en: "Home" },
    catalog: { it: "Catalogo", en: "Catalog" },
    about: { it: "Chi Siamo", en: "About Us" },
    contact: { it: "Contatti", en: "Contact" },
    cart: { it: "Carrello", en: "Cart" },
    admin: { it: "Admin", en: "Admin" },
  },
  // === HOMEPAGE ===
  hero: {
    title: { it: "Sapori Autentici della Puglia", en: "Authentic Flavors of Puglia" },
    subtitle: {
      it: "Taralli, olio extravergine e specialità artigianali, dalla nostra terra alla tua tavola.",
      en: "Taralli, extra virgin olive oil and artisan specialties, from our land to your table.",
    },
    cta: { it: "Scopri i Prodotti", en: "Discover Products" },
  },
  featured: {
    title: { it: "I Nostri Prodotti in Evidenza", en: "Our Featured Products" },
    subtitle: {
      it: "Selezionati con cura per portare il meglio della Puglia a casa tua",
      en: "Carefully selected to bring the best of Puglia to your home",
    },
  },
  story: {
    title: { it: "La Nostra Storia", en: "Our Story" },
    text: {
      it: "TarallOro nasce dalla passione per le tradizioni culinarie pugliesi. Ogni prodotto racconta una storia di artigianato, di sapori genuini e di una terra baciata dal sole. Lavoriamo con piccoli produttori locali per garantire autenticità e qualità in ogni confezione.",
      en: "TarallOro was born from a passion for Pugliese culinary traditions. Each product tells a story of craftsmanship, genuine flavors, and a sun-kissed land. We work with small local producers to guarantee authenticity and quality in every package.",
    },
    cta: { it: "Scopri di Più", en: "Learn More" },
  },
  // === CATALOGO ===
  catalog: {
    title: { it: "Il Nostro Catalogo", en: "Our Catalog" },
    subtitle: {
      it: "Scopri tutti i sapori della tradizione pugliese",
      en: "Discover all the flavors of Pugliese tradition",
    },
    noProducts: { it: "Nessun prodotto disponibile", en: "No products available" },
    addToCart: { it: "Aggiungi al Carrello", en: "Add to Cart" },
    outOfStock: { it: "Esaurito", en: "Out of Stock" },
    all: { it: "Tutti", en: "All" },
  },
  // === PRODOTTO SINGOLO ===
  product: {
    addToCart: { it: "Aggiungi al Carrello", en: "Add to Cart" },
    added: { it: "Aggiunto!", en: "Added!" },
    outOfStock: { it: "Prodotto Esaurito", en: "Out of Stock" },
    back: { it: "← Torna al Catalogo", en: "← Back to Catalog" },
    related: { it: "Prodotti Correlati", en: "Related Products" },
  },
  // === CARRELLO ===
  cart: {
    title: { it: "Il Tuo Carrello", en: "Your Cart" },
    empty: { it: "Il carrello è vuoto", en: "Your cart is empty" },
    continueShopping: { it: "Continua lo Shopping", en: "Continue Shopping" },
    product: { it: "Prodotto", en: "Product" },
    price: { it: "Prezzo", en: "Price" },
    quantity: { it: "Quantità", en: "Quantity" },
    total: { it: "Totale", en: "Total" },
    subtotal: { it: "Subtotale", en: "Subtotal" },
    shipping: { it: "Spedizione", en: "Shipping" },
    shippingFree: { it: "Gratuita sopra €50", en: "Free over €50" },
    shippingCost: { it: "€5.00", en: "€5.00" },
    orderTotal: { it: "Totale Ordine", en: "Order Total" },
    checkout: { it: "Procedi al Checkout", en: "Proceed to Checkout" },
    remove: { it: "Rimuovi", en: "Remove" },
  },
  // === CHECKOUT ===
  checkout: {
    title: { it: "Checkout", en: "Checkout" },
    customerInfo: { it: "Informazioni Cliente", en: "Customer Information" },
    name: { it: "Nome Completo", en: "Full Name" },
    email: { it: "Email", en: "Email" },
    phone: { it: "Telefono", en: "Phone" },
    address: { it: "Indirizzo", en: "Address" },
    city: { it: "Città", en: "City" },
    zip: { it: "CAP", en: "ZIP Code" },
    country: { it: "Paese", en: "Country" },
    pay: { it: "Paga con Stripe", en: "Pay with Stripe" },
    processing: { it: "Elaborazione...", en: "Processing..." },
    success: { it: "Ordine Completato!", en: "Order Complete!" },
    successMessage: {
      it: "Grazie per il tuo acquisto! Riceverai una email di conferma a breve.",
      en: "Thank you for your purchase! You will receive a confirmation email shortly.",
    },
    backHome: { it: "Torna alla Home", en: "Back to Home" },
  },
  // === CHI SIAMO ===
  about: {
    title: { it: "Chi Siamo", en: "About Us" },
    intro: {
      it: "TarallOro nasce nel cuore della Puglia, terra di ulivi millenari e tradizioni gastronomiche uniche. La nostra missione è portare i sapori autentici di questa terra meravigliosa direttamente a casa tua.",
      en: "TarallOro was born in the heart of Puglia, a land of ancient olive trees and unique gastronomic traditions. Our mission is to bring the authentic flavors of this wonderful land directly to your home.",
    },
    values: { it: "I Nostri Valori", en: "Our Values" },
    quality: { it: "Qualità", en: "Quality" },
    qualityDesc: {
      it: "Selezioniamo solo i migliori prodotti artigianali, lavorati secondo le tradizioni pugliesi tramandate da generazioni.",
      en: "We select only the best artisan products, crafted according to Pugliese traditions passed down through generations.",
    },
    authenticity: { it: "Autenticità", en: "Authenticity" },
    authenticityDesc: {
      it: "Ogni prodotto è genuino e certificato, proveniente direttamente dai piccoli produttori locali della Puglia.",
      en: "Every product is genuine and certified, sourced directly from small local producers in Puglia.",
    },
    sustainability: { it: "Sostenibilità", en: "Sustainability" },
    sustainabilityDesc: {
      it: "Supportiamo pratiche agricole sostenibili e utilizziamo packaging eco-friendly per rispettare la nostra terra.",
      en: "We support sustainable farming practices and use eco-friendly packaging to respect our land.",
    },
    tradition: { it: "Tradizione", en: "Tradition" },
    traditionDesc: {
      it: "Le nostre ricette e i nostri metodi di produzione sono tramandati da generazioni, preservando l'autenticità dei sapori pugliesi.",
      en: "Our recipes and production methods have been passed down for generations, preserving the authenticity of Pugliese flavors.",
    },
  },
  // === CONTATTI ===
  contact: {
    title: { it: "Contattaci", en: "Contact Us" },
    subtitle: {
      it: "Hai domande? Siamo qui per aiutarti!",
      en: "Have questions? We're here to help!",
    },
    name: { it: "Nome", en: "Name" },
    email: { it: "Email", en: "Email" },
    subject: { it: "Oggetto", en: "Subject" },
    message: { it: "Messaggio", en: "Message" },
    send: { it: "Invia Messaggio", en: "Send Message" },
    sending: { it: "Invio in corso...", en: "Sending..." },
    sent: { it: "Messaggio inviato con successo!", en: "Message sent successfully!" },
    error: { it: "Errore nell'invio. Riprova.", en: "Error sending. Please try again." },
    info: { it: "Informazioni", en: "Information" },
    addressLabel: { it: "Indirizzo", en: "Address" },
    addressValue: { it: "Via dei Taralli 42, 70122 Bari, Puglia", en: "Via dei Taralli 42, 70122 Bari, Puglia" },
    phoneLabel: { it: "Telefono", en: "Phone" },
    emailLabel: { it: "Email", en: "Email" },
    hours: { it: "Orari", en: "Hours" },
    hoursValue: { it: "Lun-Ven: 9:00-18:00", en: "Mon-Fri: 9:00 AM - 6:00 PM" },
  },
  // === ADMIN ===
  admin: {
    login: { it: "Accesso Admin", en: "Admin Login" },
    username: { it: "Nome Utente", en: "Username" },
    password: { it: "Password", en: "Password" },
    enter: { it: "Accedi", en: "Login" },
    dashboard: { it: "Pannello Admin", en: "Admin Dashboard" },
    products: { it: "Prodotti", en: "Products" },
    orders: { it: "Ordini", en: "Orders" },
    messages: { it: "Messaggi", en: "Messages" },
    addProduct: { it: "Aggiungi Prodotto", en: "Add Product" },
    editProduct: { it: "Modifica Prodotto", en: "Edit Product" },
    deleteProduct: { it: "Elimina", en: "Delete" },
    save: { it: "Salva", en: "Save" },
    cancel: { it: "Annulla", en: "Cancel" },
    logout: { it: "Esci", en: "Logout" },
    noOrders: { it: "Nessun ordine ricevuto", en: "No orders received" },
    orderStatus: { it: "Stato", en: "Status" },
    confirmDelete: { it: "Sei sicuro di voler eliminare questo prodotto?", en: "Are you sure you want to delete this product?" },
  },
  // === FOOTER ===
  footer: {
    description: {
      it: "Sapori autentici della Puglia, dalla nostra terra alla tua tavola.",
      en: "Authentic flavors of Puglia, from our land to your table.",
    },
    links: { it: "Link Utili", en: "Quick Links" },
    followUs: { it: "Seguici", en: "Follow Us" },
    rights: { it: "Tutti i diritti riservati.", en: "All rights reserved." },
    privacy: { it: "Privacy Policy", en: "Privacy Policy" },
    terms: { it: "Termini e Condizioni", en: "Terms & Conditions" },
  },
  // === GENERICI ===
  common: {
    loading: { it: "Caricamento...", en: "Loading..." },
    error: { it: "Si è verificato un errore", en: "An error occurred" },
    euro: { it: "€", en: "€" },
  },
} as const;

// Tipo per accedere alle traduzioni in modo sicuro
export type TranslationKey = keyof typeof translations;

// Funzione per ottenere una traduzione
// Uso: t("hero", "title", "it") → "Sapori Autentici della Puglia"
export function t(
  section: keyof typeof translations,
  key: string,
  locale: Locale
): string {
  const sectionData = translations[section] as Record<string, Record<Locale, string>>;
  return sectionData?.[key]?.[locale] ?? key;
}

// Esporta le traduzioni per accesso diretto
export default translations;
