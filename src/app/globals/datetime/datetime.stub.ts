import { DatetimeService } from './datetime';

export class DatetimeStub implements DatetimeService {
  private readonly currentDate: Date;

  constructor(date: Date) {
    this.currentDate = date;
  }

  now(): Date {
    return this.currentDate;
  }
}
