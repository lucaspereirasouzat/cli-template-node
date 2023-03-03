import { CreateRepository } from '@/domain/use-cases/create-repository'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeRepository = (): CreateRepository => {
  return new CreateRepository(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
