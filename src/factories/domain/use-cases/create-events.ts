import { CreateEvents } from "@/domain/use-cases/create-events"
import { makeFileStorage, makeLogger, makePath } from '@/factories/infra/gateway'

export const makeEvents = (): CreateEvents => {
  return new CreateEvents(
    makeFileStorage(),
    makePath(),
    makeLogger()
  )
}
