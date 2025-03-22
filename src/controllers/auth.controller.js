import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Local signup
export async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Please provide values to all fields." });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
}

// Local login
export async function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.login(user, (err) => {
      if (err) next(err);
      res.status(200).json({ message: "Logged in successfully.", user });
    });
  })(req, res, next);
}

export async function logout(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    req.session.destroy();
    res.json({ message: "Logged out successfully" });
  });
}
