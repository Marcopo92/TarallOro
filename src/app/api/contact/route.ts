// API per gestire i messaggi di contatto
// POST: invia un nuovo messaggio
// GET: ottieni tutti i messaggi (solo admin)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/contact - Salva un messaggio di contatto
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validazione base dei campi obbligatori
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 }
    );
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: body.name,
      email: body.email,
      subject: body.subject || "",
      message: body.message,
    },
  });

  return NextResponse.json(message, { status: 201 });
}

// GET /api/contact - Restituisce tutti i messaggi (solo admin)
export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}
