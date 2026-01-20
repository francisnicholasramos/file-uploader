import createError from "http-errors";
import {
    getUserEntities,
    getDirEntityById,
    getDirectoryTree,
    getBreadCrumbs,
    getDirectoryContents,
} from "../entities.repository";

export const getRootFolderData = async (userId: number) => {
    const entities = await getUserEntities(userId)

    if (!entities) throw new createError.NotFound();

    const pathSegments = await getBreadCrumbs()

    const directories = await getDirectoryTree(userId, null)

    return { 
        entities, 
        pathSegments, 
        directories 
    };
}

export const getFolderEntities = async (
    folderId: number,
    userId: number,
) => {
    const dir = await getDirEntityById(folderId) 

    if (!dir) throw new createError.NotFound()

    const {childEntities, parentId} = dir
    const directories = await getDirectoryTree(userId, null)
    const pathSegments = await getBreadCrumbs(folderId)

    return {
        entities: childEntities,
        pathSegments,
        directories,
        parentId
    }

}

export const getPublicDirectoryData = async (
    userId: number,
    folderId: number,
    rootFolderId: number
) => {
    const entities = await getDirectoryContents(folderId)

    if (!entities) throw new createError.NotFound()

    const pathSegments = await getBreadCrumbs(folderId)

    const directories = await getDirectoryTree(userId, rootFolderId)

    return {
        entities,
        pathSegments,
        directories
    }
}

