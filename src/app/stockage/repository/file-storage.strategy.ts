import { APP_SAVING_STATE } from '../../globals/config-module-root-option';
import { FileStorageService } from './file-storage';
import { FileStorageCloud } from './file-storage.cloud';
import { FileStorageInMemory } from './file-storage.in-memory.repository';
import { ConfigService } from '@nestjs/config';

export class FileStorageStrategy {
  public static setStrategy(
    strategy: APP_SAVING_STATE,
    configService: ConfigService,
  ): FileStorageService {
    switch (strategy) {
      case APP_SAVING_STATE.CLOUD:
        return new FileStorageCloud(configService);
      case APP_SAVING_STATE.IN_MEMORY:
        return new FileStorageInMemory();
      default:
        return new FileStorageInMemory();
    }
  }
}
