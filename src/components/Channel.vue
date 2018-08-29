<template>
  <div id="channel-container">
    <div id="nav-wrapper">
      <Nav />
    </div>
    <div id="message-container">
      <h1 v-if="messagesAlphabetic.length <= 0">No messages</h1>
      <Message
        :key='messageItem.id'
        v-for="messageItem in messagesAlphabetic"
        :message="messageItem.message"
        :author="messageItem.author"
        :created-at="messageItem.createdAt"/>
    </div>
    <div id="entry-wrapper">
      <MessageEntry @createMessage="createMessage"/>
    </div>
  </div>
</template>

<script>
import Message from './Message'
import MessageEntry from './MessageEntry'
import Nav from './Nav'

export default {
  name: 'Channel',
  data () {
    return {
      messages: [
        {
          id: 1,
          message: '2',
          createdAt: '2012-08-29T11:57:03+02:00',
          author: 'Test tester'
        },
        {
          id: 2,
          message: '1',
          createdAt: '2011-08-29T11:57:03+02:00',
          author: 'Test tester'
        },
        {
          id: 3,
          message: '3',
          createdAt: '2018-08-19T11:57:03+02:00',
          author: 'Testing tester'
        },
        {
          id: 4,
          message: '4',
          createdAt: '2018-08-19T11:59:03+02:00',
          author: 'Testing tester'
        }
      ]
    }
  },
  computed: {
    messagesAlphabetic () {
      let messages = this.messages

      return messages.sort(function (current, compare) {
        if (new Date(current.createdAt).getTime() > new Date(compare.createdAt).getTime()) {
          return 1
        }

        if (new Date(current.createdAt).getTime() < new Date(compare.createdAt).getTime()) {
          return -1
        }

        return 0
      })
    }
  },
  methods: {
    createMessage (message) {
      this.messages.push({
        id: 4,
        createdAt: 'Sending...',
        author: 'Test Tester',
        message: message
      })

      this.scrollToBottom()
    },
    scrollToBottom () {
      const container = document.getElementById('message-container')

      container.scrollTop = container.scrollHeight
    }
  },
  components: {Message, MessageEntry, Nav}
}
</script>

<style scoped lang="sass">
    #channel-container
        display: grid
        grid-template-columns: 0.25fr 2.5fr 0.25fr
        grid-template-rows: 50px 20fr 50px
        grid-row-gap: 15px
        grid-template-areas: "nav nav nav" "messages messages messages" "input input input"
        height: 99vh

        #nav-wrapper
            grid-area: nav

        #entry-wrapper, #message-container
            padding: 0 15px

        #message-container
            grid-area: messages
            overflow-y: scroll

        #entry-wrapper
            grid-area: input
</style>
