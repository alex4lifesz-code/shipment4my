import Database from "better-sqlite3";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const authDbPath = path.join(dataDir, "auth.db");
const authDb = new Database(authDbPath);

authDb.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );
`);

const countUsersStmt = authDb.prepare("SELECT COUNT(*) AS count FROM users");
const findUserByUsernameStmt = authDb.prepare("SELECT * FROM users WHERE username = ?");
const findUserByIdStmt = authDb.prepare("SELECT * FROM users WHERE id = ?");
const insertUserStmt = authDb.prepare(`
  INSERT INTO users (username, password_hash, password_salt, role, created_at, updated_at)
  VALUES (@username, @passwordHash, @passwordSalt, @role, @createdAt, @updatedAt)
`);
const insertSessionStmt = authDb.prepare(`
  INSERT INTO sessions (user_id, token_hash, created_at)
  VALUES (@userId, @tokenHash, @createdAt)
`);
const findSessionStmt = authDb.prepare(`
  SELECT sessions.user_id AS user_id, users.username AS username, users.role AS role
  FROM sessions
  INNER JOIN users ON users.id = sessions.user_id
  WHERE sessions.token_hash = ?
`);
const deleteSessionStmt = authDb.prepare("DELETE FROM sessions WHERE token_hash = ?");

const normalizeUsername = (username) => username.trim().toLowerCase();

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const hashPassword = (password, salt) =>
  crypto.scryptSync(password, salt, 64).toString("hex");

const createPublicUser = (user) => ({
  id: user.id,
  username: user.username,
  role: user.role
});

export const getAuthStatus = () => {
  const row = countUsersStmt.get();
  return { hasUsers: Boolean(row?.count) };
};

export const registerUser = ({ username, password }) => {
  const trimmed = username.trim();
  const normalized = normalizeUsername(trimmed);

  if (!trimmed || !password) {
    throw new Error("Username and password are required.");
  }

  const existing = findUserByUsernameStmt.get(normalized);
  if (existing) {
    throw new Error("Username already exists.");
  }

  const now = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);

  const role = getAuthStatus().hasUsers ? "user" : "admin";

  const result = insertUserStmt.run({
    username: normalized,
    passwordHash,
    passwordSalt: salt,
    role,
    createdAt: now,
    updatedAt: now
  });

  const user = findUserByIdStmt.get(result.lastInsertRowid);
  return createPublicUser(user);
};

export const loginUser = ({ username, password }) => {
  const normalized = normalizeUsername(username || "");
  if (!normalized || !password) {
    throw new Error("Username and password are required.");
  }

  const user = findUserByUsernameStmt.get(normalized);
  if (!user) {
    throw new Error("Invalid username or password.");
  }

  const computedHash = hashPassword(password, user.password_salt);
  if (computedHash !== user.password_hash) {
    throw new Error("Invalid username or password.");
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  insertSessionStmt.run({
    userId: user.id,
    tokenHash,
    createdAt: new Date().toISOString()
  });

  return {
    token: rawToken,
    user: createPublicUser(user)
  };
};

export const authenticateToken = (token) => {
  if (!token) return null;

  const row = findSessionStmt.get(hashToken(token));
  if (!row) return null;

  return {
    id: row.user_id,
    username: row.username,
    role: row.role
  };
};

export const logoutToken = (token) => {
  if (!token) return;
  deleteSessionStmt.run(hashToken(token));
};
