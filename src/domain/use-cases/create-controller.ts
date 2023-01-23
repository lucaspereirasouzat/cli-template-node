import { FileNotFound, CouldNotWrite } from "../../domain/entities/errors";
import { FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "@domain/contracts/Resolve";
import { PATH_CONTROLLER, PATH_CONTROLLER_TEST } from "../../constants";
import { LogFailure, LogSuccess } from "@domain/contracts/logger";

export class CreateController {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = "Controller", test = true): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTROLLER),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const replacedFileString = fileInString.replace(
      new RegExp("{{ className }}", "g"),
      name
    );

    if (!this.fileStorage.folderExists({ path: `${pathFull}/src/domain/use-cases/` })) {
      this.fileStorage.makeDir({ path: `${pathFull}/src/domain/use-cases/` });
    }

    const pathToWrite = this.pathResolver.pathresolve(`${pathFull}/src/domain/use-cases/${name}.ts`)
    this.logger.log({ message: `\n diretorio da controller ${pathToWrite}` });

    this.fileStorage.writeFileString({
      path: pathToWrite,
      content: replacedFileString,
    });

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTROLLER_TEST),
    });

    if (!fileInString) {
      throw new CouldNotWrite();
    }

    if (test) {
      // const replacedFileTestString = fileInTestString.replace(new RegExp('{{ className }}','g'), name)
      // if(!this.fileStorage.folderExists({path:pathFull})){
      //     this.fileStorage.makeDir({ path: pathFull })
      // }
      // this.fileStorage.writeFileString({ path: path.resolve(`${pathFull}/src/domain/use-cases/test/${name}.ts`), content: replacedFileTestString })
    }

    return fileInTestString;
  }
}
