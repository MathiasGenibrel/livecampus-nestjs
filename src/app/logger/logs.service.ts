import { Inject, Injectable } from '@nestjs/common';
import { DatetimeService } from '../globals/datetime/datetime';
import { LogsStorageService } from './repository/logs-storage';
import { DatetimeProviderSymbol } from '../globals/datetime/datetime.provider';

export enum ActionLog {
  DOWNLOAD = 'Download',
  UPLOAD = 'Upload',
}

@Injectable()
export class LogsService {
  constructor(
    @Inject(DatetimeProviderSymbol)
    private readonly datetimeService: DatetimeService,
    private readonly logsStorageService: LogsStorageService,
  ) {}

  public save(action: ActionLog, ipAddress: string, filename: string) {
    this.logsStorageService.setItem(action, {
      id: this.randomId(),
      ip: ipAddress,
      filename,
      createdAt: this.datetimeService.now(),
    });
  }

  private randomId(): number {
    return Math.floor(Math.random() * Date.now());
  }
}
