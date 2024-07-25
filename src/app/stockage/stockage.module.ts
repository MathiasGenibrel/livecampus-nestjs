import { Module } from '@nestjs/common';
import { StockageController } from './stockage.controller';
import { DownloadFileProvider } from './usecases/providers/download-file.provider';
import { UploadFileProvider } from './usecases/providers/upload-file.provider';
import { LogsModule } from '../logger/logs.module';
import { DeleteFileProvider } from './usecases/providers/delete-file.provider';

@Module({
  imports: [LogsModule],
  controllers: [StockageController],
  providers: [UploadFileProvider, DownloadFileProvider, DeleteFileProvider],
})
export class StockageModule {}
