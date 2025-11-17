import prisma from "../db/prismaClient";

export const createFile = async (
    name: string,
    mimetype: string,
    size: number,
    userId: number,
    parentId: number | null
) => {
    return prisma.entity.create({
        data: {
            type: "FILE",
            name, 
            mimeType: mimetype,
            size,
            parentId,
            userId,
        }
    })
}
