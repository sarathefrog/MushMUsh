import fs from "fs";
import path from "path";
import type { StorageRepository } from "../repositories/StorageRepository";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export class MockStorageRepository implements StorageRepository {
  async upload(file: File, filePath: string): Promise<string> {
    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.join(UPLOAD_DIR, filePath);
    fs.writeFileSync(fullPath, buffer);
    return `/uploads/${filePath}`;
  }

  async getUrl(filePath: string): Promise<string | null> {
    const fullPath = path.join(UPLOAD_DIR, filePath);
    if (fs.existsSync(fullPath)) {
      return `/uploads/${filePath}`;
    }
    return null;
  }
}
