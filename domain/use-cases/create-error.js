"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateError",{enumerable:true,get:()=>CreateError});const _errors=require("../entities/errors/index");const _constants=require("../../constants/index");const _entities=require("../entities/index");const _createFile=require("../entities/CreateFile");class CreateError{handle(pathFull,name="Error",test=true,properites=undefined,onlyTest=false){const fileInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_ERROR)});if(fileInString==null){throw new _errors.FileNotFound}const titleConversion=new _entities.TitleConversion(name);const UpperCase=titleConversion.GetCamelCaseName();const titleFormated=titleConversion.GetFormatedTitleFileName();const path=titleConversion.getPathFromTitle();const replacedFileString=new _entities.FormatDocument(fileInString,UpperCase,properites).formatDocument();const pathFolder=`${pathFull}/src/${_constants.PATH_ERROR_APLICATION}/${path}`;const createFile=new _createFile.CreateFile(this.fileStorage,this.pathResolver);const pathToWrite=createFile.createFile(pathFolder,replacedFileString,titleFormated);this.logger.log({message:`
 diretorio do error: ${pathToWrite}`});this.fileStorage.appendFile({path:`${pathFolder}/index.ts`,content:`export * from './${titleFormated.replace(".ts","")}'
`});return replacedFileString}constructor(fileStorage,pathResolver,logger){this.fileStorage=fileStorage;this.pathResolver=pathResolver;this.logger=logger}}