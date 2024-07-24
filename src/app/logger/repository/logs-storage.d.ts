export interface Log {
  createdAt: Date;
  id: number;
  ip: string;
  filename: string;
}

export interface LogsStorageService {
  setItem(key: string, value: Log): void;
}
