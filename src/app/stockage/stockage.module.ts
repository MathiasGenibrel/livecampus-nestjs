import { Module } from '@nestjs/common';
import { UploadFileService } from './usecases/upload-file/upload-file.service';
import { StockageController } from './stockage.controller';

@Module({
  imports: [],
  controllers: [StockageController],
  providers: [UploadFileService],
})
export class StockageModule {}
