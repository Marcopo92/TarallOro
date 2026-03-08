"use client";

// Pagina di conferma ordine riuscito

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

function SuccessContent() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4">
          {t("checkout", "success", locale)}
        </h1>
        <p className="text-brown-light text-lg mb-2">
          {t("checkout", "successMessage", locale)}
        </p>
        {orderId && (
          <p className="text-gold font-semibold mb-8">
            {locale === "it" ? "Numero ordine" : "Order number"}: #
            {orderId.slice(-8).toUpperCase()}
          </p>
        )}
        <Link href="/" className="btn-gold inline-block">
          {t("checkout", "backHome", locale)}
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-brown-light">Caricamento...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
