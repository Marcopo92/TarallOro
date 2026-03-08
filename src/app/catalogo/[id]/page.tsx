"use client";

// Pagina dettaglio singolo prodotto
// Mostra foto grande, descrizione completa e pulsante aggiungi al carrello

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";

interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export default function ProductPage() {
  const params = useParams();
  const { locale } = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carica il prodotto dal server
  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-brown-light">
        {t("common", "loading", locale)}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-brown-light text-lg">Prodotto non trovato</p>
        <Link href="/catalogo" className="btn-gold mt-4 inline-block">
          {t("product", "back", locale)}
        </Link>
      </div>
    );
  }

  const displayName = locale === "en" && product.nameEn ? product.nameEn : product.name;
  const displayDesc = locale === "en" && product.descriptionEn ? product.descriptionEn : product.description;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Link ritorno al catalogo */}
        <Link
          href="/catalogo"
          className="inline-block mb-8 text-gold hover:text-gold-dark transition-colors font-medium"
        >
          {t("product", "back", locale)}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Immagine grande del prodotto */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-warm-white-dark">
            {product.image && product.image.startsWith("http") ? (
              <Image
                src={product.image}
                alt={displayName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-white to-warm-white-dark">
                <span className="text-9xl">🫓</span>
              </div>
            )}
          </div>

          {/* Dettagli prodotto */}
          <div className="flex flex-col justify-center">
            {/* Categoria */}
            {product.category && (
              <span className="text-sm text-olive font-semibold uppercase tracking-wider mb-2">
                {product.category}
              </span>
            )}

            {/* Nome */}
            <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4">
              {displayName}
            </h1>

            {/* Prezzo */}
            <p className="text-3xl font-bold text-gold mb-6">
              €{product.price.toFixed(2)}
            </p>

            {/* Descrizione */}
            <p className="text-brown-light leading-relaxed text-lg mb-8">
              {displayDesc}
            </p>

            {/* Pulsante aggiungi al carrello */}
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className={`w-full md:w-auto px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
                  added
                    ? "bg-olive text-white"
                    : "bg-gold text-white hover:bg-gold-light hover:shadow-lg"
                }`}
              >
                {added
                  ? `✓ ${t("product", "added", locale)}`
                  : t("product", "addToCart", locale)}
              </button>
            ) : (
              <div className="bg-terracotta/10 text-terracotta px-8 py-4 rounded-xl text-lg font-semibold text-center">
                {t("product", "outOfStock", locale)}
              </div>
            )}

            {/* Info aggiuntive */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-warm-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">📦</div>
                <p className="text-sm text-brown-light">
                  {locale === "it" ? "Spedizione in 2-3 giorni" : "Ships in 2-3 days"}
                </p>
              </div>
              <div className="bg-warm-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">🌿</div>
                <p className="text-sm text-brown-light">
                  {locale === "it" ? "Prodotto artigianale" : "Artisan product"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
