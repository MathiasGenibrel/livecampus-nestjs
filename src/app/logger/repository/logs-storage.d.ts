export interface Log {
  createdAt: string;
  id: string;
  ip: string;
  filename: string;
}

export interface LogsStorageService {
  setItem(key: string, value: Log): void;
}
