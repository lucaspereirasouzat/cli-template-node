import { CreateDecorator } from '@/domain/use-cases/create-decorator'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeDecorator = (): CreateDecorator => {
  return new CreateDecorator(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
