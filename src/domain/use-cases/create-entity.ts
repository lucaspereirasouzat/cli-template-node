import { FileNotFound, CouldNotWrite } from "../entities/errors";
import { FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "@domain/contracts/Resolve";
import { PATH_ERROR } from "../../constants";
import { LogFailure, LogSuccess } from "@domain/contracts/logger";

export class CreateEntity {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = "Entity", test = true): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_ERROR),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const replacedFileString = fileInString.replace(
      new RegExp("{{ className }}", "g"),
      name
    );

    if (!this.fileStorage.folderExists({ path: `${pathFull}/src/domain/entities/` })) {
      this.fileStorage.makeDir({ path: `${pathFull}/src/domain/entities/` });
    }

    const pathToWrite = this.pathResolver.pathresolve(`${pathFull}/src/domain/entities/${name}.ts`)

    this.fileStorage.writeFileString({
      path: pathToWrite,
      content: replacedFileString,
    });
    this.logger.log({ message: `\n diretorio da entidade ${pathToWrite}` });

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
