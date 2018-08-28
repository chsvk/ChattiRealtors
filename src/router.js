import Vue from 'vue'
import Router from 'vue-router'
import PostAd from './components/PostAd.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Enter from './DashBoard/EnterDetails.vue'
import Space from './DashBoard/Space.vue'
import AddPlot from './DashBoard/AddPlot.vue'

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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'space',
          name: 'space',
          component: Space
        },
        {
          path: 'details',
          name: 'details',
          component: Enter
        },
        {
          path: 'new',
          name: 'addplot',
          component: AddPlot
        }
      ]
    },
  ]
})
