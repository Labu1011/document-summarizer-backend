import FileModel from "../models/file.model.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded." });

    const userId = req.user.id;

    // Save metadata to mongoDB
    const pdfData = new FileModel({
      filename: req.file.originalname,
      url: req.file.path,
      size: req.file.size,
      uploadedAt: new Date(),
      user: userId,
    });

    await pdfData.save();

    return res
      .status(201)
      .json({ message: "PDF uploaded successfully", data: pdfData });
  } catch (error) {
    console.log("Error in upload controller: ", error.message);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function getMyUploads(req, res) {
  try {
    const userId = req.user.id;
    const userPdfs = await FileModel.find({ user: userId }).populate(
      "user",
      "name email",
    );

    res
      .status(200)
      .json({ message: "User PDFs fetched successfully", data: userPdfs });
  } catch (error) {
    console.log("Error in getMyUploads controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
