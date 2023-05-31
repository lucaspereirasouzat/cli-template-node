import { CouldNotWrite, FileNotFound } from "../entities/errors";
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile,Resolve } from "@/domain/contracts";
import {
	PATH_GATEWAY,
	PATH_FACTORY_GATEWAY,
	PATH_GATEWAY_TEST,
	GATEWAY_PATH_APPLICATION,
	GATEWAY_FACTORY_PATH,
} from "@/constants";
import { FormatDocument, TitleConversion, CreateFile } from "@/domain/entities";

export class CreateGateway {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Gateway", test = true, properites = undefined, onlyTest = false): string {
		const titleConversion = new TitleConversion(name);
		const UpperCase = titleConversion.GetCamelCaseName();
		const titleFormated = titleConversion.GetFormatedTitleFileName();
		const path = titleConversion.getPathFromTitle();
		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_GATEWAY),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();
      const originalPath = `${pathFull}/src/${GATEWAY_PATH_APPLICATION}`
			const pathFolder = `${originalPath}/${path}`;
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated);

			this.logger.log({ message: `\n diretorio do gateway ${pathToWrite}` });

			createFile.createIndex(path, originalPath, titleFormated);

			const fileFactoryInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_FACTORY_GATEWAY),
			});

			const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument();

			const pathFactoryFolder = `${pathFull}/src/${GATEWAY_FACTORY_PATH}`;
			const createFactoryFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToFactoryWrite = createFactoryFile.createFile(
				`${pathFactoryFolder}/${path}`,
				replacedFactoryFileString,
				titleFormated,
			);

			this.logger.log({ message: `\n diretorio do factory gateway ${pathToFactoryWrite}` });

      createFile.createIndex(path, pathFactoryFolder, titleFormated);
		}
		const fileInTestString = this.fileStorage.readFileString({
			path: this.pathResolver.pathresolve(__dirname, PATH_GATEWAY_TEST),
		});

		if (fileInTestString === "") {
			throw new CouldNotWrite();
		}

		if (onlyTest || test) {
			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathTestFolder = `${pathFull}/tests/${GATEWAY_PATH_APPLICATION}/${path}`;

			const testnameFile = titleFormated.replace(".ts", ".spec.ts");

			const replacedFactoryTestFileString = new FormatDocument(
				fileInTestString,
				UpperCase,
				properites,
			).formatDocument();

			const pathToWriteTest = createFile.createFile(pathTestFolder, replacedFactoryTestFileString, testnameFile);
			this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` });
		}
		return "item";
	}
}
