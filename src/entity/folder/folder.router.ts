import {Router} from "express";
import {
    getFolder,
    handleCreateDirectory,
    handleDeleteDirectory
} from "@/entity/folder/folder.controller";

const router = Router();

router.get(["/", "/:folderId"], getFolder);

router.post("/createDirectory", handleCreateDirectory)

router.get("/deleteFolder/:folderId", handleDeleteDirectory)

export default router;
