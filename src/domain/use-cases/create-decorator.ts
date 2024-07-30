import {
	AppendFile,
	FileExists,
	FolderExists,
	LogFailure,
	LogSuccess,
	MakeDir,
	ReadFile,
	WriteFile,
	Resolve,
} from "@/domain/contracts";
import { PATH_DECORATOR, PATH_DECORATOR_TEST, DECORATOR_PATH } from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateDecorator {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "DECORATOR", test = true, properties = undefined, onlyTest = false): string {
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
      constructorFile.mountFile({
        fullPathFolder: DECORATOR_PATH,
        pathfileString: PATH_DECORATOR
      })
		}

		if (test) {
      constructorFile.mountFileTest({
        fullPathFolder: DECORATOR_PATH,
        pathfileString: PATH_DECORATOR_TEST
      })
		}

		return '';
	}
}
