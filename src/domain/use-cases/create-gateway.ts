import { FileNotFound } from "../entities/errors";
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from "../contracts";
import { PATH_GATEWAY, PATH_FACTORY_GATEWAY } from "../../constants";
import { Resolve } from "../../domain/contracts/Resolve";
import { FormatDocument, TitleConversion } from "../../domain/entities";
import { CreateFile } from "../../domain/entities/CreateFile";

const GATEWAY_PATH = 'infra/gateway'

export class CreateGateway {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = "Gateway", test = true, properites = {}): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_GATEWAY),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFolder = `${pathFull}/src/${GATEWAY_PATH}`;
    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver,
    );

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated);

    this.logger.log({ message: `\n diretorio do gateway ${pathToWrite}` });

    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated}'\n`
    })

    const replacedFactoryFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFactoryFolder = `${pathFull}/src/${PATH_FACTORY_GATEWAY}`;
    const createFactoryFile = new CreateFile(
      this.fileStorage,
      this.pathResolver,
    );

    const pathToFactoryWrite = createFactoryFile.createFile(pathFactoryFolder, replacedFactoryFileString, titleFormated);

    this.logger.log({ message: `\n diretorio do gateway ${pathToFactoryWrite}` });

    this.fileStorage.appendFile({
      path: `${pathFactoryFolder}/index.ts`,
      content: `export * from './${titleFormated}'\n`
    })
    // const fileInTestString = this.fileStorage.readFileString({
    //   path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_TEST),
    // });

    // if (!fileInString) {
    //   throw new CouldNotWrite();
    // }

    if (test) {
      // const replacedFileTestString = fileInTestString.replace(new RegExp('{{ className }}','g'), name)
      // if(!this.fileStorage.folderExists({path:pathFull})){
      //     this.fileStorage.makeDir({ path: pathFull })
      // }
      // this.fileStorage.writeFileString({ path: path.resolve(`${pathFull}/src/domain/use-cases/test/${name}.ts`), content: replacedFileTestString })
    }

    return replacedFileString;
  }
}
