import { Injectable } from '@nestjs/common';
import {
  File,
  FileLightInformation,
  FileStorageService,
} from '../../repository/file-storage';

@Injectable()
export class DownloadFileService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async download(filename: string): Promise<File> {
    return await this.fileStorageService.getFile(filename);
  }

  async getAll(): Promise<FileLightInformation[]> {
    return await this.fileStorageService.getAll();
  }
}
