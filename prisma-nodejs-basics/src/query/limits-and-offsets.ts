import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info", "query"],
});

async function main() {
  let res = await prisma.post.findMany({
    take: 3, //limit or take
    skip: 10, //offset
  });
  console.log(res);
}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
