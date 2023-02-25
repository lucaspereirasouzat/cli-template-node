export class FileNotFound extends Error {
  constructor() {
    super("File Not found");
    this.name = "FileNotFound";
  }
}
