"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"Path",{enumerable:true,get:function(){return Path}});const _path=_interop_require_default(require("path"));function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}class Path{pathresolve(...paths){return _path.default.resolve(...paths)}}