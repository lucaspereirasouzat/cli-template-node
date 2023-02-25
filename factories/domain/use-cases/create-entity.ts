import { makeFileStorage,makeLogger,makePath } from "../../infra/gateway"
import { CreateEntity } from "../../../domain/use-cases/create-entity"

export const makeEntity = (): CreateEntity => {
  return new CreateEntity(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
