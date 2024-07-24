import { Provider } from '@nestjs/common';
import { DatetimeService } from './datetime';
import { ConfigService } from '@nestjs/config';
import { DATETIME_STRATEGY } from '../config-module-root-option';
import { DatetimeReal } from './datetime.real';
import { DatetimeStub } from './datetime.stub';

export const DatetimeProviderSymbol = Symbol('datetimeProvider');

export const DatetimeProvider: Provider = {
  provide: DatetimeProviderSymbol,
  useFactory: (configService: ConfigService): DatetimeService => {
    const datetimeStrategy =
      configService.get<DATETIME_STRATEGY>('DATETIME_STRATEGY');

    switch (datetimeStrategy) {
      case DATETIME_STRATEGY.REALTIME:
        return new DatetimeReal();
      case DATETIME_STRATEGY.FIXED:
        return new DatetimeStub(
          new Date(configService.get<string>('DATETIME_ACTUAL')),
        );
      default:
        return new DatetimeReal();
    }
  },
  inject: [ConfigService],
};
