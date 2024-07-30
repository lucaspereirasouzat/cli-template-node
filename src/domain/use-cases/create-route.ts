import {
	AppendFile,
	FileExists,
	FolderExists,
	LogFailure,
	LogSuccess,
	MakeDir,
	ReadFile,
	WriteFile,
  Resolve
} from "@/domain/contracts";
import { PATH_ROUTE,PATH_ROUTE_TEST,ROUTE_PATH } from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateRoute {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Route", test = true, properties = undefined, onlyTest = false): string {
    const { UpperCase, titleFormated, path } = new TitleConversion(name).getFormatedFields();

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
        fullPathFolder: ROUTE_PATH,
        pathfileString: PATH_ROUTE
      })
		}

		if (test) {
      constructorFile.mountFileTest({
        fullPathFolder: ROUTE_PATH,
        pathfileString: PATH_ROUTE_TEST
      })
		}

		return '';
	}
}
