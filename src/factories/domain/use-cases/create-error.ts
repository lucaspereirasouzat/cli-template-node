import { CreateError } from "@/domain/use-cases/create-error"
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeError = (): CreateError => {
  return new CreateError(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
