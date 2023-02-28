import { CouldNotWrite, FileNotFound } from "@/domain/entities/errors";
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile,Resolve } from "@/domain/contracts";
import {
	PATH_USE_CASE,
	PATH_USE_CASE_TEST,
	PATH_USE_CASE_DOMAIN,
	PATH_USE_CASE_FACTORY,
	PATH_USE_CASE_GATEWAY,
} from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateUseCase {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "UseCase", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();
		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();
			const pathFolder = `${pathFull}/src/${PATH_USE_CASE_DOMAIN}`;

			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);

			createFile.createIndex(path, pathFolder, titleFormated);

			this.logger.log({ message: `\n diretorio do Usecase ${pathToWrite}` });

			const fileFactoryInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_FACTORY),
			});

			const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument();

			const pathFactoryFolder = `${pathFull}/src/${PATH_USE_CASE_GATEWAY}`;

			const pathToFactoryWrite = createFile.createFile(
				`${pathFactoryFolder}/${path}`,
				replacedFactoryFileString,
				titleFormated,
			);

			this.logger.log({ message: `\n diretorio do factory usecase ${pathToFactoryWrite}` });

			createFile.createIndex(path, pathFactoryFolder, titleFormated);
		}

		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_TEST),
		});

		if (fileInTestString == null) {
			throw new CouldNotWrite();
		}

		if (onlyTest || test) {
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathTestFolder = `${pathFull}/tests/${PATH_USE_CASE_DOMAIN}/${path}`;
			const replacedFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument();
			const pathToWriteTest = createFile.createFile(
				pathTestFolder,
				replacedFileString,
				titleFormated.replace(".ts", ".spec.ts"),
			);
			this.logger.log({ message: `\n diretorio do usecase test ${pathToWriteTest}` });
		}
		return "replacedFileString";
	}
}
