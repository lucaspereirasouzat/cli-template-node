import { LogFailure, LogSuccess } from '@/domain/contracts/logger'
import pino, {BaseLogger} from 'pino'
export class Logger implements LogFailure, LogSuccess {
  logger: BaseLogger
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
    this.logger.info(message)
  }
}
