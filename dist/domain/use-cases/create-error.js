"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateError",{enumerable:true,get:()=>CreateError});const _errors=require("../entities/errors/index");const _constants=require("../../constants/index");const _entities=require("../entities/index");const _createFile=require("../entities/CreateFile");const PATH_ERROR="domain/entities/error/";class CreateError{handle(pathFull,name="Error",test=true,properites={}){const fileInString=this.fileStorage.readFileString({path:this.pathResolver.pathresolve(__dirname,_constants.PATH_USE_CASE)});if(!fileInString){throw new _errors.FileNotFound}const titleConversion=new _entities.TitleConversion(name);const UpperCase=titleConversion.GetCamelCaseName();const titleFormated=titleConversion.GetFormatedTitleFileName();const replacedFileString=new _entities.FormatDocument(fileInString,UpperCase,properites).formatDocument();const pathFolder=`${pathFull}/src/${PATH_ERROR}`;const createFile=new _createFile.CreateFile(this.fileStorage,this.pathResolver);const pathToWrite=createFile.createFile(pathFolder,replacedFileString,titleFormated);this.logger.log({message:`
 diretorio do error: ${pathToWrite}`});this.fileStorage.appendFile({path:`${pathFolder}/index.ts`,content:`export * from './${titleFormated}'
`});return replacedFileString}constructor(fileStorage,pathResolver,logger){this.fileStorage=fileStorage;this.pathResolver=pathResolver;this.logger=logger}}