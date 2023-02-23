import { AppendFile, FolderExists, MakeDir, ReadFile, WriteFile } from "../contracts";
import { Resolve } from "domain/contracts/Resolve";
import { TitleConversion } from "./TitleConversion";

const NEXT_INDEX = 1;
const FIRST_INDEX = 0;

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

		transformPath(): string {
			return;
		}

		validateAndAppendToIndex(pathFileFolder: string, pathSplited: string): void {
			let indexFileString = "";

			try {
				indexFileString = this.fileStorage.readFileString({
					path: this.pathResolver.pathresolve(`${pathFileFolder}/index.ts`),
				});
			} catch (error) {
			}

			let isInsideString = false;
			if (indexFileString) {
				isInsideString = indexFileString.includes(`export * from './${pathSplited}'`);
			}

			if (!isInsideString) {
				this.fileStorage.appendFile({
					path: `${pathFileFolder}/index.ts`,
					content: `export * from './${pathSplited}'\n`,
				});
			}
		}

		createIndex(path: string, pathFileFolder: string, titleFormated: string): void {
			let splitedPath = path.split("/");
      console.log('splitedPath', splitedPath,titleFormated);

			let pathCombined = "";
			splitedPath.forEach((pathSplited, index) => {
      console.log('splitedPath Foreach', pathSplited, index);

				const nextPath = splitedPath[index + NEXT_INDEX];
				if (pathSplited) {
      console.log('splitedPath Foreach if', pathSplited, index);

					pathCombined += index === FIRST_INDEX ? `${pathSplited}` : `/${pathSplited}`;
					if (index === FIRST_INDEX) {
						this.validateAndAppendToIndex(pathFileFolder, new TitleConversion(pathSplited).GetTranformToKebabCase());
					}
          console.log('pathCombined',pathCombined);

          console.log('passou first Index','path',pathSplited,`${pathFileFolder}/${pathCombined}`,
						new TitleConversion(nextPath).GetTranformToKebabCase());

					this.validateAndAppendToIndex(
						`${pathFileFolder}/${pathCombined}`,
						new TitleConversion(nextPath).GetTranformToKebabCase(),
					);
				}
			});
      console.log('title',titleFormated);
      console.log('pathFileFolder',pathFileFolder);
      console.log('pathCombined',pathCombined);

      console.log('path',`${pathFileFolder}/${pathCombined}`);

          console.log('passou first Index','path',`${pathFileFolder}/${pathCombined}`, 'title',`${titleFormated.replace(".ts", "")}`);
			this.validateAndAppendToIndex(`${pathFileFolder}/${pathCombined}`, `${titleFormated.replace(".ts", "")}`);
		}
	}
