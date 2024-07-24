import { Provider } from '@nestjs/common';
import { LogsService } from '../logs.service';
import { LogsStorageInMemory } from '../repository/logs-storage-in.memory';
import {
  DatetimeProviderSymbol,
  DatetimeService,
} from '../../globals/datetime/datetime';

export const LogsServiceSymbol = Symbol('LogsService');

export const LogsProvider: Provider = {
  provide: LogsServiceSymbol,
  useFactory: (datetimeProvider: DatetimeService) => {
    return new LogsService(datetimeProvider, new LogsStorageInMemory());
  },
  inject: [DatetimeProviderSymbol],
};
