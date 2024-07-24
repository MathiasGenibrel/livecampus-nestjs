import { DefaultLog, LogsStorageService } from './logs-storage';

const storage: Map<string, DefaultLog[]> = new Map();

export class LogsStorageInMemory implements LogsStorageService {
  setItem(key: string, value: DefaultLog): void {
    const previousLogs = storage.get(key) || [];
    storage.set(key, [...previousLogs, value]);
    console.log('LogsStorage', storage);
  }
}
