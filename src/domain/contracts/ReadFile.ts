export interface ReadFile {
	readFileString: (input: ReadFile.Input) => ReadFile.Output;
}

export namespace ReadFile {
	export type Input = { path: string };
	export type Output = string;
}
