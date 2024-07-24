import { Provider } from '@nestjs/common';
import { LogsService } from '../logs.service';
import { DatetimeService } from '../../globals/datetime/datetime';
import { DatetimeProviderSymbol } from '../../globals/datetime/datetime.provider';
import { LogsStorageStrategy } from '../repository/logs-storage.strategy';
import { ConfigService } from '@nestjs/config';
import { APP_SAVING_STATE } from '../../globals/config-module-root-option';

export const LogsServiceSymbol = Symbol('LogsService');

export const LogsProvider: Provider = {
  provide: LogsServiceSymbol,
  useFactory: (
    datetimeProvider: DatetimeService,
    configService: ConfigService,
  ) => {
    const logsStorageStrategy = LogsStorageStrategy.setStrategy(
      configService.get<APP_SAVING_STATE>('APP_SAVING_STATE'),
      configService,
    );

    return new LogsService(datetimeProvider, logsStorageStrategy);
  },
  inject: [DatetimeProviderSymbol, ConfigService],
};
