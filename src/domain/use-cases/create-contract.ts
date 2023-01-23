import { FileNotFound } from "../entities/errors";
import { FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "@domain/contracts/Resolve";
import { PATH_CONTRACT } from "../../constants";
import { LogFailure, LogSuccess } from "@domain/contracts/logger";

export class CreateContract {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = "Contract", test = true): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const fullpath = GetCamelCaseArray(name)

    const replacedFileString = fileInString.replace(
      new RegExp("{{ className }}", "g"),
      name
    );

    if (!this.fileStorage.folderExists({ path: `${pathFull}/src/domain/contracts/` })) {
      this.fileStorage.makeDir({ path: `${pathFull}/src/domain/contracts/` });
    }

    const pathToWrite = this.pathResolver.pathresolve(`${pathFull}/src/domain/contracts/${name}.ts`)

    this.fileStorage.writeFileString({
      path: pathToWrite,
      content: replacedFileString,
    });

    this.logger.log({ message: `\n diretorio do contract ${pathToWrite}` });
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
