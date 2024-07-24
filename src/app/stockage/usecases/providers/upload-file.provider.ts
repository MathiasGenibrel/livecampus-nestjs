import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFileService } from '../upload-file/upload-file.service';
import { APP_SAVING_STATE } from '../../../globals/config-module-root-option';
import { FileStorageStrategy } from '../../repository/file-storage.strategy';

export const UploadProviderSymbol = Symbol('UploadFileService');

export const UploadFileProvider: Provider = {
  provide: UploadProviderSymbol,
  useFactory: (configService: ConfigService): UploadFileService => {
    const appState = configService.get<APP_SAVING_STATE>('APP_SAVING_STATE');
    const fileStorageStrategy = FileStorageStrategy.setStrategy(
      appState,
      configService,
    );

    return new UploadFileService(fileStorageStrategy);
  },
  inject: [ConfigService],
};
