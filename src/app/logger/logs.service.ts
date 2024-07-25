import { Inject, Injectable } from '@nestjs/common';
import { DatetimeService } from '../globals/datetime/datetime';
import { DefaultLog, LogsStorageService } from './repository/logs-storage';
import { DatetimeProviderSymbol } from '../globals/datetime/datetime.provider';

/**
 * ActionLog enum represents table names in the database.
 */
export enum ActionLog {
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
  DELETE = 'delete',
}

export enum LogTableKey {
  DOWNLOAD = 'FileDownload',
  UPLOAD = 'FileUpload',
}

type LogPayload =
  | {
      action: ActionLog.UPLOAD;
      key: LogTableKey.UPLOAD;
      ipAddress: string;
      fileSize: number;
      filename: string;
    }
  | {
      action: ActionLog.DOWNLOAD;
      key: LogTableKey.DOWNLOAD;
      ipAddress: string;
      filename: string;
    }
  | {
      action: ActionLog.DELETE;
      key: LogTableKey.UPLOAD;
      filename: string;
    };

@Injectable()
export class LogsService {
  constructor(
    @Inject(DatetimeProviderSymbol)
    private readonly datetimeService: DatetimeService,
    private readonly logsStorageService: LogsStorageService,
  ) {}

  public save(payload: LogPayload) {
    switch (payload.action) {
      case ActionLog.DOWNLOAD:
        this.logsStorageService.setItem(payload.key, {
          id: payload.filename,
          ip: payload.ipAddress,
          filename: payload.filename,
          createdAt: this.datetimeService.now().toISOString(),
        });
        break;

      case ActionLog.DELETE:
        this.logsStorageService.deleteActionItem(payload.key, {
          filename: payload.filename,
          deletedAt: this.datetimeService.now().toISOString(),
        });
        break;

      case ActionLog.UPLOAD:
        this.logsStorageService.setItem(payload.key, {
          id: payload.filename,
          ip: payload.ipAddress,
          filename: payload.filename,
          size: payload.fileSize,
          createdAt: this.datetimeService.now().toISOString(),
          deletedAt: '',
        });
        break;
    }
  }

  private randomId(): DefaultLog['id'] {
    return Math.floor(Math.random() * Date.now()).toString();
  }
}
