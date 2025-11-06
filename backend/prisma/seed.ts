import { PrismaClient } from "@prisma/client";
import loginSeed from "./seed/loginSeed";
import categorySeed from "./seed/categorySeed";

const prisma = new PrismaClient();
async function main() {
  // Seed Login accounts
  await categorySeed();
  console.log('Seed completed successfully!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });