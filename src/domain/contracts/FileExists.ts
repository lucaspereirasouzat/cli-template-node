export interface FileExists {
	fileExists: (input: FileExists.Input) => FileExists.Output;
}

export namespace FileExists {
	export type Input = { path: string };
	export type Output = undefined | boolean;
}
