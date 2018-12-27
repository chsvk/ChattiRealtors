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
    apiKey: "AIzaSyAsXvSSpzrSOYa_OAHrrWJenk5A4tqQcrA",
    authDomain: "chattirealtors-4ca32.firebaseapp.com",
    databaseURL: "https://chattirealtors-4ca32.firebaseio.com",
    projectId: "chattirealtors-4ca32",
    storageBucket: "chattirealtors-4ca32.appspot.com",
    messagingSenderId: "522456850017"
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
