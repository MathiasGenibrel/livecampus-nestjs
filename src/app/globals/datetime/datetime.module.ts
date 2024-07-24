import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatetimeProvider } from './datetime.provider';

@Module({
  imports: [ConfigModule],
  providers: [DatetimeProvider],
  exports: [DatetimeProvider],
})
export class DatetimeModule {}
