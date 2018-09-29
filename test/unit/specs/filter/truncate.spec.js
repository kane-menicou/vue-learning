'use strict'

import truncate from '../../../../src/filter/truncate'

describe('truncate', () => {
  it('should truncate an under length string', () => {
    expect(truncate('test test', 25, '..')).toBe('test test')
  })

  it('should truncate an over length string', () => {
    expect(truncate('test test ttest test test test', 25, '..')).toBe('test test ttest test test..')
  })

  it('should truncate an over length string based on the parameter', () => {
    expect(truncate('test test ttest test test test', 1, '..')).toBe('t..')
  })

  it('should be able to have a custom clamp', () => {
    expect(truncate('test test', 1, '.. This string was too long')).toBe('t.. This string was too long')
  })
})
