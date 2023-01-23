import { makePath } from "../../infra/gateway/path"
import { CreateGateway } from "../../../domain/use-cases/create-gateway"
import { makeFileStorage } from "../../infra/gateway/file-storage"

export const makeGateway = (): CreateGateway => {
  return new CreateGateway(
    makeFileStorage(),
    makePath()
  )
}
