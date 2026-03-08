"use client";

// Pagina "Chi Siamo" - storia e valori di TarallOro

import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

export default function ChiSiamoPage() {
  const { locale } = useLocale();

  // Array di valori con icone
  const values = [
    { key: "quality", icon: "⭐" },
    { key: "authenticity", icon: "🏆" },
    { key: "sustainability", icon: "🌱" },
    { key: "tradition", icon: "👨‍🍳" },
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="py-20 px-4 bg-gradient-to-br from-warm-white to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brown mb-6">
            {t("about", "title", locale)}
          </h1>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto mb-8" />
          <p className="text-lg md:text-xl text-brown-light leading-relaxed max-w-3xl mx-auto">
            {t("about", "intro", locale)}
          </p>
        </div>
      </section>

      {/* Immagine decorativa */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-olive/10 via-gold/10 to-terracotta/10 rounded-2xl p-12 text-center">
            <div className="flex justify-center space-x-6 text-6xl mb-6">
              <span>🫒</span>
              <span>🌾</span>
              <span>☀️</span>
              <span>🏡</span>
            </div>
            <p className="text-brown-light italic text-lg">
              {locale === "it"
                ? '"Dalla terra del sole, con amore e tradizione"'
                : '"From the land of sunshine, with love and tradition"'}
            </p>
          </div>
        </div>
      </section>

      {/* Sezione valori */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-brown text-center mb-12">
            {t("about", "values", locale)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.key}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-brown mb-3">
                  {t("about", value.key, locale)}
                </h3>
                <p className="text-brown-light leading-relaxed">
                  {t("about", `${value.key}Desc`, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 bg-olive text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {locale === "it"
              ? "Pronto a scoprire i sapori della Puglia?"
              : "Ready to discover the flavors of Puglia?"}
          </h2>
          <p className="text-lg opacity-80 mb-8">
            {locale === "it"
              ? "Esplora il nostro catalogo e porta la Puglia a casa tua."
              : "Explore our catalog and bring Puglia to your home."}
          </p>
          <a href="/catalogo" className="btn-gold">
            {t("hero", "cta", locale)}
          </a>
        </div>
      </section>
    </div>
  );
}
