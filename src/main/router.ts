import { makeContract, makeController, makeEntity, makeError, makeGateway, makeUseCase } from "../factories/domain/use-cases";


export default (name: string, option: string, fullpath: string) => {
  console.log(option, name, fullpath);

  return {
    controller: makeController().handle(fullpath, name),
    useCases: makeUseCase().handle(fullpath, name),
    repo: () => { },
    gateWay: makeGateway().handle(fullpath, name),
    error: makeError().handle(fullpath, name),
    entity: makeEntity().handle(fullpath, name),
    contract: makeContract().handle(fullpath, name)
  }[option]
}
