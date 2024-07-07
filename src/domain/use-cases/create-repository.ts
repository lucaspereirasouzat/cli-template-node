import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile,Resolve, FileExists } from "@/domain/contracts";
import {
	PATH_REPOSITORY,
	PATH_FACTORY_REPOSITORY,
	PATH_REPOSITORY_TEST,
	REPOSITORY_PATH,
	REPOSITORY_FACTORY_PATH,
} from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateRepository {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Repository", test = true, properites = undefined, onlyTest = false): string {
    const { UpperCase, titleFormated, path } = new TitleConversion(
      name
    ).getFormatedFields();
    const constructorFile = new ConstructorFile(
      this.fileStorage,
      this.pathResolver,
      this.logger,
      {
        UpperCase,
        properites,
        pathFull,
        path,
        titleFormated,
      }
    );

		if (!onlyTest) {
      constructorFile
      .mountFile({
        fullPathFolder: REPOSITORY_PATH,
        pathfileString: PATH_REPOSITORY
      })
      .mountFile({
        fullPathFolder: REPOSITORY_FACTORY_PATH,
        pathfileString: PATH_FACTORY_REPOSITORY
      })
		}

		if (onlyTest || test) {
      constructorFile
      .mountFile({
        fullPathFolder: REPOSITORY_PATH,
        pathfileString: PATH_REPOSITORY_TEST
      })
		}
		return "replacedFileString";
	}
}
