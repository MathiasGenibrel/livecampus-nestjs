import { DatetimeService } from './datetime';

export class DatetimeReal implements DatetimeService {
  now(): Date {
    return new Date();
  }
}
