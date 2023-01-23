import { makePath } from "../../infra/gateway/path"
import { CreateEntity } from "../../../domain/use-cases/create-entity"
import { makeFileStorage } from "../../infra/gateway/file-storage"

export const makeEntity = (): CreateEntity => {
  return new CreateEntity(
    makeFileStorage(),
    makePath()
  )
}
