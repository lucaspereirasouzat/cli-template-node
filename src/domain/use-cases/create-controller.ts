import { FileNotFound, CouldNotWrite } from '../../domain/entities/errors'
import { FolderExists, MakeDir, ReadFile, WriteFile, AppendFile, FileExists } from '../contracts'
import { PATH_CONTROLLER, PATH_CONTROLLER_TEST, PATH_CONTROLLER_APLICATION } from '../../constants'
import { LogFailure, LogSuccess } from '../../domain/contracts/logger'
import { Resolve } from '../../domain/contracts/Resolve'
import { FormatDocument, TitleConversion } from '../../domain/entities'
import { CreateFile } from '../entities/CreateFile'

export class CreateController {
  constructor (
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle (pathFull: string, name = 'Controller', test = true, properites = undefined, onlyTest = false): string {
    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const path = titleConversion.getPathFromTitle()
    if (!onlyTest) {
      const fileInString = this.fileStorage.readFileString({
        path: this.pathResolver.pathresolve(__dirname, PATH_CONTROLLER)
      })

      if (fileInString == null) {
        throw new FileNotFound()
      }

      const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()
      const pathFolder = `${pathFull}/src/${PATH_CONTROLLER_APLICATION}/${path}`

      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

      this.logger.log({ message: `\n diretorio da controller ${pathToWrite}` })

      this.fileStorage.appendFile({
        path: `${pathFolder}/index.ts`,
        content: `export * from './${titleFormated.replace('.ts', '')}'\n`
      })
    }

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_CONTROLLER_TEST)
    })

    if (fileInTestString === '') {
      throw new CouldNotWrite()
    }

    if (onlyTest || test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${PATH_CONTROLLER_APLICATION}/`

      const pathToWriteTest = createFile.createFile(pathTestFolder, fileInTestString, titleFormated.replace('.ts', '.spec.ts'))
      this.logger.log({ message: `\n diretorio da controller test ${pathToWriteTest}` })
    }

    return fileInTestString
  }
}
