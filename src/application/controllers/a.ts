//import { Controller } from '@/application/controllers'
//import { HttpResponse, unauthorized, ok } from '@/application/helpers'
//import { ValidationBuilder as Builder, Validator } from '@/application/validation'
//import { AuthenticationError } from '@/domain/entities'
//import { CreateMessage } from '@/domain/use-cases'

type HttpRequest = { message: string, topic: string }
type Model = Error | { success: boolean }

export class A extends Controller {
  constructor (private readonly createMessage: CreateMessage) {
    super()
  }

  async perform ({ message, topic }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const result = await this.createMessage({ message, topic })
      return ok(result)
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      throw error
    }
  }

  /*
  override buildValidators ({ message, topic }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: message, fieldName: 'message' }).required().build(),
      ...Builder.of({ value: topic, fieldName: 'topic' }).required().build()
    ]
  }
  */
}