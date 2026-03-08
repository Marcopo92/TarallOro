// Client Prisma singleton
// Evita di creare troppe connessioni al database durante lo sviluppo
import { PrismaClient } from "@prisma/client";

// Variabile globale per mantenere il client tra i ricaricamenti
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Usa il client esistente o creane uno nuovo
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In sviluppo, salva il client nella variabile globale
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
