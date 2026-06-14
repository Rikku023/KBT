import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js"; // In Node ESNext we should use .js extension for relative imports when compiled, or wait: let's verify if esbuild/tsconfig needs .js or if we can omit it. In ES modules, esbuild resolves absolute/relative imports, but Node.js requires extensions in compiled ES modules. The build script builds with esbuild: `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm`. Since it's bundling, we can use "./routes/auth" or "./routes/auth.js" (or just import from `./routes/auth` because esbuild resolves it). Wait, to be safe with typescript, "./routes/auth" is fine. Let's see if we should import it as "./routes/auth" (which is standard TS). Yes.

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
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

export default app;
