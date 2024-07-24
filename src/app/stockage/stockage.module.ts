import { Module } from '@nestjs/common';
import { StockageController } from './stockage.controller';
import { DownloadFileProvider } from './usecases/providers/download-file.provider';
import { UploadFileProvider } from './usecases/providers/upload-file.provider';

@Module({
  imports: [],
  controllers: [StockageController],
  providers: [UploadFileProvider, DownloadFileProvider],
})
export class StockageModule {}
