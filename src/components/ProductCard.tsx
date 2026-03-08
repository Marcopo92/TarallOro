"use client";

// Card prodotto riutilizzabile per catalogo e homepage
// Mostra immagine, nome, prezzo e pulsante aggiungi al carrello

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

// Tipo per i dati del prodotto
interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  inStock: boolean;
}

export default function ProductCard({
  id,
  name,
  nameEn,
  description,
  descriptionEn,
  price,
  image,
  inStock,
}: ProductCardProps) {
  const { locale } = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  // Nome e descrizione in base alla lingua
  const displayName = locale === "en" && nameEn ? nameEn : name;
  const displayDesc = locale === "en" && descriptionEn ? descriptionEn : description;

  // Funzione per aggiungere al carrello con feedback visivo
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita la navigazione del link
    e.stopPropagation();
    addItem({ id, name, nameEn, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/catalogo/${id}`} className="block">
      <div className="product-card bg-white shadow-md">
        {/* Immagine del prodotto */}
        <div className="relative h-64 overflow-hidden bg-warm-white-dark">
          {image && image.startsWith("http") ? (
            <Image
              src={image}
              alt={displayName}
              fill
              className="product-image object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-white to-warm-white-dark">
              <span className="text-6xl">🫓</span>
            </div>
          )}
          {/* Badge esaurito */}
          {!inStock && (
            <div className="absolute top-3 right-3 bg-terracotta text-white px-3 py-1 rounded-full text-xs font-semibold">
              {t("catalog", "outOfStock", locale)}
            </div>
          )}
        </div>

        {/* Informazioni prodotto */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-brown mb-2 line-clamp-1">
            {displayName}
          </h3>
          <p className="text-sm text-brown-light mb-3 line-clamp-2">
            {displayDesc}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gold">
              €{price.toFixed(2)}
            </span>
            {inStock ? (
              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  added
                    ? "bg-olive text-white"
                    : "bg-gold text-white hover:bg-gold-light"
                }`}
              >
                {added ? t("product", "added", locale) : t("catalog", "addToCart", locale)}
              </button>
            ) : (
              <span className="text-terracotta text-sm font-medium">
                {t("catalog", "outOfStock", locale)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
