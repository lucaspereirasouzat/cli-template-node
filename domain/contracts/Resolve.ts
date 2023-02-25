export interface Resolve {
	pathresolve: (...paths: string[]) => Resolve.Output;
}

export namespace Resolve {
	export type Output = undefined | string;
}
