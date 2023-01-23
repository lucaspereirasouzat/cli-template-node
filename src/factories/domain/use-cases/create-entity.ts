import { makePath } from "../../infra/gateway/path"
import { CreateEntity } from "../../../domain/use-cases/create-entity"
import { makeFileStorage } from "../../infra/gateway/file-storage"
import { makeLogger } from "../../infra/gateway/logger"

export const makeEntity = (): CreateEntity => {
  return new CreateEntity(
    makeFileStorage(),
    makePath(), makeLogger()
  )
}
