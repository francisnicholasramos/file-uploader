import {Router} from "express";
import {getFolder} from "@/entity/folder/folder.controller";

const router = Router();

router.get("/", getFolder);

export default router;
