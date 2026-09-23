import fs from "fs";
import path from "path";
import type { StorageRepository } from "../repositories/StorageRepository";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export class MockStorageRepository implements StorageRepository {
  async upload(file: File, filePath: string): Promise<string> {
    try {
      // Ensure upload directory exists
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const fullPath = path.join(UPLOAD_DIR, filePath);
      fs.writeFileSync(fullPath, buffer);
      return `/uploads/${filePath}`;
    } catch (err) {
      // Vercel fallback: return a placeholder image for the proof
      return "/images/types/bronze.svg";
    }
  }

  async getUrl(filePath: string): Promise<string | null> {
    if (filePath.startsWith("/images/")) return filePath;
    try {
      const fullPath = path.join(UPLOAD_DIR, filePath);
      if (fs.existsSync(fullPath)) {
        return `/uploads/${filePath}`;
      }
    } catch (err) {}
    return null;
  }
}
