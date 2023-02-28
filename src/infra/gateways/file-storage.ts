import fs from 'fs'
import { ReadFile, WriteFile, FolderExists, MakeDir, AppendFile, FileExists } from '@/domain/contracts/filestorage'

export class FileStorage implements ReadFile, WriteFile, FolderExists, MakeDir, AppendFile, FileExists {
  fileExists (input: FileExists.Input): FileExists.Output {
    return fs.existsSync(input.path)
  }

  appendFile (input: AppendFile.Input): void {
    fs.appendFileSync(input.path, input.content)
  }

  readFileString (input: ReadFile.Input): string {
    return fs.readFileSync(input.path, 'utf8')
  }

  writeFileString (input: WriteFile.Input): WriteFile.Output {
    fs.writeFileSync(input.path, input.content)
  }

  folderExists (input: FolderExists.Input): FolderExists.Output {
    return fs.existsSync(input.path)
  }

  makeDir (input: MakeDir.Input): void {
    fs.mkdirSync(input.path, { recursive: true })
  }
}
