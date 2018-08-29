'use strict'

import emoji from 'node-emoji'

/**
 * @param {String} string
 *
 * @returns {Array<{key: String, emoji: String}>}
 */
export function search (string) {
  return emoji.search(string.toLowerCase())
}

/**
 * @param {String} string
 *
 * @returns String
 */
export function emojify (string) {
  return emoji.emojify(string, (string) => `:${string}:`, (emoji) => emoji)
}
