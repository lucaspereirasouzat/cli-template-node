import { FileNotFound, CouldNotWrite } from "@/domain/entities/errors";
import {
  FolderExists,
  MakeDir,
  ReadFile,
  WriteFile,
  AppendFile,
  FileExists,
} from "@/domain/contracts";
import {
  PATH_CONTROLLER,
  PATH_CONTROLLER_TEST,
  PATH_CONTROLLER_APPLICATION,
  PATH_FACTORY_CONTROLLER,
  CONTROLLER_FACTORY_PATH,
} from "@/constants";
import { LogFailure, LogSuccess } from "@/domain/contracts/logger";
import { Resolve } from "@/domain/contracts/Resolve";
import {
  FormatDocument,
  TitleConversion,
  CreateFile,
  ConstructorFile,
} from "@/domain/entities";

export class CreateController {
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
    name = "Controller",
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
      constructorFile
        .mountFile({
          pathfileString: PATH_CONTROLLER,
          fullPathFolder: PATH_CONTROLLER_APPLICATION,
        })
        .mountFile({
          pathfileString: PATH_FACTORY_CONTROLLER,
          fullPathFolder: CONTROLLER_FACTORY_PATH,
        });
    }

    if (onlyTest || test) {
      constructorFile.mountFileTest({
        fullPathFolder: PATH_CONTROLLER_APPLICATION,
        pathfileString: PATH_CONTROLLER_TEST,
      });
    }

    return "";
  }
}
