import { it, describe, expect, beforeEach } from "vitest";
import { Path } from "@/infra/gateways/path";

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

});
