import { AppendFile, FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "domain/contracts/Resolve";

export class CreateFile {
		constructor(
			private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
			private readonly pathResolver: Resolve,
		) {}

		createFile(pathFolder: string, content: string, titleFormated: string): string {
			if (!this.fileStorage.folderExists({ path: pathFolder })) {
				this.fileStorage.makeDir({ path: pathFolder });
			}

			const pathToWrite = this.pathResolver.pathresolve(`${pathFolder}/${titleFormated}`);

			this.fileStorage.writeFileString({
				path: pathToWrite,
				content,
			});

			return pathToWrite;
		}

    transformPath():string{
      return
    }

		validateAndAppendToIndex(pathFileFolder: string, pathSplited: string): void {
			let indexFileString = "";

			try {
				indexFileString = this.fileStorage.readFileString({
					path: this.pathResolver.pathresolve(`${pathFileFolder}/index.ts`),
				});
			} catch (error) {
				console.log(error);
			}

			let isInsideString = false;
			if (indexFileString) {
				isInsideString = indexFileString.includes(`export * from './${pathSplited}'`);
			}
      console.log(isInsideString);

			if (!isInsideString) {
				this.fileStorage.appendFile({
					path: `${pathFileFolder}/index.ts`,
					content: `export * from './${pathSplited}'\n`,
				});
			}
		}

		// createIndex (path: string): void {
		//   const indexFileString = this.fileStorage.readFileString({
		//     // path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_FACTORY)
		//   })

		//   let isInsideString = false
		//   if (indexFileString) {
		//     // isInsideString = indexFileString.includes(`export * from './${nextPath}'`)
		//   }

		//   if (!isInsideString) {
		//     this.fileStorage.appendFile({
		//       // path: `${pathFull}/src/${PATH_USE_CASE_DOMAIN}/index.ts`,
		//       // content: `export * from './${nextPath}'\n`
		//     })
		//   }
		// }
	}
