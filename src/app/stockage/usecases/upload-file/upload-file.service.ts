import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../../repository/file-storage';

@Injectable()
export class UploadFileService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async upload(file: Express.Multer.File): Promise<string> {
    const uniqueFilename = this.getUniqueFilename(file.originalname);

    await this.fileStorageService.setFile(uniqueFilename, file);

    return uniqueFilename;
  }

  private getUniqueFilename(filename: string): string {
    const randomPrefix = Math.random().toString(36).substring(7);
    return `${randomPrefix}-${filename}`;
  }
}
