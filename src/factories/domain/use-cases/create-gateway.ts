import { CreateGateway } from "../../../domain/use-cases/create-gateway"
import { makeFileStorage,makeLogger,makePath } from "../../infra/gateway"

export const makeGateway = (): CreateGateway => {
  return new CreateGateway(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
