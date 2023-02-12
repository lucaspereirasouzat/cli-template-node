import { CouldNotWrite, FileNotFound } from '../entities/errors'
import { AppendFile, FolderExists, LogFailure, LogSuccess, MakeDir, ReadFile, WriteFile } from '../contracts'
import { PATH_USE_CASE, PATH_USE_CASE_TEST, PATH_USE_CASE_DOMAIN, PATH_USE_CASE_FACTORY, PATH_USE_CASE_GATEWAY } from '../../constants'
import { Resolve } from '../../domain/contracts/Resolve'
import { FormatDocument, TitleConversion } from '../../domain/entities'
import { CreateFile } from '../../domain/entities/CreateFile'

const NEXT_INDEX = 1
const FIRST_INDEX = 0

export class CreateUseCase {
  constructor (
    private readonly fileStorage: ReadFile & WriteFile & FolderExists & MakeDir & AppendFile,
    private readonly pathResolver: Resolve,
    private readonly logger: LogFailure & LogSuccess
  ) { }

  handle (pathFull: string, name = 'UseCase', test = true, properites = undefined, onlyTest = false): string {
    const titleConversion = new TitleConversion(name)
    const UpperCase = titleConversion.GetCamelCaseName()
    const titleFormated = titleConversion.GetFormatedTitleFileName()
    const path = titleConversion.getPathFromTitle()
    console.log('usecase')
    console.log(
      titleConversion,
      UpperCase,
      titleFormated,
      path
    )
    if (!onlyTest) {
      const fileInString = this.fileStorage.readFileString({
        path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE)
      })

      if (fileInString == null) {
        throw new FileNotFound()
      }

      const replacedFileString = new FormatDocument(fileInString, UpperCase, properites).formatDocument()
      const pathFolder = `${pathFull}/src/${PATH_USE_CASE_DOMAIN}/${path}`

      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathToWrite = createFile.createFile(pathFolder, replacedFileString, titleFormated)

      let pathCombined = ''
      const splitedPath = path.split('/')
        console.log(splitedPath);

      splitedPath.forEach((pathSplited, index) => {
        console.log('splitedPath  for',pathSplited, index);

        const nextPath = splitedPath[index + NEXT_INDEX]
        console.log('nextPath',nextPath);

        if (pathSplited && nextPath) {
          pathCombined += index === FIRST_INDEX ? `${pathSplited}` : `${pathSplited}`
          console.log('pathCombined',pathCombined)
          this.fileStorage.makeDir({
            path: `${pathFull}/src/${PATH_USE_CASE_DOMAIN}/${pathCombined}`
          })
          this.fileStorage.appendFile({
            path: `${pathFull}/src/${PATH_USE_CASE_DOMAIN}/${pathCombined}/index.ts`,
            content: `export * from './${nextPath}'\n`
          })
        }
      })

      this.fileStorage.appendFile({
        path: `${pathFolder}/index.ts`,
        content: `export * from './${titleFormated.replace('.ts', '')}'\n`
      })
      this.logger.log({ message: `\n diretorio do Usecase ${pathToWrite}` })

      const fileFactoryInString = this.fileStorage.readFileString({
        path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_FACTORY)
      })

      const replacedFactoryFileString = new FormatDocument(fileFactoryInString, UpperCase, properites).formatDocument()

      const pathFactoryFolder = `${pathFull}/src/${PATH_USE_CASE_GATEWAY}/${path}`
      const createFactoryFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathToFactoryWrite = createFactoryFile.createFile(pathFactoryFolder, replacedFactoryFileString, titleFormated)

      this.logger.log({ message: `\n diretorio do factory gateway ${pathToFactoryWrite}` })

      this.fileStorage.appendFile({
        path: `${pathFactoryFolder}/index.ts`,
        content: `export * from './${titleFormated.replace('.ts', '')}'\n`
      })
    }

    const fileInTestString = this.fileStorage.readFileString({
      path: this.pathResolver.pathresolve(__dirname, PATH_USE_CASE_TEST)
    })

    if (fileInTestString == null) {
      throw new CouldNotWrite()
    }

    if (onlyTest || test) {
      const createFile = new CreateFile(
        this.fileStorage,
        this.pathResolver
      )

      const pathTestFolder = `${pathFull}/tests/${PATH_USE_CASE_DOMAIN}/${path}`
      const replacedFileString = new FormatDocument(fileInTestString, UpperCase, properites).formatDocument()
      const pathToWriteTest = createFile.createFile(pathTestFolder, replacedFileString, titleFormated.replace('.ts', '.spec.ts'))
      this.logger.log({ message: `\n diretorio do usecase test ${pathToWriteTest}` })
    }
    return 'replacedFileString'
  }
}
