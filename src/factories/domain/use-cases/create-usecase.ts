import { CreateUseCase } from '@/domain/use-cases/create-use-case'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeUseCase = (): CreateUseCase => {
  return new CreateUseCase(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
