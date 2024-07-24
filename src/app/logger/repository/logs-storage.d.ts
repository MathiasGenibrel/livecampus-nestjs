export interface Log {
  createdAt: Date;
  ip: string;
  filename: string;
}

export interface LogsStorageService {
  setItem(key: string, value: Log): void;
}
