import { CreateEntity } from "@/domain/use-cases/create-entity"
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeEntity = (): CreateEntity => {
  return new CreateEntity(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
