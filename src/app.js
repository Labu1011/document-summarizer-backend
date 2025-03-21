import express from 'express'
import { config } from 'dotenv'
import connectDB from "../lib/db.js";
import authRoute from "../routes/auth.route.js";

config();

const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the AI based document summarizer API.");
})

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server is running on PORT: ${PORT}`);
    await connectDB();
})