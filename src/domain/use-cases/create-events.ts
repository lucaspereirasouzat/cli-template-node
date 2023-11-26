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
  Resolve
} from "@/domain/contracts";
import { PATH_EVENTS,PATH_EVENTS_TEST,EVENTS_PATH } from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateEvents {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "EVENTS", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();
		const createFile = new CreateFile(this.fileStorage, this.pathResolver);

		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_EVENTS),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();
			const pathFolder = `${pathFull}/src/${EVENTS_PATH}`;
			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);

			this.logger.log({ message: `\n diretorio do eVENTS ${pathToWrite}` });

			createFile.createIndex(path, pathFolder, titleFormated);
		}

		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_EVENTS_TEST),
		});

		if (fileInTestString == null) {
			throw new CouldNotWrite();
		}

		if (onlyTest || test) {
      const createFile = new CreateFile(this.fileStorage, this.pathResolver);
		  const pathTestFolder = `${pathFull}/tests/${EVENTS_PATH}/${path}`;
			const replacedFactoryTestFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument();
      const pathToWriteTest = createFile.createFile(
				pathTestFolder,
				replacedFactoryTestFileString,
				titleFormated.replace(".ts", ".spec.ts"),
			);
			this.logger.log({ message: `\n diretorio da event test ${pathToWriteTest}` });
		}

		return fileInTestString;
	}
}
