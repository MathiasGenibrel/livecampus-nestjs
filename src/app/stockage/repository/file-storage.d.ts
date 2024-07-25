import { Readable } from 'node:stream';

export interface FileStorageService {
  setFile: (key: string, file: Express.Multer.File) => Promise<void>;
  getFile: (key: string) => Promise<File>;
  getAll: () => Promise<FileLightInformation[]>;
  removeFile: (key: string) => Promise<void>;
}

interface FileLightInformation {
  filename: string;
  size: number;
}

interface DefaultFileProperties {
  mimetype: string;
}

interface BufferFile extends DefaultFileProperties {
  buffer: Buffer;
}

interface StreamFile extends DefaultFileProperties {
  stream: Readable;
}

export type File = BufferFile | StreamFile;
