export interface StorageRepository {
  /** Upload a file and return its URL */
  upload(file: File, path: string): Promise<string>;
  /** Get URL for a stored file */
  getUrl(path: string): Promise<string | null>;
}
