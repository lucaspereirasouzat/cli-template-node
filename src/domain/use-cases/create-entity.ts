import { CouldNotWrite, FileNotFound } from '../entities/errors'
import { AppendFile, FileExists, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from '../contracts'
import { PATH_ENTITY, PATH_ENTITY_TEST } from '../../constants'
import { Resolve } from '../../domain/contracts/Resolve'
import { FormatDocument, TitleConversion } from '../../domain/entities'
import { CreateFile } from '../../domain/entities/CreateFile'

const PATH_ENTITY_PATH = 'domain/entities'

export class CreateEntity {
  constructor (
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile & FileExists,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle (pathFull: string, name = 'Entity', test = true, properites = {}): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_ENTITY)
    })

    if (fileInString == null) {
      throw new FileNotFound()
    }

    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const path = titleConversion.getPathFromTitle()

    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFolder = `${pathFull}/src/${PATH_ENTITY_PATH}/${path}`
    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

    this.logger.log({ message: `\n diretorio da entidade ${pathToWrite}` })

    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated.replace('.ts', '')}'\n`
    })

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_ENTITY_TEST)
    })

    if (fileInString == null) {
      throw new CouldNotWrite()
    }

    if (test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${PATH_ENTITY_PATH}/`

      const pathToWriteTest = createFile.createFile(pathTestFolder, fileInTestString, titleFormated.replace('.ts', '.spec.ts'))
      this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` })
    }

    return replacedFileString
  }
}
