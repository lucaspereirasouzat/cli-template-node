import { CouldNotWrite, FileNotFound } from "@/domain/entities/errors";
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile,Resolve } from "@/domain/contracts";
import {
	PATH_REPOSITORY,
	PATH_FACTORY_REPOSITORY,
	PATH_REPOSITORY_TEST,
	REPOSITORY_PATH,
	REPOSITORY_FACTORY_PATH,
} from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateRepository {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Repository", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();

		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_REPOSITORY),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();

			const pathFolder = `${pathFull}/src/${REPOSITORY_PATH}`;
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);
			const pathToWrite = createFile.createFile(`${pathFolder}/${path}`, replacedFileString, titleFormated);

			this.logger.log({ message: `\n diretorio do repository ${pathToWrite}` });
      createFile.createIndex(path, pathFolder, titleFormated);

			const fileFactoryInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_FACTORY_REPOSITORY),
			});

			const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument();

			const pathFactoryFolder = `${pathFull}/src/${REPOSITORY_FACTORY_PATH}`;
			const createFactoryFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToFactoryWrite = createFactoryFile.createFile(
				`${pathFactoryFolder}/${path}`,
				replacedFactoryFileString,
				titleFormated,
			);

			this.logger.log({ message: `\n diretorio do factory repository ${pathToFactoryWrite}` });

      createFile.createIndex(path, pathFactoryFolder, titleFormated);
		}

		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_REPOSITORY_TEST),
		});

		if (fileInTestString === "") {
			throw new CouldNotWrite();
		}

		if (onlyTest || test) {
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);
			const pathTestFolder = `${pathFull}/tests/${REPOSITORY_PATH}/${path}`;
			const testnameFile = titleFormated.replace(".ts", ".spec.ts");

			const replacedFactoryTestFileString = new FormatDocument(
				fileInTestString,
				UpperCase,
				properites,
			).formatDocument();

			const pathToWriteTest = createFile.createFile(pathTestFolder, replacedFactoryTestFileString, testnameFile);
			this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` });
		}
		return "replacedFileString";
	}
}
