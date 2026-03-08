"use client";

// Pagina catalogo - mostra tutti i prodotti in una griglia
// Con filtro per categoria

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";

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

export default function CatalogoPage() {
  const { locale } = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Carica tutti i prodotti
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        // Estrai le categorie uniche
        const cats = [...new Set(data.map((p) => p.category).filter(Boolean))];
        setCategories(cats);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Filtra i prodotti per categoria
  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Intestazione */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4">
            {t("catalog", "title", locale)}
          </h1>
          <p className="text-brown-light max-w-2xl mx-auto text-lg">
            {t("catalog", "subtitle", locale)}
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Filtri categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-gold text-white"
                : "bg-white text-brown border border-warm-white-dark hover:border-gold"
            }`}
          >
            {t("catalog", "all", locale)}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gold text-white"
                  : "bg-white text-brown border border-warm-white-dark hover:border-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia prodotti */}
        {loading ? (
          <div className="text-center py-20 text-brown-light">
            {t("common", "loading", locale)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-brown-light">
            {t("catalog", "noProducts", locale)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
