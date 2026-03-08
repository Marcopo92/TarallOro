// API per l'autenticazione admin
// POST: login con username e password

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.action === "login") {
    const { username, password } = body;

    // Cerca l'admin nel database
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    // Verifica la password con bcrypt
    const valid = await bcryptjs.compare(password, admin.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    // Genera un token semplice per la sessione
    const token = crypto.randomBytes(32).toString("hex");

    return NextResponse.json({ token, message: "Login riuscito" });
  }

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}
