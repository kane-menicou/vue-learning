import Vue from 'vue'
import Router from 'vue-router'
import Channel from '../components/Channel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Channel',
      component: Channel
    }
  ]
})
