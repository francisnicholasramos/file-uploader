import {Router} from "express";
import {validateSharedDirectory} from "../middleware/validateSharedDirectory";
import {
    publicFileUrl,
    publicDirectoryUrl,
} from "./public.controller";

const router = Router();

router.get(
    ['/:sharedDirectoryId', '/:sharedDirectoryId/:folderId'],
    validateSharedDirectory,
    publicDirectoryUrl
)

export default router;
