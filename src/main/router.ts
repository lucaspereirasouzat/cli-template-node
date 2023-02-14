import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase, makeRepository } from '../factories/domain/use-cases'

export default (option: string) => {
  return {
    controller: makeController(),
    useCase: makeUseCase(),
    repo: makeRepository(),
    gateWay: makeGateway(),
    error: makeError(),
    entity: makeEntity(),
    contract: makeContract(),
    route: () => {},
    midleware: () => {}
  }[option]
}
