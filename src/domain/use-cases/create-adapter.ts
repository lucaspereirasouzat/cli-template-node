import { CouldNotWrite, FileNotFound } from "@/domain/entities/errors";
import {
  AppendFile,
  FileExists,
  FolderExists,
  LogFailure,
  LogSuccess,
  MakeDir,
  ReadFile,
  WriteFile,
  Resolve,
} from "@/domain/contracts";
import {
  PATH_ADAPTER,
  PATH_ADAPTER_TEST,
  PATH_ADAPTER_PATH,
} from "@/constants";
import { FormatDocument, TitleConversion, CreateFile, ConstructorFile } from "@/domain/entities";

export class CreateAdapter {
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
    name = "Adapter",
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
        titleFormated
      }
    )

    if (!onlyTest) {
      constructorFile.mountFile({
        fullPathFolder: PATH_ADAPTER_PATH,
        pathfileString: PATH_ADAPTER
      })
    }

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_ADAPTER_TEST),
    });

    if (fileInTestString == null) {
      throw new CouldNotWrite();
    }

    if (test) {
      const createFile = new CreateFile(this.fileStorage, this.pathResolver);
      const pathTestFolder = `${pathFull}/tests/${PATH_ADAPTER_PATH}/${path}`;
      const replacedFileTestString = new FormatDocument(
        fileInTestString,
        UpperCase,
        properties
      ).formatDocument();
      const pathToWriteTest = createFile.createFile(
        pathTestFolder,
        replacedFileTestString,
        titleFormated.replace(".ts", ".spec.ts")
      );
      this.logger.log({
        message: `\n diretorio da entidade test ${pathToWriteTest}`,
      });
    }

    return fileInTestString;
  }
}
