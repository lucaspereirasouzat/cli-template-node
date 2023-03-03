import { CreateValidation } from '@/domain/use-cases/create-validation'
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeValidation = ():CreateValidation  => {
  return new CreateValidation(makeFileStorage(), makePath(), makeLogger());
}
