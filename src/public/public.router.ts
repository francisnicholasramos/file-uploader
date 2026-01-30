import {Router} from "express";
import {validateSharedDirectory} from "../middleware/validateSharedDirectory";
import {
    publicFileDownload,
    publicDirectoryUrl,
} from "./public.controller";

const router = Router();

router.get(
    "/:sharedDirectoryId/download/:fileId",
    validateSharedDirectory,
    publicFileDownload
)

router.get(
    ['/:sharedDirectoryId', '/:sharedDirectoryId/:folderId'],
    validateSharedDirectory,
    publicDirectoryUrl
)

export default router;
