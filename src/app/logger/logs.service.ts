import { Inject, Injectable } from '@nestjs/common';
import {
  DatetimeProviderSymbol,
  DatetimeService,
} from '../globals/datetime/datetime';
import { LogsStorageService } from './repository/logs-storage';

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
      ip: ipAddress,
      filename,
      createdAt: this.datetimeService.now(),
    });
  }
}
