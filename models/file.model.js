import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, "File name is required."],
  },
  url: {
    type: String,
    required: [true, "File url is required."],
  },
  size: {
    type: Number,
    required: [true, "File size is required."],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);
export default File;
