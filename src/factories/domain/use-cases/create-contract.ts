import { CreateContract } from '@/domain/use-cases/create-contract'
import { makeFileStorage, makeLogger, makePath } from '@/infra/gateways'

export const makeContract = (): CreateContract => {
  return new CreateContract(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
