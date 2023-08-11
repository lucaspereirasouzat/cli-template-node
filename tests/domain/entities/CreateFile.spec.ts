import { beforeAll, describe, expect, it,beforeEach, vitest } from "vitest";
import { AppendFile, FolderExists, MakeDir, ReadFile, WriteFile } from "@/domain/contracts";
import { Resolve } from "@/domain/contracts/Resolve";

import {CreateFile} from '@/domain/entities/CreateFile'
describe('CreateFile', () => {
  let sut: CreateFile
   let fileStorage: ReadFile & FolderExists & MakeDir & WriteFile & AppendFile;
  let pathresolve: Resolve;


  beforeAll(() => {
    fileStorage = vitest.fn();

    fileStorage.readFileString = vitest.fn(() => `{{ className }}`);
    fileStorage.folderExists = vitest.fn(() => true);
    fileStorage.makeDir = vitest.fn(() => true);
    fileStorage.writeFileString = vitest.fn(() => true);
    fileStorage.appendFile = vitest.fn(() => true);
    fileStorage.folderExists = vitest.fn(() => true);

    pathresolve = vitest.fn();
    pathresolve.pathresolve = vitest.fn(() => 'path')

  });

  beforeEach(() => {
    sut = new CreateFile(fileStorage,pathresolve)
  })


    it('should return a title camelCase', () => {
     const result = sut.createFile('aa','content', 'title')
      expect(result).toBe('path')
      expect(fileStorage.folderExists).toBeCalled()
      expect(fileStorage.folderExists).toBeCalledWith({"path": "aa"})
    })
    it('should return validate make Dir', () => {
      fileStorage.folderExists = vitest.fn().mockResolvedValueOnce(null)
       sut = new CreateFile(fileStorage,pathresolve)
     const result = sut.createFile('aa','content', 'title')
      expect(result).toBe('path')
      expect(fileStorage.folderExists).toBeCalled()
      expect(fileStorage.folderExists).toBeCalledWith({"path": "aa"})
      // expect(fileStorage.makeDir).toBeCalled()
    })
    // it('should return a title conversion', () => {
    //  const result = sut.GetFormatedTitleFileName()
    //   expect(result).toBe('test.ts')
    // })
    // it('should return a path conversion ', () => {
    //   const sut2 = new CreateFile('/aaa/test')
    //   expect(sut2.getPathFromTitle()).toBe('aaa/')
    // })
    // it('should return a path double path ', () => {
    //   const sut2 = new CreateFile('/bbb/aaa/AAAAestAAA')
    //   expect(sut2.getPathFromTitle()).toBe('bbb/aaa/')
    // })
    // it('should return a title filenameFormated', () => {
    //   const sut2 = new CreateFile('/aaa/testA')
    //   expect(sut2.GetFormatedTitleFileName()).toBe('test-a.ts')
    // })

});
