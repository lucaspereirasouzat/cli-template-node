import { beforeAll, describe, expect, it } from "vitest";

import {FormatDocument} from '@/domain/entities/FormatDocument'
describe('FormatDocument', () => {
  let sut: FormatDocument

  it('should return a title', () => {
      sut = new FormatDocument('{{ className }} test', 'aaaAAAaaa')
      const result = sut.formatDocument()
      expect(result).toEqual('aaaAAAaaa test')
    })
    it('should return text with lower', () => {
      sut = new FormatDocument('{{ className }} test {{ classNameLower }}', 'testssss')
      const result = sut.formatDocument()
      expect(result).toEqual('testssss test testssss')
    })
    it('should return with properites', () => {
      sut = new FormatDocument('{{ className }} test {{ classNameLower }} {{ properites }}', 'testssss')
      const result = sut.formatDocument()
      expect(result).toEqual('testssss test testssss ')
    })
    it('should return with properites stringfy', () => {
      sut = new FormatDocument('{{ className }} test {{ classNameLower }} {{ properites }}', 'testssss', {a: 'aa'})
      const result = sut.formatDocument()
      expect(result).toEqual('testssss test testssss {"a":"aa"}')
    })
    // it('should return a title conversion', () => {
    //  const result = sut.GetFormatedTitleFileName()
    //   expect(result).toBe('test.ts')
    // })
    // it('should return a path conversion ', () => {
    //   const sut2 = new FormatDocument('/aaa/test')
    //   expect(sut2.getPathFromTitle()).toBe('aaa/')
    // })
    // it('should return a path double path ', () => {
    //   const sut2 = new FormatDocument('/bbb/aaa/AAAAestAAA')
    //   expect(sut2.getPathFromTitle()).toBe('bbb/aaa/')
    // })
    // it('should return a title filenameFormated', () => {
    //   const sut2 = new FormatDocument('/aaa/testA')
    //   expect(sut2.GetFormatedTitleFileName()).toBe('test-a.ts')
    // })

});
