import path from 'path'
import { Resolve } from '@/domain/contracts/Resolve'

export class Path implements Resolve {
  pathresolve(...paths: string[]): Resolve.Output {
    return path.resolve(...paths)
  }
}


