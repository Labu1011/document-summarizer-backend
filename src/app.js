import express from "express";
import cors from "cors";
import session from "express-session";
import { config } from "dotenv";
import passport from "./config/passport.js";
import connectDB from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js";

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV !== "development" },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<a href='/api/v1/auth/google'>Authenticate using Google</a>");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/file", uploadRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  await connectDB();
});
