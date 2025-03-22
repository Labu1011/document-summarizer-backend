import express from "express";
import upload from "../lib/multerConfig.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadFile);

export default router;
