'use strict'

export default function truncate (text, length, clamp) {
  if (length > text.length) {
    return text
  }

  return text.substr(0, length - 1) + clamp
}
