import {Request, Response, NextFunction} from "express";
import createError from "http-errors";
import {uploadFile} from "./file.service";
import {UserType} from "../../types/SchemaTypes";


export const handleFileUpload = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const user = req.user as UserType;
    const userId = Number(user?.id);

    if (!userId) throw new createError.Unauthorized()

    // req.file is the name of the user's file in the form, 'uploaded_file'
    const { file } = req
    const parentId = Number(req.body.parentId) || null

    const { data, error } = await uploadFile(userId, parentId, file)
    if (error) {
      return res.redirect(`/${parentId}?error=${encodeURIComponent(error.message)}`)
    }
    res.redirect(`/${parentId}`)
  } catch (error) {
    next(error)
  }
}


