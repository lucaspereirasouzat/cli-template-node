import { Resolve, AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from "../contracts";
import { FileNotFound } from "../entities/errors";
import { PATH_ERROR, PATH_ERROR_APPLICATION } from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateError {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Error", test = true, properites = undefined, onlyTest = false): string {
		if(!onlyTest){
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_ERROR),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const titleConversion = new TitleConversion(name);
			const UpperCase = titleConversion.GetCamelCaseName();
			const titleFormated = titleConversion.GetFormatedTitleFileName();
			const path = titleConversion.getPathFromTitle();
			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();

			const pathFolder = `${pathFull}/src/${PATH_ERROR_APPLICATION}`;

			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);
			this.logger.log({ message: `\n diretorio do error: ${pathToWrite}` });

			createFile.createIndex(path, pathFolder, titleFormated);

			return replacedFileString;
		}
	}
}
