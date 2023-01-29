"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:()=>_default});const _useCases=require("../factories/domain/use-cases/index");const _default=(name,option,fullpath)=>{console.log(name,option,fullpath);return({controller:(0,_useCases.makeController)().handle(fullpath,name),useCases:(0,_useCases.makeUseCase)().handle(fullpath,name),repo:()=>{},gateWay:(0,_useCases.makeGateway)().handle(fullpath,name),error:(0,_useCases.makeError)().handle(fullpath,name),entity:(0,_useCases.makeEntity)().handle(fullpath,name),contract:(0,_useCases.makeContract)().handle(fullpath,name)})[name]};