import { Log, LogsStorageService } from './logs-storage';

const storage: Map<string, Log[]> = new Map();

export class LogsStorageInMemory implements LogsStorageService {
  setItem(key: string, value: Log): void {
    const previousLogs = storage.get(key) || [];
    storage.set(key, [...previousLogs, value]);
    console.log('LogsStorage', storage);
  }
}
