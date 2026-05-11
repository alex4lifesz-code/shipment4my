import express from "express";
import cors from "cors";
import {
  clearAllData,
  getAllData,
  resetToSeedData,
  saveAllData,
  validateImportShape
} from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "shipment-backend" });
});

app.get("/api/data", (_, res) => {
  const data = getAllData();
  res.json(data);
});

app.put("/api/data", (req, res) => {
  if (!validateImportShape(req.body)) {
    res.status(400).json({ error: "Invalid payload shape." });
    return;
  }

  const saved = saveAllData(req.body);
  res.json({ ok: true, data: saved });
});

app.get("/api/export", (_, res) => {
  const data = getAllData();
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=shipment-tracker-export-${new Date().toISOString().slice(0, 10)}.json`
  );
  res.send(JSON.stringify(data, null, 2));
});

app.post("/api/import", (req, res) => {
  if (!validateImportShape(req.body)) {
    res.status(400).json({ error: "Invalid import format." });
    return;
  }

  const saved = saveAllData(req.body);
  res.json({ ok: true, data: saved });
});

app.delete("/api/data", (_, res) => {
  clearAllData();
  res.json({ ok: true, message: "All data deleted." });
});

app.post("/api/reset", (_, res) => {
  const data = resetToSeedData();
  res.json({ ok: true, data });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
