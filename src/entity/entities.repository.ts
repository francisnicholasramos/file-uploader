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

export const createDirectory = async (
    name: string,
    userId: number,
    parentId: number | null
) => {
    return prisma.entity.create({
        data: {
            type: "DIR",
            name,
            userId,
            parentId
        }
    })
}

export const getUserEntities = async (userId: number) => {
  return prisma.entity.findMany({
    where: {userId, parentId: null},
  })
}


export const getFileById = async (id: number) =>
    prisma.entity.findUnique({where: {id, type: 'FILE'} })

export const deleteEntityById = async (id: number) => {
    return prisma.entity.delete({
        where: {
            id,
        }
    })
}


// createDirectory('testDir', 1, null)

