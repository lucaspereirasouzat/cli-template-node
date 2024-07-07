import {
	AppendFile,
	FolderExists,
	LogFailure,
	LogSuccess,
	MakeDir,
	ReadFile,
	WriteFile,
	Resolve,
  FileExists,
} from "@/domain/contracts";
import {
	PATH_USE_CASE,
	PATH_USE_CASE_TEST,
	PATH_USE_CASE_DOMAIN,
	PATH_USE_CASE_FACTORY,
	PATH_USE_CASE_GATEWAY,
} from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateUseCase {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "UseCase", test = true, properites = undefined, onlyTest = false): string {
  const { UpperCase, titleFormated, path } = new TitleConversion(name).getFormatedFields();

    const constructorFile = new ConstructorFile(
      this.fileStorage,
      this.pathResolver,
      this.logger,
      {
        UpperCase,
        properites,
        pathFull,
        path,
        titleFormated
      }
    )

		if (!onlyTest) {
      constructorFile
      .mountFile({
        fullPathFolder: PATH_USE_CASE_DOMAIN,
        pathfileString: PATH_USE_CASE
      })
      .mountFile({
        fullPathFolder: PATH_USE_CASE_GATEWAY,
        pathfileString: PATH_USE_CASE_FACTORY
      })
		}

		if (onlyTest || test) {
      constructorFile
      .mountFileTest({
        fullPathFolder: PATH_USE_CASE_DOMAIN,
        pathfileString: PATH_USE_CASE_TEST
      })
		}
		return '';
	}
}
