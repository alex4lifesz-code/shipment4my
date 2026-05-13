import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildInitialData } from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataRootDir = path.join(__dirname, "..", "data");
const userDataDir = path.join(dataRootDir, "users");

if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const dbCache = new Map();

const getUserDb = (userId) => {
  const normalizedUserId = Number(userId);
  if (!Number.isInteger(normalizedUserId) || normalizedUserId <= 0) {
    throw new Error("Invalid user context.");
  }

  if (dbCache.has(normalizedUserId)) {
    return dbCache.get(normalizedUserId);
  }

  const dbPath = path.join(userDataDir, `user-${normalizedUserId}.db`);
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS app_data (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const prepared = {
    getRow: db.prepare("SELECT payload FROM app_data WHERE id = 1"),
    upsertRow: db.prepare(`
      INSERT INTO app_data (id, payload, updated_at)
      VALUES (1, @payload, @updatedAt)
      ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
    `),
    deleteRow: db.prepare("DELETE FROM app_data WHERE id = 1")
  };

  dbCache.set(normalizedUserId, prepared);
  return prepared;
};

export const getAllData = (userId) => {
  const { getRow } = getUserDb(userId);
  const row = getRow.get();
  if (!row) {
    const seed = buildInitialData();
    saveAllData(userId, seed);
    return seed;
  }

  return JSON.parse(row.payload);
};

export const saveAllData = (userId, data) => {
  const { upsertRow } = getUserDb(userId);
  upsertRow.run({
    payload: JSON.stringify(data),
    updatedAt: new Date().toISOString()
  });
  return data;
};

export const resetToSeedData = (userId) => {
  const seed = buildInitialData();
  saveAllData(userId, seed);
  return seed;
};

export const clearAllData = (userId) => {
  const { deleteRow } = getUserDb(userId);
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
