import {Request, Response, NextFunction} from "express";
import createError from "http-errors";
import {uploadFile} from "./file.service";
import {storage} from "../../storage/storage.repository";
import {defaultErrorQuery} from "../../utils/errorMessages";
import {getFileById,
        deleteEntityById
} from "../entities.repository";

export const handleFileUpload = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) throw new createError.Unauthorized()

        const { file } = req
        const parentId = Number(req.body.parentId) || null // could be null for ROOT folders

        const { data, error } = await uploadFile(userId, parentId, file)
        if (error) {
            return res.redirect(`/storage/${parentId}?error=${encodeURIComponent(error.message)}`)
        }
        res.redirect(parentId ? `/storage/${parentId}`: '/storage')
    } catch (error) {
        next(error)
    }
}

export const handleFileDownload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const fileId = Number(req.params.fileId)
        const file = await getFileById(fileId)

        if (!file) {
            return res.status(404).json({
                Not_Found: 'This file does not exist!'
            })
        }

        const {bucketFile, parentId} = file;
        const filePath = `${req.user?.id}/${bucketFile}`;

        const fileDownloadUrl = await storage.getFileUrl(filePath, 60, {download: true})

        if (fileDownloadUrl) {
            res.redirect(fileDownloadUrl)
        } else {
            res.redirect(`/${parentId}/?error=${defaultErrorQuery}`)
        }
    } catch (error) {
        next(error);
    }
}

export const handleDeleteFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const fileId = Number(req.params.fileId);
        const userId = req.user?.id;

        if (!userId) throw new createError.Unauthorized();

        const file = await getFileById(fileId)
        if (!file) throw new createError.NotFound()

            const {bucketFile, parentId} = file;
            await deleteEntityById(fileId);
            res.redirect(`/storage/${parentId}/?success=${encodeURIComponent}`)

            const bucketName = process.env.SUPABASE_BUCKET as string;
            process.nextTick(() => storage.deleteFile(bucketName, `${userId}/${bucketFile}`))
    } catch (error) {
        next(error)
    }
}


