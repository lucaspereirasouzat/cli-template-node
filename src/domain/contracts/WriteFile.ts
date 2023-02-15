export interface WriteFile {
	writeFileString(input: WriteFile.Input): WriteFile.Output;
}

export namespace WriteFile {
	export type Input = { path: string; content: string };
	export type Output = void;
}
