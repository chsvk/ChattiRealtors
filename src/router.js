import Vue from 'vue'
import Router from 'vue-router'
import PostAd from './components/PostAd.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Enter from './DashBoard/EnterDetails.vue'
import Space from './DashBoard/Space.vue'
import AddPlot from './DashBoard/AddPlot.vue'
import Contact from './components/Contact.vue'
import Products from './components/Products.vue'
import BlankSpace from './DashBoard/BlankSpace.vue'
import FullDetails from './components/FullDetails.vue'

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
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/full',
      name: 'fulldetails',
      component: FullDetails,
      props: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
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
        },
        {
          path: '/noplots',
          name: 'noplots',
          component: BlankSpace
        }
      ]
    },
  ]
})
