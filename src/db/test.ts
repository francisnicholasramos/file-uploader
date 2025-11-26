import prisma from "./prismaClient";

async function test(
    name: string,
    size: number,
    mimetype: string,
    userId: number,
    parentId: number | null
) {
    return prisma.entity.create({
        data: {
            type: "FILE", name,
            size,
            mimeType: mimetype,
            userId,
            parentId
        }
    })
}
// test("cat", 2003, "text/html", 2, null)
    // .catch(console.error)
    // .finally(() => prisma.$disconnect())
