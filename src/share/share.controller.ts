import {Request, Response, NextFunction} from "express";
import {getFileById} from "../entity/entities.repository";
import {storage} from "../storage/storage.repository";
import {ShareFileExpiration} from "../models/schemas";
import {createSharedDirectory} from "../entity/entities.repository";
import {defaultError} from "../utils/errorMessages";
import {baseUrl} from "../utils/baseUrl";
import createError from "http-errors";

export const shareFile = async ( 
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try {
        const fileId = Number(req.params.fileId)
        const file = await getFileById(fileId)

        const {expiresIn} = await ShareFileExpiration.parseAsync(req.query)
        const duration = 60 * 60 * Number(expiresIn) // s * m * h
        
        if (!file) throw new createError.NotFound()

        // {property: arbitraryVariable}
        const {name: filename} = file

        const filePath = `${req.user?.id}/${filename}`
        const publicUrl = await storage.getFileUrl(filePath, duration)

        if (!publicUrl) return res.status(500).json({error: defaultError})

        res.json({
            url: publicUrl,
            expirationTime: duration,
            filename: filename
        })
    } catch (error) {
        next(error)
    }
}

export const shareDirectory = async (
    req:Request, 
    res:Response, 
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new createError.Unauthorized()

        const folderId = Number(req.params.folderId)

        const {expiresIn} = await ShareFileExpiration.parseAsync(req.query)

        const duration = Number(expiresIn) * 60 * 60 * 1000 

        const expiresAt = new Date(Date.now() + duration)

        const sharedDirectoryUrl = await createSharedDirectory(userId, folderId, expiresAt)

        if (!sharedDirectoryUrl) return res.status(500).json({error: defaultError})

        res.json({
            publicDirectoryUrl: `${baseUrl}/public/${sharedDirectoryUrl.id}`
        })
    } catch (error) {
        return res.status(500).json({ error: defaultError })
    }
}


