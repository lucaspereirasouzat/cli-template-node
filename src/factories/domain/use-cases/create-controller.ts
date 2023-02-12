import { CreateController } from '../../../domain/use-cases/create-controller'
import { makeFileStorage, makeLogger, makePath } from '../../infra/gateway'

export const makeController = (): CreateController => {
  return new CreateController(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
