import { FileNotFound, CouldNotWrite } from "../../domain/entities/errors";
import path from "path";
import { FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";

const PATH_CONTROLLER = "../../resources/views/templates/Controller.html";
const PATH_CONTROLLER_TEST =
  "../../resources/views/templates/ControllerTest.html";

export class CreateController {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir
  ) {}

  handle(pathFull: string, name = "Controller", test = true): string {
    const fileInString = this.fileStorage.readFileString({
      path: path.resolve(__dirname, PATH_CONTROLLER),
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

    this.fileStorage.writeFileString({
      path: path.resolve(`${pathFull}/domain/use-cases/${name}.ts`),
      content: replacedFileString,
    });

    const fileInTestString = this.fileStorage.readFileString({
      path: path.resolve(__dirname, PATH_CONTROLLER_TEST),
    });

    if (!fileInString) {
      throw new CouldNotWrite();
    }

    if (test) {
      // const replacedFileTestString = fileInTestString.replace(new RegExp('{{ className }}','g'), name)
      // if(!this.fileStorage.folderExists({path:pathFull})){
      //     this.fileStorage.makeDir({ path: pathFull })
      // }
      // this.fileStorage.writeFileString({ path: path.resolve(`${pathFull}/domain/use-cases/test/${name}.ts`), content: replacedFileTestString })
    }

    return fileInTestString;
  }
}
