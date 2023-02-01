const REGEX_SPLITED_CAMEL_CASE = /([a-z])([A-Z])/g;

export class TitleConversion {
  constructor(private name: string) { }

  public getSplitedArray() {
    return this.name.replace(REGEX_SPLITED_CAMEL_CASE, '$1 $2').split(' ');
  }

  public GetCamelCaseName() {
    return this.getSplitedArray().map(item => `${item.charAt(0).toUpperCase()}${item.slice(1)}`).join('')
  }

  public GetFormatedTitleFileName() {
    return `${this.getSplitedArray().map(item => `${item.charAt(0).toLowerCase()}${item.slice(1)}`).join('-')}.ts`
  }
}
