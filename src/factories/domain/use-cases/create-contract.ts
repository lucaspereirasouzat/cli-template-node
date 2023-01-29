import { CreateContract } from "../../../domain/use-cases/create-contract"
import { makeFileStorage,makeLogger,makePath } from "../../infra/gateway"

export const makeContract = (): CreateContract => {
  return new CreateContract(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
