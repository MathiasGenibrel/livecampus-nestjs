import { File, FileStorageService } from './file-storage';
import { FileNotFoundError } from '../errors/file-not-found.error';

const storage: Map<string, File> = new Map();

export class FileStorageInMemory implements FileStorageService {
  public async setFile(key: string, file: Express.Multer.File) {
    storage.set(key, { buffer: file.buffer, mimetype: file.mimetype });
  }

  public async getFile(key: string) {
    const file = storage.get(key);

    if (!file) {
      throw new FileNotFoundError('File not found or does not exist');
    }

    return file;
  }
}
