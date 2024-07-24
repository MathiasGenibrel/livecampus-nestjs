import {
  Bind,
  Controller,
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
import { ActionLog, LogsService } from '../logger/logs.service';
import { LogsServiceSymbol } from '../logger/providers/logs.provider';

@Controller({ path: 'file' })
export class StockageController {
  constructor(
    @Inject(UploadProviderSymbol)
    private readonly uploadFileService: UploadFileService,
    @Inject(DownloadProviderSymbol)
    private readonly downloadFileService: DownloadFileService,
    @Inject(LogsServiceSymbol)
    private readonly logsService: LogsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile())
  async uploadFile(file: Express.Multer.File, @Ip() ipAddress: string) {
    try {
      await this.uploadFileService.upload(file);
      this.logsService.save({ action: ActionLog.UPLOAD, file, ipAddress });
    } catch (e) {
      console.error(e);
    }
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
