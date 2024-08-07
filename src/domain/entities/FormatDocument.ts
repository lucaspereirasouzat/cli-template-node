const START_INDEX = 0;
const SECOND_INDEX = 1;

export class FormatDocument {
	constructor(
		private readonly document: string,
		private readonly titleDocument: string,
		private readonly properties?: object,
	) {}

	public formatDocument(): string {
		return this.document
			.replace(/{{ className }}/g, this.titleDocument)
			.replace(
				/{{ classNameLower }}/g,
				this.titleDocument.toLowerCase(),
			)
			.replace(/{{ properties }}/g, this.properties ? JSON.stringify(this.properties) : "");
	}
}
