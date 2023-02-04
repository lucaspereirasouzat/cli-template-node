import { CouldNotWrite, FileNotFound } from '../entities/errors'
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from '../contracts'
import { PATH_REPOSITORY, PATH_FACTORY_REPOSITORY, PATH_REPOSITORY_TEST } from '../../constants'
import { Resolve } from '../contracts/Resolve'
import { FormatDocument, TitleConversion, CreateFile } from '../entities'

const REPOSITORY_PATH = 'infra/repos/postgres'
const REPOSITORY_FACTORY_PATH = 'main/factories/infra/repos/postgres'

export class CreateRepository {
  constructor (
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle (pathFull: string, name = 'Repository', test = true, properites = {}): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_REPOSITORY)
    })

    if (fileInString === '') {
      throw new FileNotFound()
    }

    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const path = titleConversion.getPathFromTitle()
    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFolder = `${pathFull}/src/${REPOSITORY_PATH}/${path}`
    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

    this.logger.log({ message: `\n diretorio do repository ${pathToWrite}` })

    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated.replace('.ts', '')}'\n`
    })

    const fileFactoryInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_FACTORY_REPOSITORY)
    })

    const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument()

    const pathFactoryFolder = `${pathFull}/src/${REPOSITORY_FACTORY_PATH}/${path}`
    const createFactoryFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToFactoryWrite = createFactoryFile.createFile(pathFactoryFolder, replacedFactoryFileString, titleFormated)

    this.logger.log({ message: `\n diretorio do factory repository ${pathToFactoryWrite}` })

    this.fileStorage.appendFile({
      path: `${pathFactoryFolder}/index.ts`,
      content: `export * from './${titleFormated.replace('.ts', '')}'\n`
    })

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_REPOSITORY_TEST)
    })

    if (fileInTestString === '') {
      throw new CouldNotWrite()
    }

    if (test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${REPOSITORY_PATH}`

      const testnameFile = titleFormated.replace('.ts', '.spec.ts')

      const replacedFactoryTestFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument()

      const pathToWriteTest = createFile.createFile(pathTestFolder, replacedFactoryTestFileString, testnameFile)
      this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` })
    }
    return replacedFileString
  }
}
