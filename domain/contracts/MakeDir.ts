export interface MakeDir {
	makeDir: (input: MakeDir.Input) => void;
}

export namespace MakeDir {
	export type Input = { path: string };
}
