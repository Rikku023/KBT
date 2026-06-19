import { Router } from "express";
import { sendContactEmail } from "../email.js";

const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const { name, email, phone, needs, message } = req.body;

  // Simple validation
  if (!name || !email || !phone || !needs || !message) {
    return res.status(400).json({ message: "Semua kolom wajib diisi." });
  }

  try {
    // strictly await the email sending so Vercel serverless doesn't freeze the process before sending
    const success = await sendContactEmail({ name, email, phone, needs, message });
    if (success) {
      return res.status(200).json({ message: "Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda." });
    } else {
      return res.status(500).json({ message: "Gagal mengirim pesan. Silakan coba beberapa saat lagi." });
    }
  } catch (error) {
    console.error("Error in contact route:", error);
    return res.status(500).json({ message: "Terjadi kesalahan internal pada server." });
  }
});

export default contactRouter;
