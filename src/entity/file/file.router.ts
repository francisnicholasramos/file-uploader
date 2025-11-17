import Router from "express";
import multer from "multer";

import {handleFileUpload} from "./file.controller";

const upload = multer({ storage: multer.memoryStorage() });

export const router = Router();

router.route("/uploadFile")
      .post(upload.single("file"), handleFileUpload)



