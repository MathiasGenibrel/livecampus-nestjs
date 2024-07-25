import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_SAVING_STATE } from '../../../globals/config-module-root-option';
import { FileStorageStrategy } from '../../repository/file-storage.strategy';
import { DeleteFileService } from '../delete-file/delete-file.service';

export const DeleteProviderSymbol = Symbol('DeleteFileService');

export const DeleteFileProvider: Provider = {
  provide: DeleteProviderSymbol,
  useFactory: (configService: ConfigService): DeleteFileService => {
    const appState = configService.get<APP_SAVING_STATE>('APP_SAVING_STATE');
    const fileStorageStrategy = FileStorageStrategy.setStrategy(
      appState,
      configService,
    );

    return new DeleteFileService(fileStorageStrategy);
  },
  inject: [ConfigService],
};
