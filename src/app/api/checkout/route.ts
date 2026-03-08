// API per il checkout e pagamento con Stripe
// POST: crea una sessione di pagamento Stripe e un ordine nel database

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getStripe from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, customer, total, shipping, locale } = body;

  try {
    // Crea l'ordine nel database
    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || "",
        shippingAddress: customer.address,
        shippingCity: customer.city,
        shippingZip: customer.zip,
        shippingCountry: customer.country || "IT",
        total,
        status: "pending",
        items: {
          create: items.map((item: { id: string; price: number; quantity: number }) => ({
            productId: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Verifica se Stripe è configurato
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.startsWith("sk_test_your")
    ) {
      // Modalità demo: segna l'ordine come pagato direttamente
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "paid" },
      });

      return NextResponse.json({
        orderId: order.id,
        message: "Ordine creato in modalità demo (Stripe non configurato)",
      });
    }

    // Crea la sessione Stripe Checkout
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customer.email,
      // Elementi della sessione di pagamento
      line_items: items.map(
        (item: { name: string; price: number; quantity: number; image: string }) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              ...(item.image && item.image.startsWith("http")
                ? { images: [item.image] }
                : {}),
            },
            unit_amount: Math.round(item.price * 100), // Stripe usa i centesimi
          },
          quantity: item.quantity,
        })
      ),
      // Aggiunge la spedizione se non gratuita
      ...(shipping > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount" as const,
                  fixed_amount: { amount: shipping * 100, currency: "eur" },
                  display_name:
                    locale === "it" ? "Spedizione standard" : "Standard shipping",
                },
              },
            ],
          }
        : {}),
      // URL di ritorno dopo pagamento
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/carrello`,
      metadata: {
        orderId: order.id,
      },
    });

    // Salva l'ID della sessione Stripe nell'ordine
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Errore checkout:", error);
    return NextResponse.json(
      { error: "Errore durante il checkout" },
      { status: 500 }
    );
  }
}
