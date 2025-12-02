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

export const getDirectoryTree = async (
    userId: number | undefined,
    parentId: number | null
) => {
    const allDirectories = await prisma.entity.findMany({
        where: { 
            userId,
            type: 'DIR'
        },
        select: {
            id: true,
            name: true,
            parentId: true
        }
    })

    const dirMap = new Map()

    for (const dir of allDirectories) {
        dirMap.set(dir.id, {
            id: dir.id,
            name: dir.name,
            childEntities: []
        })
    }

    const directoryTree = [];

    for (const dir of allDirectories) {
        const dirEntity = dirMap.get(dir.id)

        if (!dirEntity) continue

        if (dir.parentId) {
            const parent = dirMap.get(dir.parentId)
            if (parent) parent.childEntities.push(dirEntity)
        } else {
            directoryTree.push(dirEntity)
        }
    }

    if (parentId !== null) {
        const dirParent = dirMap.get(parentId)
        return dirParent ? dirParent.childEntities : []
    }

    return directoryTree;
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

// test 
getDirectoryTree(1, null).then(data => {
    console.dir(data, {depth: null}) // spread nested childs
})

// createDirectory('secondLevelDir', 1, 6)

