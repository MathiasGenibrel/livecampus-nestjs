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
  async uploadFile(file: Express.Multer.File) {
    try {
      await this.uploadFileService.upload(file);
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
      this.logsService.save(ActionLog.DOWNLOAD, ipAddress, filename);

      if ('buffer' in file) {
        res.setHeader('Content-Type', file.mimetype);
        res.send(file.buffer);
      } else if ('stream' in file) {
        res.setHeader('Content-Type', file.mimetype);
        file.stream.pipe(res);
      } else {
        res.status(HttpStatus.NOT_FOUND).send('File not found');
      }
    } catch (e) {
      console.error(e);
      if (e instanceof FileNotFoundError) {
        res.status(HttpStatus.NOT_FOUND).send('File not found');
        return;
      }

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Failed to download file from storage');
    }
  }
}
