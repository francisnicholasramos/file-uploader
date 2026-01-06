import {Request, Response, NextFunction} from "express";
import {
    getSharedDirectoryById,
    isDescendantOf
} from "../entity/entities.repository";
import createError from "http-errors";

export const validateSharedDirectory = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const {sharedDirectoryId, folderId} = req.params

        if (!sharedDirectoryId) throw new createError.NotFound()

        const sharedDirectory = await getSharedDirectoryById(sharedDirectoryId)

        if (!sharedDirectory) throw new createError.NotFound()

        if (new Date() > sharedDirectory.expiresAt) {
            return res.status(410).send({error: "The Link You Followed Has Expired."})
        }

        req.sharedFolder = sharedDirectory

        if (folderId) {
            const isSharedEntity = await isDescendantOf(sharedDirectory.folderId, Number(folderId))

            if (!isSharedEntity) throw new createError.NotFound('Folder does not exist.')
        }

        next() // proceeds to next middleware
    } catch (error) {
        next(error)
    }
}
