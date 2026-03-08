"use client";

// Layout client-side che fornisce il contesto della lingua
// e include navbar e footer su tutte le pagine

import { LocaleProvider } from "@/lib/locale-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
