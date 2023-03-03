import { CreateRoute } from '@/domain/use-cases/create-route'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeRoute = ():CreateRoute  => {
  return new CreateRoute(makeFileStorage(), makePath(), makeLogger());
}
