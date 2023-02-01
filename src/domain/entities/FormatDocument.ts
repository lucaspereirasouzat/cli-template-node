export class FormatDocument {
  constructor(
    private readonly document: string,
    private readonly titleDocument: string,
    private readonly properties?: {}
  ) { }

  public formatDocument() {
    return this.document
      .replace(/{{ className }}/g, this.titleDocument)
      .replace(/{{ classNameLower }}/g, this.titleDocument.toLowerCase())
      .replace(/{{ properites }}/g, this.properties ? JSON.stringify(this.properties) : '')
  }
}
