import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

// Metadati del sito per SEO
export const metadata: Metadata = {
  title: "TarallOro - Sapori Autentici della Puglia",
  description:
    "E-commerce di prodotti tipici pugliesi: taralli artigianali, olio extravergine, burrata e specialità del territorio.",
  keywords: "taralli, puglia, olio extravergine, burrata, prodotti tipici, e-commerce",
};

// Layout principale che avvolge tutte le pagine
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
