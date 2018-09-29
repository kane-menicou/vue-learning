<template>
  <div class="message">
    <img src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1">
    <span class="heading">{{ author|truncateAuthor }}</span>
    <span class="subheading">{{ formattedCreatedAt }}</span>
    <span class="content">{{ message }}</span>
  </div>
</template>

<script>
import truncate from '../filter/truncate'

export default {
  name: 'Message',
  props: {
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedCreatedAt () {
      const createdAt = new Date(this.createdAt)

      if (isNaN(createdAt.getTime())) {
        return this.createdAt
      }

      if (createdAt.toDateString() === new Date().toDateString()) {
        return createdAt.toLocaleTimeString()
      }

      return createdAt.toLocaleString()
    }
  },
  filters: {
    truncateAuthor: (text) => {
      return truncate(text, 35, '...')
    }
  }
}
</script>

<style scoped lang="sass">
    .message
        display: grid
        grid-template-columns: 55px auto 1fr
        grid-template-rows: 20px 1fr
        grid-column-gap: 10px
        grid-row-gap: 10px
        grid-template-areas: "image heading subheading" "image content content"
        @media(max-width: 480px)
            grid-template-rows: 17px 15px 1fr
            grid-template-areas: "image heading heading" "image subheading subheading" "image content content"
        text-align: left

        &:not(:first-child)
            margin-top: 30px

        img
            grid-area: image
            width: 100%

        .content
            grid-area: content
            white-space: pre-line
            font-size: 15px
            word-wrap: break-word

        .heading
            grid-area: heading
            font-size: 17px
            font-weight: 900
            overflow-y: hidden

        .subheading
            font-weight: 100
            color: #c2c2c2
</style>
