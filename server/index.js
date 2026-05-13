import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  clearAllData,
  getAllData,
  resetToSeedData,
  saveAllData,
  validateImportShape
} from "./db.js";
import {
  authenticateToken,
  getAuthStatus,
  loginUser,
  logoutToken,
  registerUser
} from "./auth.js";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "dist");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) return "";
  return authHeader.slice(7).trim();
};

const requireAuth = (req, res, next) => {
  const token = getBearerToken(req);
  const user = authenticateToken(token);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.authToken = token;
  req.authUser = user;
  next();
};

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "shipment-backend" });
});

app.get("/api/auth/status", (req, res) => {
  const status = getAuthStatus();
  const user = authenticateToken(getBearerToken(req));
  res.json({ ...status, user: user ? { id: user.id, username: user.username, role: user.role } : null });
});

app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body || {};
  try {
    const user = registerUser({ username, password });
    const session = loginUser({ username, password });
    res.status(201).json({ ok: true, token: session.token, user });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to register user." });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  try {
    const session = loginUser({ username, password });
    res.json({ ok: true, token: session.token, user: session.user });
  } catch {
    res.status(401).json({ error: "Invalid username or password." });
  }
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  logoutToken(req.authToken);
  res.json({ ok: true });
});

app.use("/api/data", requireAuth);
app.use("/api/export", requireAuth);
app.use("/api/import", requireAuth);
app.use("/api/reset", requireAuth);

app.get("/api/data", (req, res) => {
  const data = getAllData(req.authUser.id);
  res.json(data);
});

app.put("/api/data", (req, res) => {
  if (!validateImportShape(req.body)) {
    res.status(400).json({ error: "Invalid payload shape." });
    return;
  }

  const saved = saveAllData(req.authUser.id, req.body);
  res.json({ ok: true, data: saved });
});

app.get("/api/export", (req, res) => {
  const data = getAllData(req.authUser.id);
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=shipment-tracker-export-${req.authUser.username}-${new Date().toISOString().slice(0, 10)}.json`
  );
  res.send(JSON.stringify(data, null, 2));
});

app.post("/api/import", (req, res) => {
  if (!validateImportShape(req.body)) {
    res.status(400).json({ error: "Invalid import format." });
    return;
  }

  const saved = saveAllData(req.authUser.id, req.body);
  res.json({ ok: true, data: saved });
});

app.delete("/api/data", (req, res) => {
  clearAllData(req.authUser.id);
  res.json({ ok: true, message: "All data deleted." });
});

app.post("/api/reset", (req, res) => {
  const data = resetToSeedData(req.authUser.id);
  res.json({ ok: true, data });
});

app.use(express.static(distPath));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
