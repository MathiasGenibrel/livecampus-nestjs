export interface DefaultLog {
  id: string;
  ip: string;
  filename: string;
  createdAt: string;
}

export interface UploadLog extends DefaultLog {
  size: number;
  deletedAt: string;
}

export interface DeleteLog {
  filename: string;
  deletedAt: string;
}

// nom du fichier, taille, description, date d’upload, date de suppression

export interface LogsStorageService {
  setItem(key: string, value: DefaultLog | UploadLog): void;

  deleteActionItem(key: string, value: DeleteLog): void;
}
