import { FolderExists, MakeDir, ReadFile, WriteFile } from '../contracts'
import { Resolve } from 'domain/contracts/Resolve'

export class CreateFile {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir,
    private readonly pathResolver: Resolve
  ) { }

  createFile(pathFolder: string, content: string, titleFormated: string): string {
    if (!this.fileStorage.folderExists({ path: pathFolder })) {
      this.fileStorage.makeDir({ path: pathFolder })
    }

    const pathToWrite = this.pathResolver.pathresolve(`${pathFolder}/${titleFormated}`)

    this.fileStorage.writeFileString({
      path: pathToWrite,
      content
    })

    return pathToWrite
  }
}
