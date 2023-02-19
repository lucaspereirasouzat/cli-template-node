import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase, makeRepository, makeValidation } from '../factories/domain/use-cases'

export default (option: string) => {
  return {
    controller: makeController(),
    useCase: makeUseCase(),
    repo: makeRepository(),
    gateWay: makeGateway(),
    error: makeError(),
    entity: makeEntity(),
    contract: makeContract(),
    validation: makeValidation(),
    route: () => {},
    midleware: () => {}
  }[option]
}
