import createError from "http-errors";
import {getUserEntities} from "../entities.repository";

export const getRootFolderData = async (userId: number) => {
  const data = await getUserEntities(userId)

  if (!data) throw new createError.NotFound();

  return { entities: data };
}


