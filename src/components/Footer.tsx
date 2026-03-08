"use client";

// Footer del sito con informazioni, link e social

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-brown text-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonna brand */}
          <div>
            <h3 className="text-2xl font-bold text-gold-light mb-4">
              Tarall<span className="text-terracotta-light">O</span>ro
            </h3>
            <p className="text-warm-white-dark text-sm leading-relaxed">
              {t("footer", "description", locale)}
            </p>
          </div>

          {/* Colonna link */}
          <div>
            <h4 className="text-gold-light font-semibold mb-4">
              {t("footer", "links", locale)}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-warm-white-dark hover:text-gold-light transition-colors text-sm">
                  {t("nav", "catalog", locale)}
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="text-warm-white-dark hover:text-gold-light transition-colors text-sm">
                  {t("nav", "about", locale)}
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-warm-white-dark hover:text-gold-light transition-colors text-sm">
                  {t("nav", "contact", locale)}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-warm-white-dark hover:text-gold-light transition-colors text-sm">
                  {t("nav", "admin", locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna contatti */}
          <div>
            <h4 className="text-gold-light font-semibold mb-4">
              {t("contact", "info", locale)}
            </h4>
            <div className="space-y-2 text-sm text-warm-white-dark">
              <p>Via dei Taralli 42, 70122 Bari</p>
              <p>+39 080 123 4567</p>
              <p>info@taralloro.it</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-brown-light text-center text-sm text-warm-white-dark">
          <p>© {new Date().getFullYear()} TarallOro. {t("footer", "rights", locale)}</p>
        </div>
      </div>
    </footer>
  );
}
