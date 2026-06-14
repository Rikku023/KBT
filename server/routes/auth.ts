import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { db } from "../db.js";
import { sendVerificationEmail } from "../email.js";
import { RegisterInputSchema, LoginInputSchema } from "../../shared/auth.js";

const router = express.Router();

// Route: POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const parseResult = RegisterInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validasi gagal.",
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = parseResult.data;

    // Check if user exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar.",
      });
    }

    // Hash password using bcryptjs
    const passwordHash = await bcryptjs.hash(password, 10);

    // Generate secure random verification token using Node.js crypto module
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user with isVerified: false
    const newUser = await db.createUser({
      name,
      email,
      passwordHash,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    await sendVerificationEmail(newUser.email, newUser.name, verificationToken);

    return res.status(201).json({
      message: "Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// Route: GET /api/auth/verify_email
router.get("/verify_email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Token verifikasi tidak valid." });
    }

    const user = await db.getUserByVerificationToken(token);
    if (!user) {
      return res.status(400).json({
        message: "Token verifikasi tidak valid atau telah kedaluwarsa.",
      });
    }

    // Mark user as verified and clear the token
    await db.updateUser(user.id, {
      isVerified: true,
      verificationToken: null,
    });

    // Redirect user to frontend verification status page
    const appUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : (process.env.APP_URL || "http://localhost:5173");
    return res.redirect(`${appUrl}/login?verified=true`);
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

// Route: POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const parseResult = LoginInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validasi gagal.",
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parseResult.data;

    // Find user
    const user = await db.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah." });
    }

    // Verify password
    const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email atau password salah." });
    }

    // Check email verification status
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email Anda belum diverifikasi. Silakan periksa email Anda.",
      });
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || "default_super_secret_key";
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      jwtSecret,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login berhasil!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

export default router;
