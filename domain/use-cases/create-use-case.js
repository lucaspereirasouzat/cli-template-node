"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateUseCase",{enumerable:true,get:()=>CreateUseCase});const _errors=require("../entities/errors/index");const _constants=require("../../constants/index");const _entities=require("../entities/index");const _createFile=require("../entities/CreateFile");class CreateUseCase{handle(pathFull,name="UseCase",test=true,properites=undefined,onlyTest=false){const titleConversion=new _entities.TitleConversion(name);const UpperCase=titleConversion.GetCamelCaseName();const titleFormated=titleConversion.GetFormatedTitleFileName();const path=titleConversion.getPathFromTitle();console.log("usecase");console.log(titleConversion,UpperCase,titleFormated,path);if(!onlyTest){const fileInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE)});if(fileInString==null){throw new _errors.FileNotFound}const replacedFileString=new _entities.FormatDocument(fileInString,UpperCase,properites).formatDocument();const pathFolder=`${pathFull}/src/${_constants.PATH_USE_CASE_DOMAIN}/${path}`;const createFile=new _createFile.CreateFile(this.fileStorage,this.pathResolver);const pathToWrite=createFile.createFile(pathFolder,replacedFileString,titleFormated);this.fileStorage.appendFile({path:`${pathFolder}/index.ts`,content:`export * from './${titleFormated.replace(".ts","")}'
`});this.logger.log({message:`
 diretorio do Usecase ${pathToWrite}`})}const fileInTestString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE_TEST)});if(fileInTestString==null){throw new _errors.CouldNotWrite}if(onlyTest||test){const createFile=new _createFile.CreateFile(this.fileStorage,this.pathResolver);const pathTestFolder=`${pathFull}/tests/${_constants.PATH_USE_CASE_DOMAIN}/${path}`;const replacedFileString=new _entities.FormatDocument(fileInTestString,UpperCase,properites).formatDocument();const pathToWriteTest=createFile.createFile(pathTestFolder,replacedFileString,titleFormated.replace(".ts",".spec.ts"));this.logger.log({message:`
 diretorio do usecase test ${pathToWriteTest}`})}return"replacedFileString"}constructor(fileStorage,pathResolver,logger){this.fileStorage=fileStorage;this.pathResolver=pathResolver;this.logger=logger}}