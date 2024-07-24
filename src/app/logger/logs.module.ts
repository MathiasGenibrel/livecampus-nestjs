import { Module } from '@nestjs/common';
import { LogsProvider } from './providers/logs.provider';
import { DatetimeModule } from '../globals/datetime/datetime.module';

@Module({
  imports: [DatetimeModule],
  providers: [LogsProvider],
  exports: [LogsProvider],
})
export class LogsModule {}
