import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase } from "../factories/domain/use-cases";


export default (name: string, option: string, fullpath: string, test = false, properites = {}) => {
  return {
    controller: makeController().handle(fullpath, name, test, properites),
    useCases: makeUseCase().handle(fullpath, name, test, properites),
    repo: () => { },
    gateWay: makeGateway().handle(fullpath, name, test, properites),
    error: makeError().handle(fullpath, name, test, properites),
    entity: makeEntity().handle(fullpath, name, test, properites),
    contract: makeContract().handle(fullpath, name, test, properites)
  }[option]
}
