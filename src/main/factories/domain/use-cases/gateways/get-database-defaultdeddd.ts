import { GetDatabaseDefaultdeddd } from "../../../domain/use-cases"
//import { makeFileStorage } from "../../infra/gateway"

export const makeGetDatabaseDefaultdeddd = (): GetDatabaseDefaultdeddd => {
  return new GetDatabaseDefaultdeddd (
    // makeFileStorage
  )
}


