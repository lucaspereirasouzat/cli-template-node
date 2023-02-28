import { CreateRepository } from '@/domain/use-cases/create-repository'
import { makeFileStorage, makeLogger, makePath } from '../../infra/gateway'

export const makeRepository = (): CreateRepository => {
  return new CreateRepository(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
