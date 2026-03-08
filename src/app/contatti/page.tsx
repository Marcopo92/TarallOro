"use client";

// Pagina Contatti - form di contatto e informazioni

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

export default function ContattiPage() {
  const { locale } = useLocale();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  // Stato del form
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Invio del messaggio
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brown mb-4">
            {t("contact", "title", locale)}
          </h1>
          <p className="text-brown-light text-lg">
            {t("contact", "subtitle", locale)}
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form di contatto */}
          <div>
            {sent ? (
              <div className="bg-olive/10 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-olive font-semibold text-lg">
                  {t("contact", "sent", locale)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown mb-1">
                    {t("contact", "name", locale)} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown mb-1">
                    {t("contact", "email", locale)} *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown mb-1">
                    {t("contact", "subject", locale)}
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown mb-1">
                    {t("contact", "message", locale)} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white resize-none"
                  />
                </div>

                {error && (
                  <p className="text-terracotta text-sm">{t("contact", "error", locale)}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn-gold disabled:opacity-50"
                >
                  {sending ? t("contact", "sending", locale) : t("contact", "send", locale)}
                </button>
              </form>
            )}
          </div>

          {/* Informazioni di contatto */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brown">
              {t("contact", "info", locale)}
            </h2>

            <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="font-semibold text-brown">{t("contact", "addressLabel", locale)}</h3>
                  <p className="text-brown-light">{t("contact", "addressValue", locale)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-semibold text-brown">{t("contact", "phoneLabel", locale)}</h3>
                  <p className="text-brown-light">+39 080 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="font-semibold text-brown">{t("contact", "emailLabel", locale)}</h3>
                  <p className="text-brown-light">info@taralloro.it</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🕐</div>
                <div>
                  <h3 className="font-semibold text-brown">{t("contact", "hours", locale)}</h3>
                  <p className="text-brown-light">{t("contact", "hoursValue", locale)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
