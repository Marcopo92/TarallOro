// Webhook Stripe per conferma pagamento
// Riceve notifiche da Stripe quando un pagamento è completato

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getStripe from "@/lib/stripe";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  // Se il webhook secret non è configurato, ignora
  if (!process.env.STRIPE_WEBHOOK_SECRET || !sig) {
    return NextResponse.json({ received: true });
  }

  let event;

  try {
    // Verifica la firma del webhook per sicurezza
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Errore verifica webhook:", err);
    return NextResponse.json({ error: "Firma non valida" }, { status: 400 });
  }

  // Gestisci l'evento di pagamento completato
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Aggiorna lo stato dell'ordine a "paid"
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // Invia email di conferma ordine
      await sendOrderConfirmation({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderId: order.id,
        total: order.total,
        items: order.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }
  }

  return NextResponse.json({ received: true });
}
