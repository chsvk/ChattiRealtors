import Vue from 'vue'
import Router from 'vue-router'

// Main Components
import Home from './components/Home'
import Products from './components/Products'
import Auth from './components/Authentication'
import Requirements from './components/Requirements'
import Recruitments from './components/Recruitments'
import Contact from './components/Contact'
import About from '@/components/About'

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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Residential lands | Open plots | HMDA plots | Gated community plots',
        metaTags: [
          {
            name: 'description',
            content: 'Search, Buy, Sell any property in areas like Bibinagar, Yadadri, Bhongiri, Ghatkesar, Near AIIMS, NIMS in Hyderabad.'
          }
        ]
      }
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        title: 'Chatti Realtors is the right place to Invest in Properties',
        metaTags: [
          {
            name: 'description',
            content: 'Register your account at Chatti Realtors and place your property to sell at best prices.'
          }
        ]
      }
    },
    {
      path: '/products',
      component: Products,
      meta: {
        title: 'All types of Properties | Plots | Flats | Houses | Sell and Buy',
        metaTags: [
          {
            name: 'description',
            content: 'One destination for all your needs, buy or sell any property like plots, flats, Independent Houses at Chatti Realtors'
          }
        ]
      },
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
      component: Requirements,
      meta: {
        title: 'Post your Property Requirements. We will get back to you.',
        metaTags: [
          {
            name: 'description',
            content: 'Post your property requirements like plots, flats and Independent Houses, Chatti Realtors give you the best based on your requirements.'
          }
        ]
      }
    },
    {
      path: '/recruitments',
      component: Recruitments,
      meta: {
        title: 'Grab your opportunity at Chatti Realtors and do your best work.',
        metaTags: [
          {
            name: 'description',
            content: 'Looking for an opportunity in Real estate field, Chatti Realtors is the best place for you to come up with creative concepts to increase business.'
          }
        ]
      }
    },
    {
      path: '/contact',
      component: Contact,
      meta: {
        title: 'Contact | Chatti Realtors for any Property Needs',
        metaTags: [
          {
            name: 'description',
            content: 'Contact Chatti Realtors to buy or sell plots, Flats and Independent Houses and any kind of property.'
          }
        ]
      }
    },
    {
      path: '/about',
      component: About
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

// This callback runs before every route change, including on page load.
Router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});
