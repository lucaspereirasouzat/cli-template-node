export interface MakeDir {
  makeDir(input: MakeDir.Input): MakeDir.Output;
}

export namespace MakeDir {
  export type Input = { path: string; };
  export type Output = void;
}
