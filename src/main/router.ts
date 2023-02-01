import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase, makeRepository } from "../factories/domain/use-cases";


export default (name: string, option: string, fullpath: string, test = false, properites = {}) => {
  return {
    controller: makeController(),
    useCases: makeUseCase(),
    repo: makeRepository(),
    gateWay: makeGateway(),
    error: makeError(),
    entity: makeEntity(),
    contract: makeContract()
  }[option]
}
