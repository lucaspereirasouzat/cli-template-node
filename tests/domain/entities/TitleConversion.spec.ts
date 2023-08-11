import { beforeAll, describe, expect, it } from "vitest";

import { TitleConversion } from "@/domain/entities/TitleConversion";
describe("TitleConversion", () => {
	let sut: TitleConversion;
	beforeAll(() => {
		sut = new TitleConversion("aaa/test");
	});

	it("should return a title camelCase", () => {
		const result = sut.GetCamelCaseName();
		expect(result).toBe("Test");
	});
	it("should return a title conversion", () => {
		const result = sut.GetFormatedTitleFileName();
		expect(result).toBe("test.ts");
	});
	it("should return a path conversion ", () => {
		const sut2 = new TitleConversion("/aaa/test");
		expect(sut2.getPathFromTitle()).toBe("aaa/");
	});
	it("should return a path double path ", () => {
		const sut2 = new TitleConversion("/bbb/aaa/AAAAestAAA");
		expect(sut2.getPathFromTitle()).toBe("bbb/aaa/");
	});
	it("should return a title filenameFormated", () => {
		const sut2 = new TitleConversion("/aaa/testA");
		expect(sut2.GetFormatedTitleFileName()).toBe("test-a.ts");
	});
	it("should return a title formated", () => {
		const sut2 = new TitleConversion("aaa/testA");
		expect(sut2.getPathFromTitle()).toBe("aaa/");
	});
});
