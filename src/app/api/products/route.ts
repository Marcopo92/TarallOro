// API per gestire i prodotti
// GET: ottieni tutti i prodotti (con filtro opzionale per "featured")
// POST: crea un nuovo prodotto (richiede autenticazione admin)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products - Restituisce tutti i prodotti
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  // Se richiesti solo i prodotti in evidenza
  const where = featured === "true" ? { featured: true } : {};

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// POST /api/products - Crea un nuovo prodotto
export async function POST(request: NextRequest) {
  // Verifica autenticazione admin
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      nameEn: body.nameEn || "",
      description: body.description,
      descriptionEn: body.descriptionEn || "",
      price: body.price,
      image: body.image || "",
      category: body.category || "",
      featured: body.featured || false,
      inStock: body.inStock !== false,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
