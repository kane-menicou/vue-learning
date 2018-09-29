<template>
  <div
    v-if="shown"
    id="emoji-selector">
    <div class="header">
      Emoji's matching "{{ searchedString }}"
    </div>
    <div class="body">
      <div v-if="hasResults === false">No results</div>
      <span
        class="emoji"
        :key="emoji.key"
        @click="onEmojiClick"
        :data-search-index="index"
        :class="{
          selected: currentlySelectedSearchIndex === index &&
            (currentlySelectedEmoji === null || currentlySelectedEmoji === emoji.emoji)
        }"
        v-for="(emoji, index) in emojiResults">{{ emoji.emoji }}</span>
    </div>
  </div>
</template>

<script>
import * as Emoji from '../helper/emojis'
import Vue from 'vue'

export default {
  name: 'EmojiTypeHint',
  props: {
    searchedString: {
      type: String,
      required: true
    },
    bus: {
      type: Vue,
      required: true
    }
  },
  data () {
    return {
      currentlySelectedSearchIndex: 0,
      currentlySelectedEmoji: null,
      shown: true
    }
  },
  methods: {
    onEmojiClick ({srcElement}) {
      const emoji = srcElement.innerText
      this.currentlySelectedSearchIndex = parseInt(srcElement.dataset.searchIndex)
      this.currentlySelectedEmoji = emoji

      this.emitEmoji()
    },
    emitEmoji () {
      this.$emit('emoji-selected', {emoji: this.currentlySelectedEmoji})
    },
    getCurrentEmoji () {
      let emoji = this.emojiSearch()[this.currentlySelectedSearchIndex]

      if (typeof emoji === 'undefined') {
        return null
      }

      return emoji.emoji
    },
    emojiSearch () {
      return Emoji.search(this.searchedString)
    },
    onRightArrow () {
      let nextIndex = this.currentlySelectedSearchIndex + 1

      if (nextIndex >= this.emojiSearch().length) {
        // Move to first emoji
        this.currentlySelectedSearchIndex = 0
        this.currentlySelectedEmoji = this.getCurrentEmoji()

        return
      }

      this.currentlySelectedSearchIndex = nextIndex
      this.currentlySelectedEmoji = this.getCurrentEmoji()
    },
    onLeftArrow () {
      let nextIndex = this.currentlySelectedSearchIndex - 1

      if (nextIndex < 0) {
        // Move to last emoji in search
        this.currentlySelectedSearchIndex = this.emojiSearch().length - 1
        this.currentlySelectedEmoji = this.getCurrentEmoji()

        return
      }

      this.currentlySelectedSearchIndex = nextIndex
      this.currentlySelectedEmoji = this.getCurrentEmoji()
    },
    onEnterKey () {
      this.emitEmoji()
    }
  },
  watch: {
    searchedString () {
      // Reset to first when search string changes
      this.currentlySelectedSearchIndex = 0
      this.currentlySelectedEmoji = this.getCurrentEmoji()
    }
  },
  created () {
    this.bus.$on('ArrowRight', this.onRightArrow)
    this.bus.$on('ArrowLeft', this.onLeftArrow)
    this.bus.$on('Enter', this.onEnterKey)
  },
  computed: {
    emojiResults () {
      return this.emojiSearch()
    },
    hasResults () {
      return this.emojiSearch().length > 0
    }
  }
}
</script>

<style scoped lang="sass">
    #emoji-selector
        position: absolute
        width: 100%
        left: 0
        bottom: 1px
        border-radius: 10px
        border: 2px solid #8d8d8d
        background-color: #f8f8f8
        overflow: hidden

        .header
            background-color: #c5c5c5
            text-align: left
            width: 100%
            padding: 7px
            border-bottom: 2px solid #8d8d8d
            color: #3a4c5e

        .body
            margin: 5px
            overflow: hidden

            .emoji
                float: left
                text-decoration: none
                padding: 7px
                cursor: pointer
                width: 17px
                height: 21px

                &.selected
                    background-color: rgba(18, 16, 191, 0.29)
</style>
