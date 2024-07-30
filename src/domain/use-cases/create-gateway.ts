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
	PATH_GATEWAY,
	PATH_FACTORY_GATEWAY,
	PATH_GATEWAY_TEST,
	GATEWAY_PATH_APPLICATION,
	GATEWAY_FACTORY_PATH,
} from "@/constants";
import { TitleConversion, ConstructorFile } from "@/domain/entities";

export class CreateGateway {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Gateway", test = true, properties = undefined, onlyTest = false): string {
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
        fullPathFolder: GATEWAY_PATH_APPLICATION,
        pathfileString: PATH_GATEWAY
      })
      .mountFile({
        fullPathFolder: GATEWAY_FACTORY_PATH,
        pathfileString: PATH_FACTORY_GATEWAY
      })
		}

		if (onlyTest || test) {
      constructorFile
      .mountFileTest({
        fullPathFolder: GATEWAY_PATH_APPLICATION,
        pathfileString: PATH_GATEWAY_TEST
      })
		}
		return "item";
	}
}
