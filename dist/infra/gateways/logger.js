"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"Logger",{enumerable:true,get:()=>Logger});const _pino=_interopRequireDefault(require("pino"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}class Logger{error({message,...rest}){this.logger.error(message)}log({message}){this.logger.info(message)}constructor(){this.logger=(0,_pino.default)({transport:{target:"pino-pretty",options:{colorize:true}}})}}