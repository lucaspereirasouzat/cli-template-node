import { makePath } from "../../infra/gateway/path"
import { CreateController } from "../../../domain/use-cases/create-controller"
import { makeFileStorage } from "../../infra/gateway/file-storage"
import { makeLogger } from "../../infra/gateway/logger"

export const makeController = (): CreateController => {
  return new CreateController(
    makeFileStorage(),
    makePath(), makeLogger()
  )
}
