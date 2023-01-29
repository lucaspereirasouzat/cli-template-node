import { FileNotFound } from "../entities/errors";
import { FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile, AppendFile, FileExists } from "../contracts";
import { PATH_CONTRACT, DOMAIN_CONTRACT_PATH } from "../../constants";
import { Resolve } from "../../domain/contracts/Resolve";
import { TitleConversion, FormatDocument } from "../../domain/entities";
import { CreateFile } from "../../domain/entities/CreateFile";

export class CreateContract {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = "Contract", test = true, properites = {}): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const titleConversion = new TitleConversion(name)

    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()

    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFolder = `${pathFull}/src/${DOMAIN_CONTRACT_PATH}`;

    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver,
    );

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated);
    this.logger.log({ message: `\n diretorio do contract ${pathToWrite}` });
    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated}'\n`
    })
    // const fileInTestString = this.fileStorage.readFileString({
    //   path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT_TEST),
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