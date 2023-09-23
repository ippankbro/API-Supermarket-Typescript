import { PrismaClient } from "@prisma/client";
import dataBarang from "./dataBarang.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.barang.createMany({
    data: dataBarang,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
