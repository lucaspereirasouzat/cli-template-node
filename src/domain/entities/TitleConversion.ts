const REGEX_SPLITED_CAMEL_CASE = /([a-z])([A-Z])/g
const FIRST_INDEX = 0
const SECOND_INDEX = 1
const NOT_FOUND_INDEX = -1
export class TitleConversion {
  path = ''
  constructor (private readonly name: string) {
    // this.getPathFromTitle()
    // this.separateTitle()
  }

  public getPathFromTitle (): string {
    const lastIndexPath = this.name.lastIndexOf('/')
    console.log('lastIndex', lastIndexPath)

    if (lastIndexPath === NOT_FOUND_INDEX) {
      return ''
    }

    if (this.name.indexOf('/') === FIRST_INDEX) {
      return this.name.substring(SECOND_INDEX, lastIndexPath + SECOND_INDEX)
    }

    const path = this.name.slice(FIRST_INDEX, lastIndexPath + SECOND_INDEX)

    console.log('path', path)

    return path
  }

  private separateTitle (): string {
    const lastIndex = this.name.lastIndexOf('/')

    if (lastIndex === NOT_FOUND_INDEX) {
      return ''
    }

    return this.name.substring(lastIndex + SECOND_INDEX)
  }

  public getSplitedArray (): string[] {
    return this.separateTitle().replace(REGEX_SPLITED_CAMEL_CASE, '$1 $2').split(' ')
  }

  public GetCamelCaseName (): string {
    return this.getSplitedArray().map(item => `${item.charAt(FIRST_INDEX).toUpperCase()}${item.slice(SECOND_INDEX)}`).join('')
  }

  public GetFormatedTitleFileName (): string {
    return `${this.getSplitedArray().map(item => `${item.charAt(FIRST_INDEX).toLowerCase()}${item.slice(SECOND_INDEX)}`).join('-')}.ts`
  }
}
