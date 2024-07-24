import { Provider } from '@nestjs/common';
import { LogsService } from '../logs.service';
import { LogsStorageInMemory } from '../repository/logs-storage.in-memory';
import { DatetimeService } from '../../globals/datetime/datetime';
import { DatetimeProviderSymbol } from '../../globals/datetime/datetime.provider';

export const LogsServiceSymbol = Symbol('LogsService');

export const LogsProvider: Provider = {
  provide: LogsServiceSymbol,
  useFactory: (datetimeProvider: DatetimeService) => {
    return new LogsService(datetimeProvider, new LogsStorageInMemory());
  },
  inject: [DatetimeProviderSymbol],
};
