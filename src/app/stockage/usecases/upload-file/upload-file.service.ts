import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../../repository/file-storage';

@Injectable()
export class UploadFileService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async upload(file: Express.Multer.File): Promise<void> {
    await this.fileStorageService.setFile(file.originalname, file);
  }
}
