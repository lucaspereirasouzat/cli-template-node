export interface AppendFile {
	appendFile: (input: AppendFile.Input) => void;
}

export namespace AppendFile {
	export type Input = {
		path: string;
		content: string;
	};
}
