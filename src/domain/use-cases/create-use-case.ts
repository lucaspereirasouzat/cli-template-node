import { CouldNotWrite, FileNotFound } from '../entities/errors'
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from '../contracts'
import { PATH_USE_CASE, PATH_USE_CASE_TEST } from '../../constants'
import { Resolve } from '../../domain/contracts/Resolve'
import { FormatDocument, TitleConversion } from '../../domain/entities'
import { CreateFile } from '../../domain/entities/CreateFile'

const PATH_USE_CASE_DOMAIN = 'domain/use-cases'

export class CreateUseCase {
  constructor (
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle (pathFull: string, name = 'UseCase', test = true, properites = undefined): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE)
    })

    if (fileInString == null) {
      throw new FileNotFound()
    }

    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const path = titleConversion.getPathFromTitle()
    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()
    const pathFolder = `${pathFull}/src/${PATH_USE_CASE_DOMAIN}/${path}`

    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated.replace('.ts', '')}'\n`
    })
    this.logger.log({ message: `\n diretorio do Usecase ${pathToWrite}` })

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_TEST)
    })

    if (fileInString == null) {
      throw new CouldNotWrite()
    }

    if (test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${PATH_USE_CASE_DOMAIN}`

      const pathToWriteTest = createFile.createFile(pathTestFolder, fileInTestString, titleFormated.replace('.ts', '.spec.ts'))
      this.logger.log({ message: `\n diretorio do usecase test ${pathToWriteTest}` })
    }
    return replacedFileString
  }
}
