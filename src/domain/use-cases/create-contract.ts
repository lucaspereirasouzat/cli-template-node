import { FileNotFound } from "../entities/errors";
import { FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "@domain/contracts/Resolve";
import { PATH_CONTRACT } from "../../constants";

export class CreateContract {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir,
    private readonly pathResolver: Resolve
  ) { }

  handle(pathFull: string, name = "Contract", test = true): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT),
    });

    if (!fileInString) {
      throw new FileNotFound();
    }

    const replacedFileString = fileInString.replace(
      new RegExp("{{ className }}", "g"),
      name
    );

    if (!this.fileStorage.folderExists({ path: pathFull })) {
      this.fileStorage.makeDir({ path: pathFull });
    }

    const pathToWrite = this.pathResolver.pathresolve(`${pathFull}/domain/contracts/${name}.ts`)

    this.fileStorage.writeFileString({
      path: pathToWrite,
      content: replacedFileString,
    });
    console.log('\n diretorio do contract', pathToWrite, '\n');
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
      // this.fileStorage.writeFileString({ path: path.resolve(`${pathFull}/domain/use-cases/test/${name}.ts`), content: replacedFileTestString })
    }

    return replacedFileString;
  }
}
