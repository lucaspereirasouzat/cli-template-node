import { makePath } from "../../infra/gateway/path"
import { CreateGateway } from "../../../domain/use-cases/create-gateway"
import { makeFileStorage } from "../../infra/gateway/file-storage"
import { makeLogger } from "../../infra/gateway/logger"

export const makeGateway = (): CreateGateway => {
  return new CreateGateway(
    makeFileStorage(),
    makePath(), makeLogger()
  )
}
