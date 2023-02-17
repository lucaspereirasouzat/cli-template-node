export interface CostumerError {
  costumerError: (input: CostumerError.Input) => Promise<CostumerError.Output>
}

export namespace CostumerError {
  export type Input = {
    
  }
  export type Output = undefined | {
    
  }
}
