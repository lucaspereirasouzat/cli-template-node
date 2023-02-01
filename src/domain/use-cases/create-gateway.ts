import { CouldNotWrite, FileNotFound } from '../entities/errors'
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from '../contracts'
import { PATH_GATEWAY, PATH_FACTORY_GATEWAY, PATH_GATEWAY_TEST } from '../../constants'
import { Resolve } from '../../domain/contracts/Resolve'
import { FormatDocument, TitleConversion, CreateFile } from '../../domain/entities'

const GATEWAY_PATH = 'infra/gateways'
const GATEWAY_FACTORY_PATH = 'main/factories/infra/gateways'

export class CreateGateway {
  constructor(
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle(pathFull: string, name = 'Gateway', test = true, properites = {}): string {
    const fileInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_GATEWAY)
    })

    if (fileInString.length === 0) {
      throw new FileNotFound()
    }

    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()

    const pathFolder = `${pathFull}/src/${GATEWAY_PATH}`
    const createFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

    this.logger.log({ message: `\n diretorio do gateway ${pathToWrite}` })

    this.fileStorage.appendFile({
      path: `${pathFolder}/index.ts`,
      content: `export * from './${titleFormated}'\n`
    })

    const fileFactoryInString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_FACTORY_GATEWAY)
    })

    const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument()

    const pathFactoryFolder = `${pathFull}/src/${GATEWAY_FACTORY_PATH}`
    const createFactoryFile = new CreateFile(
      this.fileStorage,
      this.pathResolver
    )

    const pathToFactoryWrite = createFactoryFile.createFile(pathFactoryFolder, replacedFactoryFileString, titleFormated)

    this.logger.log({ message: `\n diretorio do factory gateway ${pathToFactoryWrite}` })

    this.fileStorage.appendFile({
      path: `${pathFactoryFolder}/index.ts`,
      content: `export * from './${titleFormated}'\n`
    })

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_GATEWAY_TEST)
    })

    if (fileInTestString === '') {
      throw new CouldNotWrite()
    }

    if (test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${GATEWAY_PATH}`

      const testnameFile = titleFormated.replace('.ts', '.spec.ts')

      const replacedFactoryTestFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument()

      const pathToWriteTest = createFile.createFile(pathTestFolder, replacedFactoryTestFileString, testnameFile)
      this.logger.log({ message: `\n diretorio da entidade test ${pathToWriteTest}` })
    }
    return replacedFileString
  }
}
