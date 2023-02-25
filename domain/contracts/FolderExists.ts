export interface FolderExists {
	folderExists(input: FolderExists.Input): FolderExists.Output;
}

export namespace FolderExists {
	export type Input = { path: string };
	export type Output = boolean;
}
