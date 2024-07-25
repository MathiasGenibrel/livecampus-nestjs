import { File, FileLightInformation, FileStorageService } from './file-storage';
import { FileNotFoundError } from '../errors/file-not-found.error';

type FileStorage = File & FileLightInformation;

const storage: Map<string, FileStorage> = new Map();

export class FileStorageInMemory implements FileStorageService {
  public async setFile(key: string, file: Express.Multer.File) {
    storage.set(key, {
      buffer: file.buffer,
      mimetype: file.mimetype,
      size: file.size,
      filename: file.originalname,
    });
  }

  public async getFile(key: string) {
    const file = storage.get(key);

    if (!file) {
      throw new FileNotFoundError('File not found or does not exist', {
        filename: key,
      });
    }

    return file;
  }

  public async removeFile(key: string) {
    storage.delete(key);
  }

  public async getAll(): Promise<FileLightInformation[]> {
    const files = [...storage.values()];

    return files.map((file) => ({
      filename: file.filename,
      size: file.size,
    }));
  }
}
