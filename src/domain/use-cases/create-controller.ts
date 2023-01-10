import fs from 'fs';
import path from 'path';
import { FolderExists, MakeDir, ReadFile, WriteFile } from '../contracts'

const PATH_CONTROLLER = '../../resources/views/templates/Controller.html'

export class CreateController {
  constructor(private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir) {

  }

 handle(pathFull: string): string {

  console.log(path.resolve(__dirname, PATH_CONTROLLER));

 const fileInString = this.fileStorage.readFileString({path:path.resolve(__dirname,PATH_CONTROLLER)})

console.log(fileInString);


      if(!fileInString){
        throw new Error("File Not found");
      }

      const replacedFileString = fileInString.replace('{{ className }}', 'MyClass')

      if(!this.fileStorage.folderExists({path:pathFull})){
          this.fileStorage.makeDir({ path: pathFull })
      }

      this.fileStorage.writeFileString({ path: path.resolve(`${pathFull}/Controller.ts`), content: replacedFileString })

      return replacedFileString
  }
}
