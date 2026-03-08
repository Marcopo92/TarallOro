// Configurazione Stripe per i pagamenti
// Usa un'inizializzazione lazy per evitare errori durante la build
import Stripe from "stripe";

// Funzione che crea l'istanza Stripe solo quando serve
// Questo evita errori se STRIPE_SECRET_KEY non è configurata durante la build
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY non configurata");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export default getStripe;
