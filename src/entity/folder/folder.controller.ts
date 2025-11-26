import {Request, Response, NextFunction} from "express";
import createError from "http-errors";
import {getRootFolderData} from "./folder.service";

export const getFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id) throw new createError.Unauthorized();

    const { id } = req.user

    const entities = await getRootFolderData(id)

    res.render("index", {
        ...entities
    })

  } catch (error) {
    next(error);
  }
};

