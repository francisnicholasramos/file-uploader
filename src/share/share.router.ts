import {Router} from "express";
import {
    shareFile,
    shareDirectory
} from "../share/share.controller";

const router = Router();

router.get("/file/:fileId", shareFile)

router.get("/folder/:folderId", shareDirectory)

export default router;
