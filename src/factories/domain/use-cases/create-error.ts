import { makePath } from "../../infra/gateway/path"
import { CreateError } from "../../../domain/use-cases/create-error"
import { makeFileStorage } from "../../infra/gateway/file-storage"

export const makeError = (): CreateError => {
  return new CreateError(
    makeFileStorage(),
    makePath()
  )
}
