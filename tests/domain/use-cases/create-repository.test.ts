import { it, describe, expect, beforeEach, vitest } from "vitest";
import { CreateRepository } from "@/domain/use-cases/create-repository";
import {
  ReadFile,
  FolderExists,
  MakeDir,
  WriteFile,
  LogFailure,
  LogSuccess,
  AppendFile,
  FileExists
} from "@/domain/contracts";
import { Resolve } from "@/domain/contracts/Resolve";

describe("Create Repository", () => {
  let useCase: CreateRepository;
  let fileStorage: ReadFile & FolderExists & MakeDir & WriteFile & AppendFile & FileExists;
  let logger: LogFailure & LogSuccess;
  let pathresolve: Resolve;

  beforeEach(() => {
    fileStorage = vitest.fn();

    fileStorage.readFileString = vitest.fn(() => `{{ className }}`);
    fileStorage.folderExists = vitest.fn(() => true);
    fileStorage.makeDir = vitest.fn(() => true);
    fileStorage.writeFileString = vitest.fn(() => true);
    fileStorage.appendFile = vitest.fn(() => true);
    fileStorage.fileExists = vitest.fn(() => true);

    pathresolve = vitest.fn();
    pathresolve.pathresolve = vitest.fn(() => 'path')

    logger = vitest.fn();
    logger.error = vitest.fn()
    logger.log = vitest.fn()
  });

  beforeEach(() => {
    useCase = new CreateRepository(fileStorage, pathresolve, logger);
  });
  it("should be able to create a new file", () => {
    useCase.handle("aa");
    expect(fileStorage.readFileString).toBeCalledWith({
      path: "path",
    });
  });
  it("should be able validate if not exists ", () => {
    const error = new Error("File Not found");
    fileStorage.readFileString = vitest.fn().mockReturnValueOnce(undefined);
    expect(() => useCase.handle("aa")).toThrow(error);
  });
  it("should be able validate if folder exists ", () => {
    useCase.handle("aa");
    expect(fileStorage.folderExists).toHaveReturnedTimes(3);
    expect(fileStorage.folderExists).toBeCalledWith({ path: "aa/src/infra/repos/postgres/" });
  });
  it("should be able to create folder ", () => {
    fileStorage.folderExists = vitest.fn().mockReturnValueOnce(false);
    useCase.handle("aa");

    expect(fileStorage.makeDir).toHaveReturnedTimes(3);
    expect(fileStorage.makeDir).toBeCalledWith({ path: "aa/src/infra/repos/postgres/" });
  });
});
