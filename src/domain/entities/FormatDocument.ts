export class FormatDocument {
  constructor (
    private readonly document: string,
    private readonly titleDocument: string,
    private readonly properties?: {}
  ) { }

  public formatDocument (): string {
    return this.document
      .replace(/{{ className }}/g, this.titleDocument)
      .replace(/{{ classNameLower }}/g, `${this.titleDocument.charAt(0).toLowerCase()}${this.titleDocument.slice(1)}`)
      .replace(/{{ properites }}/g, !this?.properties ? JSON.stringify(this.properties) : '')
  }
}
