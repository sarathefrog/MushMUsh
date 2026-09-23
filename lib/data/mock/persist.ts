import fs from "fs";
import path from "path";
import type { Order, User } from "../types";
import { seedOrders, seedUsers } from "./seed";

const DB_PATH = path.join(process.cwd(), "data", "mock-db.json");

interface MockDB {
  orders: Order[];
  users: User[];
}

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readDB(): MockDB {
  ensureDir();
  if (!fs.existsSync(DB_PATH)) {
    // Initialize with seed data
    const initial: MockDB = {
      orders: seedOrders,
      users: seedUsers,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as MockDB;
}

function writeDB(db: MockDB) {
  ensureDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

/** Singleton in-memory cache, synced to disk on mutations */
let cache: MockDB | null = null;

export function getDB(): MockDB {
  if (!cache) {
    cache = readDB();
  }
  return cache;
}

export function saveDB(db: MockDB) {
  cache = db;
  writeDB(db);
}
