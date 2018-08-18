import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import VueAgile from 'vue-agile'
import 'firebase/firestore'

Vue.use(VueParticles)
Vue.use(VueFire)
Vue.use(VueAgile)



firebase.initializeApp({
  projectId: 'chattirealtors-4ca32',
  databaseURL: 'https://chattirealtors-4ca32.firebaseio.com',
  storageBucket: "chattirealtors-4ca32.appspot.com",
  authDomain: "chattirealtors-4ca32.firebaseapp.com",
})
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
