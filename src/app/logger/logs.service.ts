import { Inject, Injectable } from '@nestjs/common';
import { DatetimeService } from '../globals/datetime/datetime';
import { DefaultLog, LogsStorageService } from './repository/logs-storage';
import { DatetimeProviderSymbol } from '../globals/datetime/datetime.provider';

/**
 * ActionLog enum represents table names in the database.
 */
export enum ActionLog {
  DOWNLOAD = 'FileDownload',
  UPLOAD = 'FileUpload',
}

type LogPayload =
  | {
      action: ActionLog.UPLOAD;
      ipAddress: string;
      file: Express.Multer.File;
    }
  | {
      action: ActionLog.DOWNLOAD;
      ipAddress: string;
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
        this.logsStorageService.setItem(payload.action, {
          id: this.randomId(),
          ip: payload.ipAddress,
          filename: payload.filename,
          createdAt: this.datetimeService.now().toISOString(),
        });
        break;
      case ActionLog.UPLOAD:
        this.logsStorageService.setItem(payload.action, {
          id: this.randomId(),
          ip: payload.ipAddress,
          filename: payload.file.originalname,
          size: payload.file.size,
          createdAt: this.datetimeService.now().toISOString(),
          deleteAt: null,
        });
        break;
    }
  }

  private randomId(): DefaultLog['id'] {
    return Math.floor(Math.random() * Date.now()).toString();
  }
}
