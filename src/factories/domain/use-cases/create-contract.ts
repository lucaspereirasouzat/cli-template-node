import { makePath } from "../../infra/gateway/path"
import { CreateContract } from "../../../domain/use-cases/create-contract"
import { makeFileStorage } from "../../infra/gateway/file-storage"

export const makeContract = (): CreateContract => {
  return new CreateContract(
    makeFileStorage(),
    makePath()
  )
}
