// Configurazione Stripe per i pagamenti
import Stripe from "stripe";

// Inizializza Stripe con la chiave segreta dal file .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default stripe;
