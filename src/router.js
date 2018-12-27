import Vue from 'vue'
import Router from 'vue-router'

// Main Components
import Home from './components/Home'
import Products from './components/Products'
import Auth from './components/Authentication'
import Requirements from './components/Requirements'
import Recruitments from './components/Recruitments'
import Contact from './components/Contact'

// Rare

import ForgotPassword from './Rare/ForgotPassword'

// Products

import PlotList from './Products/PlotList'
import FlatList from './Products/FlatList'
import HouseList from './Products/HouseList'

import ViewPlot from './Products/ViewPlot'
import ViewFlat from './Products/ViewFlat'
import ViewHouse from './Products/ViewHouse'


// Dashboard

import Dashboard from './DashBoard/Dashboard'
import New from './DashBoard/New'
import All from './DashBoard/All'
import Plot from './DashBoard/Plot'
import Flat from './DashBoard/Flat'
import House from './DashBoard/House'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/products',
      component: Products,
      children: [
        {
          path: '',
          component: PlotList
        },{
          path: '/flats',
          name: 'flatList',
          component: FlatList
        },
        {
          path: '/houses',
          name: 'houseList',
          component: HouseList
        },
        {
          path: '/viewplot/:id',
          component: ViewPlot
        },
        {
          path: '/viewflat/:id',
          component: ViewFlat
        },
        {
          path: '/viewhouse/:id',
          component: ViewHouse
        }
      ]
    },
    {
      path: '/requirements',
      component: Requirements
    },
    {
      path: '/recruitments',
      component: Recruitments
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotPassword
    },
    {
      path: '/user',
      component: Dashboard,
      children: [
        {
          path: '',
          component: All
        },
        {
          path: '/add',
          component: New
        },
        {
          path: '/plot/',
          name: 'plot',
          props: true,
          component: Plot
        },
        {
          path: '/flat',
          name: 'flat',
          props: true,
          component: Flat
        },
        {
          path: '/house',
          name: 'house',
          props: true,
          component: House
        }
      ]
    }
  ]
})
