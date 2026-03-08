// API per upload immagini su Cloudinary
// POST: carica un'immagine e restituisce l'URL

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  // Verifica autenticazione admin
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nessun file fornito" }, { status: 400 });
    }

    // Converti il file in buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Carica su Cloudinary
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "taralloro", // Cartella su Cloudinary
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string });
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Errore upload:", error);
    return NextResponse.json(
      { error: "Errore durante il caricamento" },
      { status: 500 }
    );
  }
}
