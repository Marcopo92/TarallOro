"use client";

// Pagina checkout - form dati cliente e pagamento con Stripe

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";

export default function CheckoutPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  // Stato del form
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "IT",
  });

  const subtotal = getTotal();
  const shipping = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shipping;

  // Gestione invio form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Invia i dati al server per creare la sessione Stripe
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          customer: form,
          total,
          shipping,
          locale,
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect alla pagina di pagamento Stripe
        clearCart();
        window.location.href = data.url;
      } else if (data.orderId) {
        // In modalità demo (senza Stripe configurato), vai direttamente alla pagina di successo
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      }
    } catch (error) {
      console.error("Errore checkout:", error);
      setLoading(false);
    }
  };

  // Se il carrello è vuoto, reindirizza al catalogo
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-brown-light text-lg mb-4">
          {t("cart", "empty", locale)}
        </p>
        <button onClick={() => router.push("/catalogo")} className="btn-gold">
          {t("cart", "continueShopping", locale)}
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-8">
          {t("checkout", "title", locale)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form dati cliente */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-brown mb-4">
              {t("checkout", "customerInfo", locale)}
            </h2>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                {t("checkout", "name", locale)} *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                {t("checkout", "email", locale)} *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>

            {/* Telefono */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                {t("checkout", "phone", locale)}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>

            {/* Indirizzo */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                {t("checkout", "address", locale)} *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>

            {/* Città e CAP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-1">
                  {t("checkout", "city", locale)} *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-1">
                  {t("checkout", "zip", locale)} *
                </label>
                <input
                  type="text"
                  required
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                />
              </div>
            </div>

            {/* Bottone pagamento */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? t("checkout", "processing", locale)
                : `${t("checkout", "pay", locale)} - €${total.toFixed(2)}`}
            </button>
          </form>

          {/* Riepilogo ordine */}
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-brown mb-4">
              {t("cart", "title", locale)}
            </h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => {
                const displayName = locale === "en" && item.nameEn ? item.nameEn : item.name;
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brown">
                      {displayName} × {item.quantity}
                    </span>
                    <span className="font-semibold text-brown">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <hr className="border-warm-white-dark my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-brown">
                <span>{t("cart", "subtotal", locale)}</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-brown">
                <span>{t("cart", "shipping", locale)}</span>
                <span>{shipping === 0 ? t("cart", "shippingFree", locale) : `€${shipping.toFixed(2)}`}</span>
              </div>
              <hr className="border-warm-white-dark" />
              <div className="flex justify-between text-lg font-bold text-brown">
                <span>{t("cart", "orderTotal", locale)}</span>
                <span className="text-gold">€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
