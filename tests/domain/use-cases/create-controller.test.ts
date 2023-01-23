import { it, describe, expect, beforeEach, vitest } from "vitest";
import { CreateController } from "../../../src/domain/use-cases/create-controller";
import {
  ReadFile,
  FolderExists,
  MakeDir,
  WriteFile,
} from "../../../src/domain/contracts";
import { Resolve } from "../../../src/domain/contracts/Resolve";

describe("Create Controller", () => {
  let useCase: CreateController;
  let fileStorage: ReadFile & FolderExists & MakeDir & WriteFile;
  let pathresolve: Resolve;

  beforeEach(() => {
    fileStorage = vitest.fn();

    fileStorage.readFileString = vitest.fn(() => `{{ className }}`);
    fileStorage.folderExists = vitest.fn(() => true);
    fileStorage.makeDir = vitest.fn(() => true);
    fileStorage.writeFileString = vitest.fn(() => true);


    pathresolve = vitest.fn();
    pathresolve.pathresolve = vitest.fn(() => 'path')
  });

  beforeEach(() => {
    useCase = new CreateController(fileStorage, pathresolve);
  });
  it("should be able to create a new file", () => {
    useCase.handle("aa");
    // expect(fileStorage.readFileString).toHaveReturnedTimes(1);
    expect(fileStorage.readFileString).toBeCalledWith({
      path: "path",
    });
    // /home/lucasp/Documents/cli-template-node/cli-template-node/src/resources/views/templates/Controller.html
  });
  it("should be able validate if not exists ", () => {
    const error = new Error("File Not found");
    fileStorage.readFileString = vitest.fn().mockReturnValueOnce(undefined);
    expect(() => useCase.handle("aa")).toThrow(error);
  });
  it("should be able validate if folder exists ", () => {
    useCase.handle("aa");
    expect(fileStorage.folderExists).toHaveReturnedTimes(1);
    expect(fileStorage.folderExists).toBeCalledWith({ path: "aa" });
  });
  it("should be able to create folder ", () => {
    fileStorage.folderExists = vitest.fn().mockReturnValueOnce(false);
    useCase.handle("aa");

    expect(fileStorage.makeDir).toHaveReturnedTimes(1);
    expect(fileStorage.makeDir).toBeCalledWith({ path: "aa" });
  });
  // it("should be able to create folder ", () => {
  //   useCase.handle("aa");

  //   expect(fileStorage.writeFileString).toHaveReturnedTimes(1);
  //   expect(fileStorage.writeFileString).toBeCalledWith({
  //     content: "Controller",
  //     path: "/home/lucasp/Documents/cli-template-node/cli-template-node/aa/Controller.ts",
  //   });
  // });
});
