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
import { PATH_ADAPTER, PATH_ADAPTER_TEST, PATH_ADAPTER_PATH } from "@/constants";
import { FormatDocument, TitleConversion,CreateFile } from "@/domain/entities";

export class CreateAdapter {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Adapter", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();

		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_ADAPTER),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();

			const pathFolder = `${pathFull}/src/${PATH_ADAPTER_PATH}`;
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);

			this.logger.log({ message: `\n diretorio da entidade ${pathToWrite}` });

			createFile.createIndex(path, pathFolder, titleFormated);
		}

		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_ADAPTER_TEST),
		});

		if (fileInTestString == null) {
			throw new CouldNotWrite();
		}

		if (test) {
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);
			const pathTestFolder = `${pathFull}/tests/${PATH_ADAPTER_PATH}/${path}`;
      const replacedFileTestString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument();
			const pathToWriteTest = createFile.createFile(
				pathTestFolder,
				replacedFileTestString,
				titleFormated.replace(".ts", ".spec.ts"),
			);
			this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` });
		}

		return fileInTestString;
	}
}
