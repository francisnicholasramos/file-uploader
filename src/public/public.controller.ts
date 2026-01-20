import {Request, Response, NextFunction} from "express";
import {storage} from "../storage/storage.repository";
import {defaultErrorQuery} from "../utils/errorMessages";
import createError from "http-errors";
import {getPublicDirectoryData} from "../entity/folder/folder.service";

export const publicDirectoryUrl = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try {
        const sharedDirectoryId = req.params.sharedDirectoryId

        const {sharedFolder} = req

        if (!sharedFolder) throw new createError.NotFound()

        const folderId = req.params.folderId
                         ? Number(req.params.folderId)
                         : sharedFolder.folderId

        const rootDirectory = {
            id: sharedFolder.folder.id,
            name: sharedFolder.folder.name
        }

        const publicDirectoryData = await getPublicDirectoryData(
            sharedFolder.userId,
            rootDirectory.id,
            folderId
        )

        res.render("public", {
            title: 'Public',
            sharedDirectoryId,
            folderId,
            rootDirectory,
            ...publicDirectoryData,
            baseUrl: `/public/${sharedDirectoryId}`,
        })

    } catch (error) {
        next(error)
    }
}

export const publicFileUrl = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try { 
        const {sharedFolder} = req;

        const {filename, parentId} = req.query;

        const userId = sharedFolder.userId;
        const filepath = `${userId}/${filename}`

        const publicUrl = await storage.getFileUrl(filepath, 60, {download: true})

        if (publicUrl) {
            res.redirect(publicUrl)
        } else {
            res.redirect(`/public/${sharedFolder.id}/${parentId}?error=${defaultErrorQuery}`)
        }
    } catch (error) {
        next(error)
    }
}
