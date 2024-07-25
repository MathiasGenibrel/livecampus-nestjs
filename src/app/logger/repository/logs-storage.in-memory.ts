import { DefaultLog, DeleteLog, LogsStorageService } from './logs-storage';

const storage: Map<string, DefaultLog[]> = new Map();

export class LogsStorageInMemory implements LogsStorageService {
  setItem(key: string, value: DefaultLog): void {
    const previousLogs = storage.get(key) || [];
    storage.set(key, [...previousLogs, value]);
    console.log('LogsStorage', storage);
  }

  deleteActionItem(key: string, value: DeleteLog): void {
    const previousLogs = storage.get(key);

    if (!previousLogs) {
      throw new Error('Logs not found');
    }

    const newLogs = previousLogs.map((log) => {
      if (log.filename === value.filename) {
        return { ...log, deletedAt: value.deletedAt };
      }
      return log;
    });

    storage.set(key, newLogs);
    console.log('LogsStorage', storage);
  }
}
