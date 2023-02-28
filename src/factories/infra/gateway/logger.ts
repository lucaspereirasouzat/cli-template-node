import { Logger } from '@/infra/gateways/logger'

export const makeLogger = (): Logger => {
  return new Logger()
}
