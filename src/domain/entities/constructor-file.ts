import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists
} from "@/domain/contracts";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import { FormatDocument, CreateFile } from "@/domain/entities";
import { ReadFileAndGetString } from "./read-file-and-get-string";

interface DefaultFile {
  UpperCase: string;
  properites: object;
  pathFull: string;
  path: string;
  titleFormated: string;
}

interface MountFile {
  fullPathFolder: string;
  pathfileString: string;
}

export class ConstructorFile {
  constructor(
    private readonly fileStorage: ReadFile &
      WriteFile &
      FolderExists &
      MakeDir &
      AppendFile &
      FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess,

    private readonly defaultFile: DefaultFile
  ) { }

  mountFile({ fullPathFolder, pathfileString }: MountFile): ConstructorFile {
    const stringFile = new ReadFileAndGetString(
      this.fileStorage,
      this.pathResolver
    ).getFileString(pathfileString);

    const replacedFileString = new FormatDocument(
      stringFile,
      this.defaultFile.UpperCase,
      this.defaultFile.properites
    ).formatDocument();
    const pathFolder = `${this.defaultFile.pathFull}/src/${fullPathFolder}`;

    const createFile = new CreateFile(this.fileStorage, this.pathResolver);
    const pathToWrite = createFile.createFile(
      `${pathFolder}/${this.defaultFile.path}`,
      replacedFileString,
      this.defaultFile.titleFormated
    );

    this.logger.log({ message: `\n diretorio - ${pathfileString} - ${pathToWrite}` });

    createFile.createIndex(this.defaultFile.path, pathFolder, this.defaultFile.titleFormated);

    return this
  }

  mountFileTest({ fullPathFolder, pathfileString }: MountFile): ConstructorFile {
    const stringFile = new ReadFileAndGetString(
      this.fileStorage,
      this.pathResolver
    ).getFileString(pathfileString);

    const replacedFileString = new FormatDocument(
      stringFile,
      this.defaultFile.UpperCase,
      this.defaultFile.properites
    ).formatDocument();
    const pathFolder = `${this.defaultFile.pathFull}/test/${fullPathFolder}`;

    const createFile = new CreateFile(this.fileStorage, this.pathResolver);
    const pathToWrite = createFile.createFile(
      `${pathFolder}/${this.defaultFile.path}`,
      replacedFileString,
      this.defaultFile.titleFormated
    );

    this.logger.log({ message: `\n diretorio - ${fullPathFolder} - ${pathToWrite}` });

    return this
  }
}
