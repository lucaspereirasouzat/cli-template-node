const REGEX_SPLITED_CAMEL_CASE = /([a-z])([A-Z])/g

export class TitleConversion {
  constructor (private readonly name: string) { }

  public getSplitedArray (): string[] {
    return this.name.replace(REGEX_SPLITED_CAMEL_CASE, '$1 $2').split(' ')
  }

  public GetCamelCaseName (): string {
    return this.getSplitedArray().map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`).join('')
  }

  public GetFormatedTitleFileName (): string {
    return `${this.getSplitedArray().map(item => `${item.charAt(0).toLowerCase()}${item.slice(1)}`).join('-')}.ts`
  }
}
