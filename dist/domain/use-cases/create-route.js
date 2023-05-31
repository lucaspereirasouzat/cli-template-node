"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateRoute",{enumerable:true,get:function(){return CreateRoute}});const _errors=require("../entities/errors");const _constants=require("../../constants");const _entities=require("../entities");function _define_property(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class CreateRoute{handle(pathFull,name="Route",test=true,properites=undefined,onlyTest=false){const titleConversion=new _entities.TitleConversion(name);const UpperCase=titleConversion.GetCamelCaseName();const titleFormated=titleConversion.GetFormatedTitleFileName();const path=titleConversion.getPathFromTitle();if(!onlyTest){const fileInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_ROUTE)});if(fileInString==null){throw new _errors.FileNotFound}const replacedFileString=new _entities.FormatDocument(fileInString,UpperCase,properites).formatDocument();const pathFolder=`${pathFull}/src/${_constants.ROUTE_PATH}`;const createFile=new _entities.CreateFile(this.fileStorage,this.pathResolver);const pathToWrite=createFile.createFile(`${pathFolder}/${path}`,replacedFileString,titleFormated);this.logger.log({message:`
 diretorio do route ${pathToWrite}`});createFile.createIndex(path,pathFolder,titleFormated)}const fileInTestString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_ROUTE_TEST)});if(fileInTestString==null){throw new _errors.CouldNotWrite}if(test){const createFile=new _entities.CreateFile(this.fileStorage,this.pathResolver);const pathTestFolder=`${pathFull}/tests/${_constants.ROUTE_PATH}/${path}`;const replacedFactoryTestFileString=new _entities.FormatDocument(fileInTestString,UpperCase,properites).formatDocument();const pathToWriteTest=createFile.createFile(pathTestFolder,replacedFactoryTestFileString,titleFormated.replace(".ts",".spec.ts"));this.logger.log({message:`
 diretorio da route test ${pathToWriteTest}`})}return fileInTestString}constructor(fileStorage,pathResolver,logger){_define_property(this,"fileStorage",void 0);_define_property(this,"pathResolver",void 0);_define_property(this,"logger",void 0);this.fileStorage=fileStorage;this.pathResolver=pathResolver;this.logger=logger}}