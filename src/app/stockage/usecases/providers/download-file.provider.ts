import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DownloadFileService } from '../download-file/download-file.service';
import { APP_SAVING_STATE } from '../../../globals/config-module-root-option';
import { FileStorageStrategy } from '../../repository/file-storage.strategy';

export const DownloadProviderSymbol = Symbol('DownloadFileService');

export const DownloadFileProvider: Provider = {
  provide: DownloadProviderSymbol,
  useFactory: (configService: ConfigService): DownloadFileService => {
    const appState = configService.get<APP_SAVING_STATE>('APP_SAVING_STATE');
    const fileStorageStrategy = FileStorageStrategy.setStrategy(
      appState,
      configService,
    );

    return new DownloadFileService(fileStorageStrategy);
  },
  inject: [ConfigService],
};
