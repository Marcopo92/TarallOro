"use client";

// Pagina carrello - mostra il riepilogo dell'ordine
// Permette di modificare quantità e rimuovere prodotti

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const { locale } = useLocale();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  const subtotal = getTotal();
  const shipping = subtotal >= 50 ? 0 : 5; // Spedizione gratuita sopra €50
  const total = subtotal + shipping;

  // Se il carrello è vuoto
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-brown mb-4">
          {t("cart", "empty", locale)}
        </h1>
        <Link href="/catalogo" className="btn-gold inline-block">
          {t("cart", "continueShopping", locale)}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-8">
          {t("cart", "title", locale)}
        </h1>

        {/* Lista prodotti nel carrello */}
        <div className="space-y-4 mb-8">
          {items.map((item) => {
            const displayName = locale === "en" && item.nameEn ? item.nameEn : item.name;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center gap-4"
              >
                {/* Icona prodotto */}
                <div className="w-20 h-20 rounded-lg bg-warm-white-dark flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🫓</span>
                </div>

                {/* Nome e prezzo */}
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-semibold text-brown text-lg">{displayName}</h3>
                  <p className="text-gold font-bold">€{item.price.toFixed(2)}</p>
                </div>

                {/* Controllo quantità */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-warm-white-dark text-brown hover:bg-gold hover:text-white transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-brown w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-warm-white-dark text-brown hover:bg-gold hover:text-white transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Totale riga */}
                <div className="text-right min-w-[80px]">
                  <p className="font-bold text-brown">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Pulsante rimuovi */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-terracotta hover:text-terracotta-dark transition-colors"
                  title={t("cart", "remove", locale)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Riepilogo totali */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-brown">
              <span>{t("cart", "subtotal", locale)}</span>
              <span className="font-semibold">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brown">
              <span>{t("cart", "shipping", locale)}</span>
              <span className="font-semibold">
                {shipping === 0
                  ? t("cart", "shippingFree", locale)
                  : `€${shipping.toFixed(2)}`}
              </span>
            </div>
            <hr className="border-warm-white-dark" />
            <div className="flex justify-between text-brown text-xl font-bold">
              <span>{t("cart", "orderTotal", locale)}</span>
              <span className="text-gold">€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Bottoni azione */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/catalogo"
              className="btn-olive text-center flex-1"
            >
              {t("cart", "continueShopping", locale)}
            </Link>
            <Link
              href="/checkout"
              className="btn-gold text-center flex-1"
            >
              {t("cart", "checkout", locale)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
