import { Resolve, AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile, FileExists } from "../contracts";
import { PATH_ERROR, PATH_ERROR_APPLICATION } from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateError {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Error", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: PATH_ERROR_APPLICATION,
        pathfileString: PATH_ERROR
      })
		}
    return ''
	}
}
