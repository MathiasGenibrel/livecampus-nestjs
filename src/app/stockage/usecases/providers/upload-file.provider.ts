import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileStorageCloud } from '../../repository/file-storage.cloud';
import { FileStorageInMemory } from '../../repository/file-storage.in-memory.repository';
import { UploadFileService } from '../upload-file/upload-file.service';
import { APP_SAVING_STATE } from '../../../globals/config-module-root-option';

export const UploadProviderSymbol = Symbol('UploadFileService');

export const UploadFileProvider: Provider = {
  provide: UploadProviderSymbol,
  useFactory: (configService: ConfigService): UploadFileService => {
    const appState = configService.get<APP_SAVING_STATE>('APP_SAVING_STATE');
    if (appState === APP_SAVING_STATE.CLOUD) {
      return new UploadFileService(new FileStorageCloud(configService));
    } else {
      return new UploadFileService(new FileStorageInMemory());
    }
  },
  inject: [ConfigService],
};
