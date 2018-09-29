import Vue from 'vue'
import Message from './../../../../src/components/Message'

describe('Message.vue', () => {
  let Constructor

  beforeEach(() => {
    Constructor = Vue.extend(Message)
  })

  it('will match the snapshot', () => {
    const mount = new Constructor({
      propsData: {
        message: 'Test',
        createdAt: 'Test',
        author: 'Test'
      }
    }).$mount()

    expect(mount.$el).toMatchSnapshot()
  })

  it('should render the correct author', () => {
    const mount = new Constructor({
      propsData: {
        message: 'Some message from somebody to someone',
        createdAt: 'Test',
        author: 'Some Person'
      }
    }).$mount()

    const heading = mount.$el.getElementsByClassName('heading')[0]

    expect(heading.textContent).toBe('Some Person')
  })

  it('should render the correct message content', () => {
    const mount = new Constructor({
      propsData: {
        message: 'Some message from somebody to someone',
        createdAt: 'Test',
        author: 'Some Person'
      }
    }).$mount()

    const heading = mount.$el.getElementsByClassName('content')[0]

    expect(heading.textContent).toBe('Some message from somebody to someone')
  })

  it('should render the correctly formatted created at', () => {
    const mount = new Constructor({
      propsData: {
        message: 'Some message from somebody to someone',
        createdAt: '2000-12-12T12:12',
        author: 'Some Person'
      }
    }).$mount()

    const heading = mount.$el.getElementsByClassName('subheading')[0]

    expect(heading.textContent).toBe('12/12/2000, 12:12:00 PM')
  })

  it('should truncate the author name if too long', () => {
    const mount = new Constructor({
      propsData: {
        message: 'Some message from somebody to someone',
        createdAt: '2000-12-12T12:12',
        author: 'Some Person Some person some person some person'
      }
    }).$mount()

    const heading = mount.$el.getElementsByClassName('heading')[0]

    expect(heading.textContent).toBe('Some Person Some person some person...')
  })
})
