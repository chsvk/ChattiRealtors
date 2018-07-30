import Vue from 'vue'
import Router from 'vue-router'
import PostAd from './components/PostAd.vue'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post',
      name: 'PostAd',
      component: PostAd
    },
  ]
})
