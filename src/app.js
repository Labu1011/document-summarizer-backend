import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from "passport";
import { config } from 'dotenv'
import "../config/passport.js"
import connectDB from "../lib/db.js";
import authRoute from "../routes/auth.route.js";

config();

const app = express()
app.use(cors());
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Welcome to the AI based document summarizer API.");
})

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
    console.log(`Server is running on PORT: ${PORT}`);
    await connectDB();
})