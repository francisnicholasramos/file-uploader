import {Request, Response, NextFunction} from "express";
import {createDirectory} from "../../entity/entities.repository";
import createError from "http-errors";
import {
    getRootFolderData,
    getFolderEntities
} from "./folder.service";

export const getFolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.id) throw new createError.Unauthorized();

        const { id, username } = req.user

        const folderId = Number(req.params.folderId)

        console.log(folderId)
        
        const rootDirectory = {id: null, name: username}

        const entities = !folderId 
            ? await getRootFolderData(id)
            : await getFolderEntities(folderId, id)

        res.render("index", {
            folderId,
            ...entities,
            rootDirectory,
            baseUrl: '/storage'
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

