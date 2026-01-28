import {Router} from "express";
import {
    getFolder,
    handleCreateDirectory
} from "@/entity/folder/folder.controller";

const router = Router();

router.get(["/", "/:folderId"], getFolder);

router.post("/createDirectory", handleCreateDirectory)

export default router;
