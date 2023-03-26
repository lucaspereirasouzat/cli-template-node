import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase, makeRepository, makeValidation, makeRoute, makeMiddleware,makeDecorator, makeEvents, makeAdapter } from '@/factories/domain/use-cases'

export default () => {
  return {
			controller: makeController(),
			useCase: makeUseCase(),
			repo: makeRepository(),
			gateWay: makeGateway(),
			error: makeError(),
			entity: makeEntity(),
			contract: makeContract(),
			validation: makeValidation(),
			route: makeRoute(),
			midleware: makeMiddleware(),
      decorator: makeDecorator(),
      events: makeEvents(),
      adapter: makeAdapter(),
		};
}
