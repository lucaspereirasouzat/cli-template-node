import { CreateMiddleware } from '@/domain/use-cases/create-middleware'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeMiddleware = (): CreateMiddleware => {
  return new CreateMiddleware(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
