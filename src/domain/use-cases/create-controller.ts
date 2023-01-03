import { FolderExists, MakeDir, ReadFile, WriteFile } from '../contracts'

const PATH_CONTROLLER = '../../src/resources/views/templates/Controller.html'

export class CreateController {
  constructor(private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir) {
    
  }

 handle(path: string): string {
      const fileInString = this.fileStorage.readFileString({path:PATH_CONTROLLER})


      if(!fileInString){
        throw new Error("File Not found");
      }

      const replacedFileString = fileInString.replace('{{ className }}', 'MyClass')
      
      if(!this.fileStorage.folderExists({path:PATH_CONTROLLER})){
          this.fileStorage.makeDir({ path: PATH_CONTROLLER })
      }

      this.fileStorage.writeFileString({ path: `${path}/Controller.ts`, content: replacedFileString })
      
      return replacedFileString
  }
}