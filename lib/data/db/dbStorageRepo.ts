import type { StorageRepository } from "../repositories/StorageRepository";

const NOT_IMPL = "Not implemented — see lib/data/db/README.md";

export class DbStorageRepository implements StorageRepository {
  async upload(_file: File, _path: string): Promise<string> { throw new Error(NOT_IMPL); }
  async getUrl(_path: string): Promise<string | null> { throw new Error(NOT_IMPL); }
}
