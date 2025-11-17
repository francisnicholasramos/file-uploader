import { prisma } from "./prismaClient";

async function test(id: number) {
  const user = await prisma.user.findUnique({ where: { id } })
    console.log(user)
}

test(1)
    // .catch(console.error)
    // .finally(() => prisma.$disconnect())
