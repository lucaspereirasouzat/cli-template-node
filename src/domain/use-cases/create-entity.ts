import { CouldNotWrite, FileNotFound } from "@/domain/entities/errors";
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
import { PATH_ENTITY, PATH_ENTITY_TEST, PATH_ENTITY_PATH } from "@/constants";
import { FormatDocument, TitleConversion, CreateFile, ConstructorFile } from "@/domain/entities";

export class CreateEntity {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Entity", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: PATH_ENTITY_PATH,
        pathfileString: PATH_ENTITY
      })
		}

		if (test) {
      constructorFile.mountFileTest({
        fullPathFolder: PATH_ENTITY_PATH,
        pathfileString: PATH_ENTITY_TEST
      })
		}

		return '';
	}
}
