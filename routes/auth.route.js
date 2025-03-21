import express from "express";
import {googleAuth, login, logout, signup} from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/google", googleAuth)
router.post("/google/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
})
router.get("/logout", logout)

export default router