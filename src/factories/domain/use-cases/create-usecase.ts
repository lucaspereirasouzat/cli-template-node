import { CreateController } from "../../../domain/use-cases/create-controller"
import { makeFileStorage } from "../../infra/gateway/file-storage"

export const makeController = (): CreateController => {
  return new CreateController(
  makeFileStorage()
  )
}
