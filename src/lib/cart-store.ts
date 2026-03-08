"use client";

// Store del carrello con Zustand
// Gestisce lo stato del carrello: aggiunta, rimozione, modifica quantità

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo per un elemento nel carrello
export interface CartItem {
  id: string; // ID del prodotto
  name: string; // Nome del prodotto
  nameEn: string; // Nome in inglese
  price: number; // Prezzo unitario
  image: string; // URL immagine
  quantity: number; // Quantità nel carrello
}

// Tipo dello store del carrello
interface CartStore {
  items: CartItem[]; // Lista prodotti nel carrello
  addItem: (item: Omit<CartItem, "quantity">) => void; // Aggiungi un prodotto
  removeItem: (id: string) => void; // Rimuovi un prodotto
  updateQuantity: (id: string, quantity: number) => void; // Modifica quantità
  clearCart: () => void; // Svuota il carrello
  getTotal: () => number; // Calcola il totale
  getItemCount: () => number; // Conta gli elementi
}

// Crea lo store con persistenza in localStorage
// I dati del carrello rimangono anche chiudendo il browser
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Aggiungi un prodotto al carrello
      // Se il prodotto è già presente, aumenta la quantità
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      // Rimuovi un prodotto dal carrello
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      // Aggiorna la quantità di un prodotto
      // Se la quantità è 0 o meno, rimuovi il prodotto
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        }));
      },

      // Svuota completamente il carrello
      clearCart: () => set({ items: [] }),

      // Calcola il totale del carrello
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      // Conta il numero totale di prodotti nel carrello
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "taralloro-cart", // Nome della chiave in localStorage
    }
  )
);
