"use client";

// Homepage di TarallOro
// Include hero, prodotti in evidenza e storia del brand

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";

// Tipo per i prodotti dal database
interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  inStock: boolean;
  featured: boolean;
}

export default function Home() {
  const { locale } = useLocale();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Carica i prodotti in evidenza dal server
  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => setFeaturedProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* === SEZIONE HERO === */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Sfondo con gradiente mediterraneo */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-white via-cream to-warm-white-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-terracotta rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gold">Tarall</span>
            <span className="text-terracotta">O</span>
            <span className="text-gold">ro</span>
          </h1>

          <p className="text-xl md:text-2xl text-brown-light mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t("hero", "subtitle", locale)}
          </p>

          <Link
            href="/catalogo"
            className="btn-gold text-lg animate-fade-in-up inline-block"
            style={{ animationDelay: "0.4s" }}
          >
            {t("hero", "cta", locale)}
          </Link>

          <div className="mt-12 flex justify-center space-x-8 text-4xl animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <span>🫓</span>
            <span>🫒</span>
            <span>🧀</span>
            <span>🍅</span>
            <span>🍯</span>
          </div>
        </div>
      </section>

      {/* === SEZIONE PRODOTTI IN EVIDENZA === */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
              {t("featured", "title", locale)}
            </h2>
            <p className="text-brown-light max-w-2xl mx-auto">
              {t("featured", "subtitle", locale)}
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gold rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/catalogo" className="btn-olive">
              {t("hero", "cta", locale)}
            </Link>
          </div>
        </div>
      </section>

      {/* === SEZIONE STORIA DEL BRAND === */}
      <section className="py-20 px-4 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-gold/20 to-olive/20 rounded-2xl p-8 text-center">
                <div className="text-8xl mb-4">🌿</div>
                <div className="text-6xl mb-4">🫒</div>
                <div className="text-4xl">☀️</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brown mb-6">
                {t("story", "title", locale)}
              </h2>
              <p className="text-brown-light leading-relaxed text-lg mb-6">
                {t("story", "text", locale)}
              </p>
              <Link href="/chi-siamo" className="btn-gold">
                {t("story", "cta", locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === BANNER SPEDIZIONE === */}
      <section className="py-12 bg-olive text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-semibold text-lg">
                {locale === "it" ? "Spedizione Gratuita" : "Free Shipping"}
              </h3>
              <p className="text-sm opacity-80">
                {locale === "it" ? "Per ordini sopra €50" : "On orders over €50"}
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold text-lg">
                {locale === "it" ? "Pagamento Sicuro" : "Secure Payment"}
              </h3>
              <p className="text-sm opacity-80">
                {locale === "it" ? "Con Stripe" : "With Stripe"}
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🌿</div>
              <h3 className="font-semibold text-lg">
                {locale === "it" ? "100% Artigianale" : "100% Artisan"}
              </h3>
              <p className="text-sm opacity-80">
                {locale === "it" ? "Fatto in Puglia" : "Made in Puglia"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
