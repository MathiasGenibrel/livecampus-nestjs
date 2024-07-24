export interface DatetimeService {
  now(): Date;
}

export const DatetimeProviderSymbol = Symbol('datetimeProvider');
