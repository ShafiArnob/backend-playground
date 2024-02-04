import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  await prisma.post.create({
    data: {
      title: "title of post",
      content: "lorem 100",
      author: {
        connect: {
          id: 1,
        },
      },
      // or
      // authorId: 1
    },
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
