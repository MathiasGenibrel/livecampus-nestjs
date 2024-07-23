import {
  Bind,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './usecases/upload-file/upload-file.service';

@Controller({ path: 'file' })
export class StockageController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    try {
      await this.uploadFileService.upload(file);
    } catch (e) {
      console.error(e);
    }
  }
}
