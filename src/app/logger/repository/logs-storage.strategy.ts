import { APP_SAVING_STATE } from '../../globals/config-module-root-option';
import { ConfigService } from '@nestjs/config';
import { LogsStorageCloud } from './logs-storage.cloud';
import { LogsStorageInMemory } from './logs-storage.in-memory';
import { LogsStorageService } from './logs-storage';

export class LogsStorageStrategy {
  public static setStrategy(
    strategy: APP_SAVING_STATE,
    configService: ConfigService,
  ): LogsStorageService {
    switch (strategy) {
      case APP_SAVING_STATE.CLOUD:
        return new LogsStorageCloud(configService);
      case APP_SAVING_STATE.IN_MEMORY:
        return new LogsStorageInMemory();
      default:
        return new LogsStorageInMemory();
    }
  }
}
