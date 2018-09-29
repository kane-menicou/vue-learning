'use strict'

import {emojify, search} from '../../../../src/helper/emojis'

jest.mock('node-emoji')

describe('emojis', () => {
  describe('search(...)', () => {
    it('should correctly search for the emoji', () => {
      const key = 'smile'
      const emoji = '😀'

      require('node-emoji').search.mockImplementation((emojiKey) => emojiKey === key ? [{key, emoji}] : null)

      expect(search('smile')).toEqual([{key, emoji}])
    })

    it('should correctly search for the emoji only using lower case', () => {
      const key = 'smile'
      const emoji = '😀'

      require('node-emoji').search.mockImplementation((emojiKey) => emojiKey === key.toLowerCase() ? [{key, emoji}, {key, emoji}] : null)

      expect(search('Smile')).toEqual([{key, emoji}, {key, emoji}])
    })
  })

  describe('emojify(...)', () => {
    it('should correctly emojify the passed in string', () => {
      require('node-emoji').emojify.mockImplementation((string, onMissing, format) => format('😀'))

      expect(emojify(':smile:')).toEqual('😀')
    })

    it('should return the original string if it cannot emojify the string', () => {
      require('node-emoji').emojify.mockImplementation((string, onMissing) => onMissing('not_an_emoji'))

      expect(emojify(':not_an_emoji:')).toEqual(':not_an_emoji:')
    })
  })
})
