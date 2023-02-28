import { CreateEntity } from "@/domain/use-cases/create-entity"
import { makeFileStorage,makeLogger,makePath } from "../../infra/gateway"

export const makeEntity = (): CreateEntity => {
  return new CreateEntity(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
