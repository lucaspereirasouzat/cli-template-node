"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return _default}});const _router=_interop_require_default(require("../router"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const _default=(name,options,fullpath)=>{const{test,properties,onlyTest,...rest}=options;const allroutes=(0,_router.default)();const keys=Object.keys(rest);keys.forEach(element=>{try{allroutes[element]?.handle(fullpath,name,test,properties,onlyTest)}catch(error){console.log(error)}})};