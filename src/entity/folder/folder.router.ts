import {Router} from "express";
import {cacheMiddleware} from "../../middleware/cacheMiddleware";
import {handleSortQuery} from "../../middleware/handleSortQuery";
import {
    getFolder,
    handleCreateDirectory,
    handleDeleteDirectory
} from "@/entity/folder/folder.controller";

const router = Router();

router.get(["/", "/:folderId"], 
           handleSortQuery,
           cacheMiddleware(5000),
           getFolder);

router.post("/createDirectory", handleCreateDirectory)

router.get("/deleteFolder/:folderId", handleDeleteDirectory)

export default router;
