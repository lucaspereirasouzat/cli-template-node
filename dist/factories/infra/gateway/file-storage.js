"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"makeFileStorage",{enumerable:true,get:function(){return makeFileStorage}});const _filestorage=require("../../../infra/gateways/file-storage");const makeFileStorage=()=>{return new _filestorage.FileStorage};