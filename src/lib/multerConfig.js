import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdf-uploads",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });
export default upload;
