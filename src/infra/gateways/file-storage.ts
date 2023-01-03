import fs from 'fs'
import { ReadFile, WriteFile,FolderExists, MakeDir } from '../../domain/contracts'

export class FileStorage implements ReadFile,WriteFile,FolderExists,MakeDir {
  readFileString (input: ReadFile.Input): string {
    const templateFile = fs.readFileSync(input.path, 'utf8')
    return templateFile
  }

    writeFileString(input: WriteFile.Input): WriteFile.Output {
        fs.writeFileSync(input.path, input.content)
    }

    folderExists(input: FolderExists.Input): FolderExists.Output {
      return fs.existsSync(input.path)
    }

    makeDir(input: MakeDir.Input) : MakeDir.Output{
        fs.mkdirSync(input.path)
    }
  }

