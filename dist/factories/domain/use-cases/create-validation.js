"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"makeValidation",{enumerable:true,get:function(){return makeValidation}});const _createvalidation=require("../../../domain/use-cases/create-validation");const _gateway=require("../../infra/gateway");const makeValidation=()=>{return new _createvalidation.CreateValidation((0,_gateway.makeFileStorage)(),(0,_gateway.makePath)(),(0,_gateway.makeLogger)())};