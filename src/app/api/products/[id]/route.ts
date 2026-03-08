// API per singolo prodotto
// GET: dettaglio prodotto
// PUT: modifica prodotto (richiede auth)
// DELETE: elimina prodotto (richiede auth)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[id] - Restituisce un singolo prodotto
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/[id] - Modifica un prodotto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      nameEn: body.nameEn,
      description: body.description,
      descriptionEn: body.descriptionEn,
      price: body.price,
      image: body.image,
      category: body.category,
      featured: body.featured,
      inStock: body.inStock,
    },
  });

  return NextResponse.json(product);
}

// DELETE /api/products/[id] - Elimina un prodotto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
