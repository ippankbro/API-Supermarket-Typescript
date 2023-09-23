import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// entry purchasing
export async function entryPurchasing(data: []) {
  const create = await prisma.purchase.createMany({ data: data });
}
