import {Request, Response, NextFunction} from "express";
import createError from "http-errors";
import {uploadFile} from "./file.service";
import {storage} from "../../storage/storage.repository";
import {defaultErrorQuery} from "../../utils/errorMessages";
import {getFileById,
        deleteEntityById
} from "../entities.repository";

// CRUD operation 

export const handleFileUpload = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) throw new createError.Unauthorized()

            // req.file is the name of the user's file in the form, 'uploaded_file'
            const { file } = req
            const parentId = Number(req.body.parentId) || null

            const { data, error } = await uploadFile(userId, parentId, file)
            if (error) {
                return res.redirect(`/?error=${encodeURIComponent(error.message)}`)
            }
            res.redirect('/')
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
        const arbitrary = await getFileById(fileId)

        if (!arbitrary) throw new createError.NotFound()

            const {name: filename, parentId} = arbitrary;
            const filePath = `${req.user?.id}/${filename}`;

            const fileDownloadUrl = await storage.getFileUrl(filePath, 60, {download: true})

            if (fileDownloadUrl) {
                res.redirect(fileDownloadUrl)
            } else {
                res.redirect(`/?error=${defaultErrorQuery}`)
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

            const {name, parentId} = file;
            await deleteEntityById(fileId);
            res.redirect(`/?success=${encodeURIComponent}`)

            const bucketName = process.env.SUPABASE_BUCKET as string;
            process.nextTick(() => storage.deleteFile(bucketName, `${userId}/${name}`))
    } catch (error) {
        next(error)
    }
}


