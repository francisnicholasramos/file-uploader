import prisma from "../db/prismaClient";
import type {PathSegmentEntity} from "../types/types.ts";

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

export const getDirEntityById = async (
    id: number,
) => {
    return prisma.entity.findUnique({
        where: { id, type: 'DIR' },
        include: {
            childEntities: true
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

// breadcrumbs
export const getBreadCrumbs = async (entityId?: number) => {
    if (!entityId) return [];

    const pathSegments: {id:number; name:string}[] = []

    let currentId: number | null = entityId;

    while (currentId) {
        const entity: PathSegmentEntity = await prisma.entity.findUnique({
            where: {id: currentId},
            select: {
                id: true,
                name: true,
                parentId: true
            }
        })

        if (entity) {
            pathSegments.unshift({
                id: entity.id,
                name: entity.name
            })
            currentId = entity.parentId
        } else {
            currentId = null;
        }
    }

    return pathSegments;
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

export const isDescendantOf = async (parentId: number, childId: number) => {
    let currentDirectory = await prisma.entity.findUnique({
        where: {id: childId},
        select: {id: true, parentId: true}
    })
    
    while (currentDirectory) {
        // found the target parent
        if (currentDirectory.id === parentId) return true;

        // reached root folder
        if (!currentDirectory.parentId) break;

        // move up to parent 
        currentDirectory = await prisma.entity.findUnique({
            where: {id: currentDirectory.parentId},
            select: {id: true, parentId: true}
        })
    }

    return false;
}


export const getSharedDirectoryById = async (id: string) => {
    return prisma.sharedFolder.findUnique({
        where: {id},
        include: {folder: true}
    })
}

export const createSharedDirectory = async (
    userId: number,
    folderId: number,
    expiresAt: Date
) => {
    return prisma.sharedFolder.create({
        data: {
            userId,
            folderId,
            expiresAt
        }
    })
}

export const getDirectoryContents = async (
    parentId: number | null,
) => {
    return prisma.entity.findMany({
      where: { 
        parentId
      }
    })
}

// test 
// getDirectoryTree(1, null).then(data => {
//     console.dir(data, {depth: null}) // spread nested children
// })

// createDirectory('thirdLevelDir', 1, 23)

