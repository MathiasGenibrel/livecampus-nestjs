export interface DefaultLog {
  id: string;
  ip: string;
  filename: string;
  createdAt: string;
}

export interface UploadLog extends DefaultLog {
  size: number;
  deleteAt: string | null;
}

// nom du fichier, taille, description, date d’upload, date de suppression

export interface LogsStorageService {
  setItem(key: string, value: DefaultLog | UploadLog): void;
}
