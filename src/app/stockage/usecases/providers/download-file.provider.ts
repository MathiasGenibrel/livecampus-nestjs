import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DownloadFileService } from '../download-file/download-file.service';
import { FileStorageCloud } from '../../repository/file-storage.cloud';
import { FileStorageInMemory } from '../../repository/file-storage.in-memory.repository';
import { APP_SAVING_STATE } from '../../../globals/config-module-root-option';

export const DownloadProviderSymbol = Symbol('DownloadFileService');

export const DownloadFileProvider: Provider = {
  provide: DownloadProviderSymbol,
  useFactory: (configService: ConfigService): DownloadFileService => {
    const appState = configService.get<APP_SAVING_STATE>('APP_SAVING_STATE');
    if (appState === 'cloud') {
      return new DownloadFileService(new FileStorageCloud(configService));
    } else {
      return new DownloadFileService(new FileStorageInMemory());
    }
  },
  inject: [ConfigService],
};
