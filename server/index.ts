import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import { connectToDatabase } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable JSON request parsing
app.use(express.json());

// Mount authentication routes
app.use("/api/auth", authRouter);

// Serve static files from dist/public in production
const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

// Handle client-side routing - serve index.html for all routes
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// For local development, only start the server if not running in Vercel environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const server = createServer(app);
  const port = process.env.PORT || 3000;
  
  connectToDatabase()
    .then(() => {
      server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`);
      });
    })
    .catch((err) => {
      console.error("Critical error starting server:", err);
      process.exit(1);
    });
}

export default app;
