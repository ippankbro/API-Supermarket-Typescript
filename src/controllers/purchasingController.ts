import { PrismaClient, Purchase } from "@prisma/client";
const prisma = new PrismaClient();

export async function entryPurchasing(data: Purchase[]) {
  const create = await prisma.purchase.createMany({ data: data });
}
