"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateUseCase",{enumerable:true,get:function(){return CreateUseCase}});const _errors=require("../entities/errors");const _constants=require("../../constants");const _entities=require("../entities");function _define_property(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}class CreateUseCase{handle(pathFull,name="UseCase",test=true,properites=undefined,onlyTest=false){const titleConversion=new _entities.TitleConversion(name);const UpperCase=titleConversion.GetCamelCaseName();const titleFormated=titleConversion.GetFormatedTitleFileName();const path=titleConversion.getPathFromTitle();if(!onlyTest){const fileInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE)});if(fileInString==null){throw new _errors.FileNotFound}const replacedFileString=new _entities.FormatDocument(fileInString,UpperCase,properites).formatDocument();const pathFolder=`${pathFull}/src/${_constants.PATH_USE_CASE_DOMAIN}`;const createFile=new _entities.CreateFile(this.fileStorage,this.pathResolver);const pathToWrite=createFile.createFile(`${pathFolder}/${path}`,replacedFileString,titleFormated);createFile.createIndex(path,pathFolder,titleFormated);this.logger.log({message:`
 diretorio do Usecase ${pathToWrite}`});const fileFactoryInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE_FACTORY)});const replacedFactoryFileString=new _entities.FormatDocument(fileFactoryInString,UpperCase,properites).formatDocument();const pathFactoryFolder=`${pathFull}/src/${_constants.PATH_USE_CASE_GATEWAY}`;const pathToFactoryWrite=createFile.createFile(`${pathFactoryFolder}/${path}`,replacedFactoryFileString,titleFormated);this.logger.log({message:`
 diretorio do factory usecase ${pathToFactoryWrite}`});createFile.createIndex(path,pathFactoryFolder,titleFormated)}const fileInTestString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE_TEST)});if(fileInTestString==null){throw new _errors.CouldNotWrite}if(onlyTest||test){const createFile=new _entities.CreateFile(this.fileStorage,this.pathResolver);const pathTestFolder=`${pathFull}/tests/${_constants.PATH_USE_CASE_DOMAIN}/${path}`;const replacedFileString=new _entities.FormatDocument(fileInTestString,UpperCase,properites).formatDocument();const pathToWriteTest=createFile.createFile(pathTestFolder,replacedFileString,titleFormated.replace(".ts",".spec.ts"));this.logger.log({message:`
 diretorio do usecase test ${pathToWriteTest}`})}return"replacedFileString"}constructor(fileStorage,pathResolver,logger){_define_property(this,"fileStorage",void 0);_define_property(this,"pathResolver",void 0);_define_property(this,"logger",void 0);this.fileStorage=fileStorage;this.pathResolver=pathResolver;this.logger=logger}}