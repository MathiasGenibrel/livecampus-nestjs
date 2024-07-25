interface FilePayload {
  filename: string;
}

export class FileNotFoundError {
  constructor(
    public readonly message: string,
    filePayload: FilePayload,
  ) {
    console.error(`[FileNotFoundError]: ${message}`, filePayload);
  }
}
