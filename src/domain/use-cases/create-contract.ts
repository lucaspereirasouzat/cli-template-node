import { FileNotFound } from "@/domain/entities/errors";
import {
  FolderExists,
  LogFailure,
  LogSuccess,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists,
} from "@/domain/contracts";
import { PATH_CONTRACT, DOMAIN_CONTRACT_PATH } from "@/constants";
import { Resolve } from "@/domain/contracts/Resolve";
import {
  TitleConversion,
  FormatDocument,
  ConstructorFile,
} from "@/domain/entities";
import { CreateFile } from "@/domain/entities/CreateFile";

export class CreateContract {
  constructor(
    private readonly fileStorage: ReadFile &
      WriteFile &
      FolderExists &
      MakeDir &
      AppendFile &
      FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) {}

  handle(
    pathFull: string,
    name = "Contract",
    test = true,
    properties = undefined,
    onlyTest = false
  ): string {
    const { UpperCase, titleFormated, path } = new TitleConversion(
      name
    ).getFormatedFields();
    const constructorFile = new ConstructorFile(
      this.fileStorage,
      this.pathResolver,
      this.logger,
      {
        UpperCase,
        properties,
        pathFull,
        path,
        titleFormated,
      }
    );
    if (!onlyTest) {
      constructorFile.mountFile({
        pathfileString: PATH_CONTRACT,
        fullPathFolder: DOMAIN_CONTRACT_PATH,
      });

      // const fileInString = this.fileStorage.readFileString({
      //   path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT),
      // });

      // if (fileInString == null) {
      //   throw new FileNotFound();
      // }

      // const replacedFileString = new FormatDocument(
      //   fileInString,
      //   UpperCase,
      //   properties
      // ).formatDocument();

      // const pathFileFolder = `${pathFull}/src/${DOMAIN_CONTRACT_PATH}`;

      // const createFile = new CreateFile(this.fileStorage, this.pathResolver);

      // const pathToWrite = createFile.createFile(
      //   `${pathFileFolder}/${path}`,
      //   replacedFileString,
      //   titleFormated
      // );
      // this.logger.log({ message: `\n diretorio do contract ${pathToWrite}` });

      // createFile.createIndex(path, pathFileFolder, titleFormated);

      // return replacedFileString;
    }
    return "";
  }
}
