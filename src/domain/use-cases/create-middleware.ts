import { CouldNotWrite, FileNotFound } from "@/domain/entities/errors";
import { Resolve, AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from "@/domain/contracts";
import {
	MIDDLEWARE_PATH,
  PATH_MIDDLEWARE,
  PATH_MIDDLEWARE_TEST,
  MIDDLEWARE_MAIN_PATH,
  PATH_MAIN_MIDDLEWARE
} from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateMiddleware {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Middleware", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();
		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_MIDDLEWARE),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();
			const pathFolder = `${pathFull}/src/${MIDDLEWARE_PATH}`;

			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);

      createFile.createIndex(path, pathFolder, titleFormated);

			this.logger.log({ message: `\n diretorio do MIDDLEWARE ${pathToWrite}` });

			const fileFactoryInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_MAIN_MIDDLEWARE),
			});

			const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument();

			const pathFactoryFolder = `${pathFull}/src/${MIDDLEWARE_MAIN_PATH}`;
			const createFactoryFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToFactoryWrite = createFactoryFile.createFile(
				`${pathFactoryFolder}/${path}`,
				replacedFactoryFileString,
				titleFormated,
			);

			this.logger.log({ message: `\n diretorio do factory middleware ${pathToFactoryWrite}` });

      createFile.createIndex(path, pathFactoryFolder, titleFormated);
		}

		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_MIDDLEWARE_TEST),
		});

		if (fileInTestString == null) {
			throw new CouldNotWrite();
		}

		if (onlyTest || test) {
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathTestFolder = `${pathFull}/tests/${MIDDLEWARE_PATH}/${path}`;
			const replacedFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument();
			const pathToWriteTest = createFile.createFile(
				pathTestFolder,
				replacedFileString,
				titleFormated.replace(".ts", ".spec.ts"),
			);
			this.logger.log({ message: `\n diretorio do middleware test ${pathToWriteTest}` });
		}
		return "replacedFileString";
	}
}
