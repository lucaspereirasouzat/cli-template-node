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
import { PATH_VALIDATION, PATH_VALIDATION_TEST, VALIDATION_PATH } from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateValidation {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Validation", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: VALIDATION_PATH,
        pathfileString: PATH_VALIDATION
      })
		}

		if (test) {
      constructorFile.mountFileTest({
        fullPathFolder: VALIDATION_PATH,
        pathfileString: PATH_VALIDATION_TEST
      })
		}

		return '';
	}
}
