import { FileNotFound } from "../entities/errors";
import {
	FolderExists,
	LogFailure,
	LogSuccess,
	MakeDir,
	ReadFile,
	WriteFile,
	AppendFile,
	FileExists,
} from "../contracts";
import { PATH_CONTRACT, DOMAIN_CONTRACT_PATH } from "../../constants";
import { Resolve } from "../../domain/contracts/Resolve";
import { TitleConversion, FormatDocument } from "../../domain/entities";
import { CreateFile } from "../../domain/entities/CreateFile";

export class CreateContract {
	constructor(
		private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
		private readonly pathResolver: Resolve,
		private readonly logger: LogFailure & LogSuccess,
	) {}

	handle(pathFull: string, name = "Contract", test = true, properites = undefined, onlyTest = false): string {
		if (!onlyTest) {
			const fileInString = this.fileStorage.readFileString({
				path: this.pathResolver.pathresolve(__dirname, PATH_CONTRACT),
			});

			if (fileInString == null) {
				throw new FileNotFound();
			}

			const titleConversion = new TitleConversion(name);

			const UpperCase = titleConversion.GetCamelCaseName();
			const titleFormated = titleConversion.GetFormatedTitleFileName();
			const path = titleConversion.getPathFromTitle();

			const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument();

			const pathFolder = `${pathFull}/src/${DOMAIN_CONTRACT_PATH}/${path}`;

			const createFile = new CreateFile(this.fileStorage, this.pathResolver);

			const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated);
			this.logger.log({ message: `\n diretorio do contract ${pathToWrite}` });

			// let pathCombined = "";
			// const splitedPath = path.split("/");

			// // const pathFileFolder = DOMAIN_CONTRACT_PATH;
			// // const pathFolderSetInde = PATH_USE_CASE_DOMAIN;
			// // const NEXT_INDEX = 1;
			// // const FIRST_INDEX = 0;
			// // console.log(splitedPath);

			// // splitedPath.forEach((pathSplited, index) => {
			// // 	console.log("splitedPath  for", pathSplited, index);

			// // 	const nextPath = splitedPath[index + NEXT_INDEX];
			// // 	console.log("nextPath", nextPath);

			// // 	if (pathSplited && nextPath) {
			// // 		pathCombined += index === FIRST_INDEX ? `${pathSplited}` : `/${pathSplited}`;
			// // 		console.log("pathCombined", pathCombined);
			// // 		if (index === FIRST_INDEX) {
			// // 			const indexFileString = this.fileStorage.readFileString({
			// // 				path: this.pathResolver.pathresolve(__dirname, pathFileFolder),
			// // 			});

			// // 			let isInsideString = false;
			// // 			if (indexFileString) {
			// // 				isInsideString = indexFileString.includes(`export * from './${nextPath}'`);
			// // 			}

			// // 			if (!isInsideString) {
			// // 				this.fileStorage.appendFile({
			// // 					path: `${pathFull}/src/${pathFolderSetInde}/index.ts`,
			// // 					content: `export * from './${nextPath}'\n`,
			// // 				});
			// // 			}
			// // 		}
			// // 		console.log("passou", pathCombined);

			// // 		this.fileStorage.makeDir({
			// // 			path: `${pathFull}/src/${pathFolderSetInde}/${pathCombined}`,
			// // 		});
			// // 		this.fileStorage.appendFile({
			// // 			path: `${pathFull}/src/${pathFolderSetInde}/${pathCombined}/index.ts`,
			// // 			content: `export * from './${nextPath}'\n`,
			// // 		});
			// // 	}
			// // });

			this.fileStorage.appendFile({
				path: `${pathFolder}/index.ts`,
				content: `export * from './${titleFormated.replace(".ts", "")}'\n`,
			});

			return replacedFileString;
		}
	}
}
