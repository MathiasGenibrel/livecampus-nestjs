import { Inject, Injectable } from '@nestjs/common';
import { DatetimeService } from '../globals/datetime/datetime';
import { Log, LogsStorageService } from './repository/logs-storage';
import { DatetimeProviderSymbol } from '../globals/datetime/datetime.provider';

/**
 * ActionLog enum represents table names in the database.
 */
export enum ActionLog {
  DOWNLOAD = 'FileDownload',
  UPLOAD = 'FileUpload',
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
      createdAt: this.datetimeService.now().toISOString(),
    });
  }

  private randomId(): Log['id'] {
    return Math.floor(Math.random() * Date.now()).toString();
  }
}
