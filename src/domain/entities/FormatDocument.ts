export class FormatDocument {
  constructor(
    private readonly document: string,
    private readonly titleDocument: string,
    private readonly properties?: {}
  ) { }

  public formatDocument() {
    return this.document
      .replace(new RegExp('{{ className }}', 'g'), this.titleDocument)
      .replace(new RegExp('{{ properites }}', 'g'), this.properties ? JSON.stringify(this.properties) : '')
  }
}
