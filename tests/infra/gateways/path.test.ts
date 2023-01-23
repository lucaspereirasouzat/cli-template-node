import path from 'path'
import { it, describe, expect, beforeEach, vitest } from "vitest";
import { Path } from "../../../src/infra/gateways/path";

describe("Path", () => {
  let sut: Path;

  beforeEach(() => {
    sut = new Path();
  });

  it("should be a function", () => {
    expect(typeof Path).toBe("function");
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should validate path", () => {
    sut.pathresolve("any_folder");
    expect(sut.pathresolve).toBeDefined();
    expect(typeof sut.pathresolve).toBe("function");
  });

  // it("should validate makeDir", () => {
  //   expect(sut.pathresolve).toBeDefined();

  //   sut.pathresolve({ pathResolve: "aaa" });
  //   expect(path.resolve).toHaveBeenCalledWith("aaa");
  // });
  // it("should validate readFileString", () => {
  //   sut.readFileString({ path: "aaa" });
  //   expect(fs.readFileSync).toHaveBeenCalledWith("aaa", "utf8");
  // });
  // it("should validate writeFileString", () => {
  //   sut.writeFileString({ path: "aaa", content: "bbb" });
  //   expect(sut.writeFileString).toBeDefined();
  //   expect(fs.writeFileSync).toHaveBeenCalledWith("aaa", "bbb");
  // });
});
