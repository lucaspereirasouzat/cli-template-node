import { Resolve, AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile, FileExists } from "@/domain/contracts";
import {
	MIDDLEWARE_PATH,
  PATH_MIDDLEWARE,
  PATH_MIDDLEWARE_TEST,
  MIDDLEWARE_MAIN_PATH,
  PATH_MAIN_MIDDLEWARE
} from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateMiddleware {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Middleware", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: MIDDLEWARE_PATH,
        pathfileString: PATH_MIDDLEWARE
      })
      .mountFile({
        pathfileString: PATH_MAIN_MIDDLEWARE,
        fullPathFolder: MIDDLEWARE_MAIN_PATH
      })
		}

		if (onlyTest || test) {
      constructorFile
      .mountFileTest({
        fullPathFolder: MIDDLEWARE_PATH,
        pathfileString: PATH_MIDDLEWARE_TEST
      })
		}
		return "replacedFileString";
	}
}
