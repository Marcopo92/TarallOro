"use client";

// Contesto React per gestire la lingua corrente del sito
// Permette di cambiare lingua da qualsiasi componente

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale } from "./i18n";

// Tipo del contesto
interface LocaleContextType {
  locale: Locale; // Lingua corrente
  setLocale: (locale: Locale) => void; // Funzione per cambiare lingua
}

// Crea il contesto con valori predefiniti
const LocaleContext = createContext<LocaleContextType>({
  locale: "it",
  setLocale: () => {},
});

// Provider che avvolge l'app e fornisce la lingua a tutti i componenti figli
export function LocaleProvider({ children }: { children: ReactNode }) {
  // Stato della lingua, inizia con italiano
  const [locale, setLocale] = useState<Locale>("it");

  // Al primo caricamento, controlla se c'è una preferenza salvata
  useEffect(() => {
    const saved = localStorage.getItem("taralloro-locale") as Locale;
    if (saved === "it" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  // Quando cambia la lingua, salva la preferenza
  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("taralloro-locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook personalizzato per usare la lingua nei componenti
// Uso: const { locale, setLocale } = useLocale();
export function useLocale() {
  return useContext(LocaleContext);
}
