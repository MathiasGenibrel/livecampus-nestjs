import { Module } from '@nestjs/common';
import { DatetimeProvider } from './datetime.provider';

@Module({
  imports: [],
  providers: [DatetimeProvider],
  exports: [DatetimeProvider],
})
export class DatetimeModule {}
