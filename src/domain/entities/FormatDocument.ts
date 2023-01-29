export class FormatDocument {
    constructor(
      private document: string,
      private titleDocument: string,
      private properties?: {}
      ) {}
    public formatDocument() {
        return this.document.replace(new RegExp("{{ className }}", "g"), this.titleDocument)
        .replace(new RegExp("{{ properites }}", "g"),JSON.stringify(this.properties));
    }
}
