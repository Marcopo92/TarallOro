// Script per popolare il database con i dati iniziali
// Eseguire con: npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inizio seeding del database...");

  // Crea l'utente admin con password hashata
  const hashedPassword = await bcryptjs.hash(
    process.env.ADMIN_PASSWORD || "taralloro2024",
    10
  );
  await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || "admin" },
    update: { password: hashedPassword },
    create: {
      username: process.env.ADMIN_USERNAME || "admin",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin creato (user: admin, pass: taralloro2024)");

  // Prodotti di esempio - specialità pugliesi
  const products = [
    { name: "Taralli Classici all'Olio", nameEn: "Classic Olive Oil Taralli", description: "I nostri taralli classici, preparati con olio extravergine d'oliva pugliese DOP. Croccanti e fragranti, perfetti per ogni occasione.", descriptionEn: "Our classic taralli, made with Pugliese DOP extra virgin olive oil. Crispy and fragrant, perfect for any occasion.", price: 6.5, category: "Taralli", featured: true, image: "" },
    { name: "Taralli al Peperoncino", nameEn: "Chili Pepper Taralli", description: "Taralli artigianali con peperoncino calabrese piccante. Il giusto equilibrio tra croccantezza e calore.", descriptionEn: "Artisan taralli with spicy Calabrian chili pepper. The perfect balance between crunch and heat.", price: 7.0, category: "Taralli", featured: true, image: "" },
    { name: "Taralli al Finocchio", nameEn: "Fennel Seed Taralli", description: "Taralli delicati aromatizzati con semi di finocchio selvatico raccolto nelle campagne pugliesi.", descriptionEn: "Delicate taralli flavored with wild fennel seeds harvested from the Pugliese countryside.", price: 7.0, category: "Taralli", featured: false, image: "" },
    { name: "Olio Extravergine d'Oliva DOP", nameEn: "DOP Extra Virgin Olive Oil", description: "Olio extravergine d'oliva da olive Coratina, spremuto a freddo. Sapore intenso e fruttato. Bottiglia da 500ml.", descriptionEn: "Extra virgin olive oil from Coratina olives, cold-pressed. Intense and fruity flavor. 500ml bottle.", price: 14.9, category: "Olio", featured: true, image: "" },
    { name: "Burrata Fresca", nameEn: "Fresh Burrata", description: "Burrata artigianale di Andria, dal cuore cremoso e filante. Preparata ogni giorno con latte fresco. Peso: 250g.", descriptionEn: "Artisan burrata from Andria, with a creamy, stringy heart. Prepared daily with fresh milk. Weight: 250g.", price: 8.5, category: "Latticini", featured: true, image: "" },
    { name: "Friselle Integrali", nameEn: "Whole Wheat Friselle", description: "Friselle di grano duro integrale, cotte nel forno a legna. Ideali con pomodorini freschi, olio e origano.", descriptionEn: "Whole wheat friselle, baked in a wood-fired oven. Ideal with fresh cherry tomatoes, oil, and oregano.", price: 5.5, category: "Pane", featured: false, image: "" },
    { name: "Pasta di Semola Orecchiette", nameEn: "Semolina Orecchiette Pasta", description: "Orecchiette fatte a mano con semola di grano duro pugliese. Confezione da 500g.", descriptionEn: "Handmade orecchiette with Pugliese durum wheat semolina. 500g package.", price: 4.9, category: "Pasta", featured: false, image: "" },
    { name: "Pomodorini Secchi sott'Olio", nameEn: "Sun-Dried Tomatoes in Oil", description: "Pomodorini del Salento essiccati al sole e conservati in olio extravergine d'oliva con aglio e origano.", descriptionEn: "Salento cherry tomatoes sun-dried and preserved in extra virgin olive oil with garlic and oregano.", price: 9.9, category: "Conserve", featured: false, image: "" },
    { name: "Tarallini al Rosmarino", nameEn: "Rosemary Mini Taralli", description: "Piccoli taralli croccanti al profumo di rosmarino fresco. Ideali per aperitivi.", descriptionEn: "Small crispy taralli with fresh rosemary aroma. Ideal for aperitifs.", price: 5.9, category: "Taralli", featured: false, image: "" },
    { name: "Miele di Fiori d'Arancio", nameEn: "Orange Blossom Honey", description: "Miele artigianale prodotto da api del Gargano. Dolce e profumato. Vasetto da 300g.", descriptionEn: "Artisan honey from Gargano bees. Sweet and fragrant. 300g jar.", price: 11.5, category: "Dolci", featured: false, image: "" },
  ];

  // Inserisci i prodotti nel database
  await prisma.product.deleteMany();
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`✅ ${products.length} prodotti creati`);

  console.log("🎉 Seeding completato!");
}

main()
  .catch((e) => {
    console.error("❌ Errore durante il seeding:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
