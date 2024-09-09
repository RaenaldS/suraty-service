import { PrismaClient } from "@/prisma/generated/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    // globalWithPrisma.prisma = new PrismaClient();
    globalWithPrisma.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
