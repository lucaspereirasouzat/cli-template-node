import { FileNotFound } from "@/domain/entities/errors";
import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists
} from "@/domain/contracts";
import { Resolve } from "@/domain/contracts/Resolve";

export class ReadFileAndGetString {
  constructor(
    private readonly fileStorage: ReadFile &
      WriteFile &
      FolderExists &
      MakeDir &
      AppendFile &
      FileExists,
    private readonly pathResolver: Resolve
  ) { }

  getFileString(pathfileString: string) {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, pathfileString),
    });

    if (fileInString == null) {
      throw new FileNotFound();
    }

    return fileInString;
  }
}
