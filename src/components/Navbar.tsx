"use client";

// Barra di navigazione principale del sito
// Include il logo, i link di navigazione, il selettore lingua e il carrello

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";

export default function Navbar() {
  // Stato per il menu mobile (hamburger)
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const itemCount = useCartStore((s) => s.getItemCount());

  // Link di navigazione
  const links = [
    { href: "/", label: t("nav", "home", locale) },
    { href: "/catalogo", label: t("nav", "catalog", locale) },
    { href: "/chi-siamo", label: t("nav", "about", locale) },
    { href: "/contatti", label: t("nav", "contact", locale) },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gold">
              Tarall<span className="text-terracotta">O</span>ro
            </span>
          </Link>

          {/* Link navigazione desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brown hover:text-gold transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Azioni: lingua, carrello, admin */}
          <div className="flex items-center space-x-4">
            {/* Selettore lingua IT/EN */}
            <div className="flex items-center bg-warm-white-dark rounded-full p-1">
              <button
                onClick={() => setLocale("it")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  locale === "it"
                    ? "bg-gold text-white"
                    : "text-brown-light hover:text-gold"
                }`}
              >
                IT
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  locale === "en"
                    ? "bg-gold text-white"
                    : "text-brown-light hover:text-gold"
                }`}
              >
                EN
              </button>
            </div>

            {/* Icona carrello con contatore */}
            <Link
              href="/carrello"
              className="relative text-brown hover:text-gold transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Bottone menu mobile */}
            <button
              className="md:hidden text-brown"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-warm-white-dark">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-brown hover:text-gold transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
