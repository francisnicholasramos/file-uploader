import {Router} from "express";
import multer from "multer";

import {handleFileUpload, handleFileDownload} from "./file.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/uploadFile', 
    upload.single("file"), 
    handleFileUpload
)

router.get("/download/:fileId", handleFileDownload)

export default router;
