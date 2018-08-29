<template>
  <form id="message-form">
    <div id="emoji-type-hint-wrapper">
      <EmojiTypeHint
        @emoji-selected="emojiSelected"
        v-if="shouldDisplayEmojiTypeHint"
        :bus="emojiTypeHintBus"
        :searched-string="searchedEmojiString"/>
    </div>
    <textarea
      name=""
      id="input"
      placeholder="Send a message..."
      v-model="message"
      cols="30"
      @keydown="handleKeyPress"
      rows="5">.</textarea>
    <input
      @click.prevent="submit"
      type="submit">
  </form>
</template>

<script>
import EmojiTypeHint from './EmojiTypeHint'
import Vue from 'vue'
import { emojify } from './../helper/Emojis'

const EMOJI_SEARCH_REGEX = /:([a-zA-Z1-9+]+)$/

export default {
  name: 'MessageEntry',
  data () {
    return {
      message: '',
      emojiTypeHintBus: new Vue(),
      canDisplayEmojiSearch: true
    }
  },
  components: {EmojiTypeHint},
  computed: {
    searchedEmojiString () {
      const {index} = this.messageEmojiSearch()

      return index === null ? null : this.message.slice(index)
    },
    shouldDisplayEmojiTypeHint () {
      return this.isEmmojiTypeHintVisible()
    }
  },
  methods: {
    handleKeyPress (event) {
      const keys = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Enter']
      if (keys.indexOf(event.key) > -1 && this.isEmmojiTypeHintVisible()) {
        event.preventDefault()

        this.emojiTypeHintBus.$emit(event.key)
      }

      if (this.isEmmojiTypeHintVisible() === true && event.key === 'Escape') {
        event.preventDefault()

        this.canDisplayEmojiSearch = false
      }
    },
    isEmmojiTypeHintVisible () {
      let display = this.messageEmojiSearch() !== null

      // Allows the user to dismiss emoji search.
      // If there is a disallowed match then it will undo users decision to hide
      if (display === false) {
        this.canDisplayEmojiSearch = true
      }

      return display && this.canDisplayEmojiSearch
    },
    submit () {
      if (this.message.trim() !== '') {
        this.$emit('createMessage', emojify(this.message))

        this.message = ''
      }
    },
    emojiSelected ({emoji}) {
      const {index} = this.messageEmojiSearch()

      this.message = this.message.slice(0, index) + emoji
    },
    messageEmojiSearch () {
      return this.message.match(EMOJI_SEARCH_REGEX)
    }
  }
}
</script>

<style scoped lang="sass">
    form#message-form
        display: grid
        height: 100%
        grid-template-rows: 0.1fr 1fr
        grid-template-columns: 0.25fr 2fr 0.5fr 0.25fr
        grid-template-areas: "emoji emoji emoji emoji" "input input input button"

        #emoji-type-hint-wrapper
            grid-area: emoji
            position: relative

        input, textarea
            font-size: 20px
            border-radius: 10px
            border: 2px solid #8d8d8d

            &:not([type="submit"])
                grid-area: input
                border-bottom-right-radius: 0
                resize: none
                padding-left: 10px
                border-top-right-radius: 0

            &[type="submit"]
                $background-color: #50c878

                grid-area: button
                border-top-left-radius: 0
                border-bottom-left-radius: 0
                border-left: none
                font-weight: 500
                background-color: $background-color
                color: white
                border-color: $background-color
                cursor: pointer
                transition: background-color 200ms, border-color 200ms

                &:hover
                    $hover-background-color: darken($background-color, 15%)

                    background-color: $hover-background-color
                    border-color: $hover-background-color
</style>
