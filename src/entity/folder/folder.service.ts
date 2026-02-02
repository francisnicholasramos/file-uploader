import type {Prisma} from "@prisma/client";
import createError from "http-errors";
import {getOrderBy} from "../../utils/getOrderBy";
import {
    getUserEntities,
    getDirEntityById,
    getDirectoryTree,
    getBreadCrumbs,
    getDirectoryContents,
} from "../entities.repository";

export const getRootFolderData = async (
    userId: number,
    sortOption: Prisma.EntityOrderByWithRelationInput[] | undefined
) => {
    const entities = await getUserEntities(userId, sortOption)

    if (!entities) throw new createError.NotFound();

    const sortQuery = getOrderBy(sortOption)

    const pathSegments = await getBreadCrumbs()

    const directories = await getDirectoryTree(userId, null)

    return { 
        entities, 
        pathSegments, 
        sortQuery,
        directories 
    };
}

export const getFolderEntities = async (
    folderId: number,
    userId: number,
    sortOption: Prisma.EntityOrderByWithRelationInput[] | undefined
) => {
    const dir = await getDirEntityById(folderId, sortOption) 

    if (!dir) throw new createError.NotFound()

    const {childEntities, parentId} = dir
    const sortQuery = getOrderBy(sortOption)
    const directories = await getDirectoryTree(userId, null)
    const pathSegments = await getBreadCrumbs(folderId)

    return {
        entities: childEntities,
        pathSegments,
        directories,
        sortQuery,
        parentId
    }

}

export const getPublicDirectoryData = async (
    userId: number,
    rootFolderId: number,
    folderId: number,
    sortOption: Prisma.EntityOrderByWithRelationInput[] | undefined
) => {
    const entities = await getDirectoryContents(folderId, sortOption)

    if (!entities) throw new createError.NotFound()

    const sortQuery = getOrderBy(sortOption)
    
    const pathSegments = await getBreadCrumbs(folderId)

    const directories = await getDirectoryTree(userId, rootFolderId)

    return {
        entities,
        pathSegments,
        directories,
        sortQuery
    }
}

