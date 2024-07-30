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
import { PATH_EVENTS, PATH_EVENTS_TEST, EVENTS_PATH } from "@/constants";
import { FormatDocument, TitleConversion, CreateFile, ConstructorFile } from "@/domain/entities";

export class CreateEvents {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "EVENTS", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: EVENTS_PATH,
        pathfileString: PATH_EVENTS
      })
		}

		if (onlyTest || test) {
      constructorFile.mountFileTest({
        fullPathFolder: EVENTS_PATH,
        pathfileString: PATH_EVENTS_TEST
      })
		}

		return '';
	}
}
