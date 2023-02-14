import { LogFailure, LogSuccess } from 'domain/contracts/logger'
import pino from 'pino'
export class Logger implements LogFailure, LogSuccess {
  logger: any
  constructor () {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  }

  error ({ message, ...rest }: LogFailure.Input): void {
    this.logger.error(message)
  }

  log ({ message }: LogSuccess.Input): void {
    console.log(message)
  }
}
