import express from "express";
import upload from "../lib/multerConfig.js";
import { getMyUploads, uploadFile } from "../controllers/upload.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/upload", isAuthenticated, upload.single("pdf"), uploadFile);
router.get("/my-uploads", isAuthenticated, getMyUploads);

export default router;
