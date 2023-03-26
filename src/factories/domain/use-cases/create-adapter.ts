import { CreateAdapter } from "@/domain/use-cases/create-adapter"
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeAdapter = (): CreateAdapter => {
  return new CreateAdapter(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
