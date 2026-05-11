import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildInitialData } from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "..", "data", "shipment-tracker.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS app_data (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const getRow = db.prepare("SELECT payload FROM app_data WHERE id = 1");
const upsertRow = db.prepare(`
  INSERT INTO app_data (id, payload, updated_at)
  VALUES (1, @payload, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
`);
const deleteRow = db.prepare("DELETE FROM app_data WHERE id = 1");

export const getAllData = () => {
  const row = getRow.get();
  if (!row) {
    const seed = buildInitialData();
    saveAllData(seed);
    return seed;
  }

  return JSON.parse(row.payload);
};

export const saveAllData = (data) => {
  upsertRow.run({
    payload: JSON.stringify(data),
    updatedAt: new Date().toISOString()
  });
  return data;
};

export const resetToSeedData = () => {
  const seed = buildInitialData();
  saveAllData(seed);
  return seed;
};

export const clearAllData = () => {
  deleteRow.run();
};

export const validateImportShape = (payload) => {
  if (!payload || typeof payload !== "object") return false;

  const requiredKeys = [
    "shipments",
    "consignees",
    "agentsData",
    "documents",
    "notifications",
    "settings"
  ];

  return requiredKeys.every((key) => Object.hasOwn(payload, key));
};
