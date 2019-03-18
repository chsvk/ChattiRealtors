import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueAgile from 'vue-agile'


Vue.use(VueAgile)
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '400px'
});

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyA6mkexTrounhusJ4XBNcRPIVdXvrqbg_Y",
  authDomain: "cr-main.firebaseapp.com",
  databaseURL: "https://cr-main.firebaseio.com",
  projectId: "cr-main",
  storageBucket: "cr-main.appspot.com",
  messagingSenderId: "279382156099"
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
