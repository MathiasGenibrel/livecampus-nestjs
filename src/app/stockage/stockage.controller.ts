import {
  Bind,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Ip,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './usecases/upload-file/upload-file.service';
import { DownloadFileService } from './usecases/download-file/download-file.service';
import { UploadProviderSymbol } from './usecases/providers/upload-file.provider';
import { DownloadProviderSymbol } from './usecases/providers/download-file.provider';
import { Response } from 'express';
import { FileNotFoundError } from './errors/file-not-found.error';
import { ActionLog, LogsService, LogTableKey } from '../logger/logs.service';
import { LogsServiceSymbol } from '../logger/providers/logs.provider';
import { DeleteFileService } from './usecases/delete-file/delete-file.service';
import { DeleteProviderSymbol } from './usecases/providers/delete-file.provider';

@Controller({ path: 'file' })
export class StockageController {
  constructor(
    @Inject(UploadProviderSymbol)
    private readonly uploadFileService: UploadFileService,
    @Inject(DownloadProviderSymbol)
    private readonly downloadFileService: DownloadFileService,
    @Inject(DeleteProviderSymbol)
    private readonly deleteFileService: DeleteFileService,
    @Inject(LogsServiceSymbol)
    private readonly logsService: LogsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  async uploadFile(file: Express.Multer.File, @Ip() ipAddress: string) {
    try {
      const savedFilename = await this.uploadFileService.upload(file);
      this.logsService.save({
        action: ActionLog.UPLOAD,
        key: LogTableKey.UPLOAD,
        fileSize: file.size,
        filename: savedFilename,
        ipAddress,
      });
    } catch (e) {
      console.error(e);
    }
  }

  @Delete('delete/:filename')
  async deleteFile(@Param('filename') filename: string) {
    try {
      await this.deleteFileService.delete(filename);
      this.logsService.save({
        action: ActionLog.DELETE,
        key: LogTableKey.UPLOAD,
        filename,
      });
    } catch (e) {
      if (e instanceof FileNotFoundError) return HttpStatus.NOT_FOUND;
      console.error(e);
    }
  }

  @Get()
  async getFiles() {
    return await this.downloadFileService.getAll();
  }

  @Get('download/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Ip() ipAddress: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this.downloadFileService.download(filename);
      this.logsService.save({
        action: ActionLog.DOWNLOAD,
        key: LogTableKey.DOWNLOAD,
        ipAddress,
        filename,
      });

      if (!file) return res.status(HttpStatus.NOT_FOUND).send('File not found');

      res.setHeader('Content-Type', file.mimetype);

      if ('stream' in file) {
        return file.stream.pipe(res);
      }

      return res.send(file.buffer);
    } catch (e) {
      if (e instanceof FileNotFoundError)
        return res.status(HttpStatus.NOT_FOUND).send('File not found');

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to download file from storage');
    }
  }
}
