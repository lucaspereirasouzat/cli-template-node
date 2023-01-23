import { makePath } from "../../infra/gateway/path"
import { CreateError } from "../../../domain/use-cases/create-error"
import { makeFileStorage } from "../../infra/gateway/file-storage"
import { makeLogger } from "../../infra/gateway/logger"

export const makeError = (): CreateError => {
  return new CreateError(
    makeFileStorage(),
    makePath(), makeLogger()
  )
}
