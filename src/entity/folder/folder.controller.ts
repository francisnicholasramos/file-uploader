import {Request, Response, NextFunction} from "express";
import {getRootFolderData, getFolderEntities} from "./folder.service";
import {createDirectory, 
        getDirectoryById, 
        deleteEntityById
} from "../../entity/entities.repository";
import {storage} from "../../storage/storage.repository";
import {getAllChildren} from "../../entity/entities.repository";
import {formatDate} from "../../utils/formatDate";
import {formatBytes} from "../../utils/formatBytes";
import createError from "http-errors";

export const getFolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.id) throw new createError.Unauthorized();

        const { id, username } = req.user

        const folderId = Number(req.params.folderId)

        const rootDirectory = {id: null, name: username}

        const entities = !folderId 
            ? await getRootFolderData(id)
            : await getFolderEntities(folderId, id)

        res.render("index", {
            folderId,
            ...entities,
            rootDirectory,
            baseUrl: '/storage',
            formatDate,
            formatBytes
        })

    } catch (error) {
        next(error);
    }
};

export const handleCreateDirectory = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) throw new createError.Unauthorized();

        const directory = req.body.dir || 'Untitled folder'

        const parentId = Number(req.body.parentId) || null

        await createDirectory(directory, userId, parentId);

        res.redirect(`/storage/${parentId || ''}`)

    } catch (error) {
        next(error) 
    }

}

export const handleDeleteDirectory = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) throw new createError.Unauthorized();

        const folderId = Number(req.params.folderId);

        const folder = await getDirectoryById(folderId);

        if (!folder) throw new createError.NotFound();

        // recursively delete all children
        const filenames = await getAllChildren(userId, folderId)
        const bucketName = process.env.SUPABASE_BUCKET || ''
        for (const filename of filenames) {
            await storage.deleteFile(bucketName, `${userId}/${filename}`)
        }

        await deleteEntityById(folderId)

        res.redirect(`/storage/${folder.parentId}/?success=${encodeURIComponent(`deleted folder=${folder.name}`)}`)
    } catch (err) {
        next(err)
    }
}
