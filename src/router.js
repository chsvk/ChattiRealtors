import Vue from 'vue'
import Router from 'vue-router'
import PostAd from './components/PostAd.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
