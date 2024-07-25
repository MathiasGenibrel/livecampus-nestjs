import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../../repository/file-storage';

@Injectable()
export class DeleteFileService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  async delete(filename: string): Promise<void> {
    return await this.fileStorageService.removeFile(filename);
  }
}
