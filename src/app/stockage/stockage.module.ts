import { Module } from '@nestjs/common';
import { StockageController } from './stockage.controller';
import { DownloadFileProvider } from './usecases/providers/download-file.provider';
import { UploadFileProvider } from './usecases/providers/upload-file.provider';
import { LogsModule } from '../logger/logs.module';

@Module({
  imports: [LogsModule],
  controllers: [StockageController],
  providers: [UploadFileProvider, DownloadFileProvider],
})
export class StockageModule {}
