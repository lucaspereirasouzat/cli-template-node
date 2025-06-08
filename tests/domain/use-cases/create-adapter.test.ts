import { it, describe, expect, beforeEach, vitest } from "vitest";
import { CreateAdapter } from "@/domain/use-cases/create-adapter";
import {
	ReadFile,
	FolderExists,
	MakeDir,
	WriteFile,
	LogFailure,
	LogSuccess,
	AppendFile,
	FileExists,
} from "@/domain/contracts";
import { Resolve } from "@/domain/contracts/Resolve";
import { FileNotFound } from "@/domain/entities/errors";

describe("Create Adapter", () => {
	let useCase: CreateAdapter;
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
		pathresolve.pathresolve = vitest.fn(() => "path");

		logger = vitest.fn();
		logger.error = vitest.fn();
		logger.log = vitest.fn();
	});

	beforeEach(() => {
		useCase = new CreateAdapter(fileStorage, pathresolve, logger);
	});
	it("should be able to create a new file", () => {
		useCase.handle("aa");
		expect(fileStorage.readFileString).toBeCalledWith({
			path: "path",
		});
	});
	it("should be able validate if not exists ", () => {
		const error = new FileNotFound()
		fileStorage.readFileString = vitest.fn().mockReturnValueOnce(undefined);
		expect(() => useCase.handle("aa")).toThrow(error);
	});
	it("should be able validate if folder exists ", () => {
		useCase.handle("aa");
		expect(fileStorage.folderExists).toBeCalledWith({ path: "aa/src/main/adapters/" });
	});
	it("should be able to create folder ", () => {
		fileStorage.folderExists = vitest.fn().mockReturnValueOnce(false);
		useCase.handle("aa");

		expect(fileStorage.makeDir).toBeCalledWith({ path: "aa/src/main/adapters/" });
	});
	it("should be able to write file ", () => {
		fileStorage.folderExists = vitest.fn().mockReturnValueOnce(false);
		useCase.handle("aa");

		expect(fileStorage.writeFileString).toBeCalledWith({
			content: "adapter",
			path: "path",
		});
	});
	it("should be create path", () => {
		fileStorage.folderExists = vitest.fn().mockReturnValueOnce(false);
		useCase.handle("aa");

		expect(pathresolve.pathresolve).toBeCalled();
	});
});
