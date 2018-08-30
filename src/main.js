import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import VueAgile from 'vue-agile'
import 'firebase/firestore'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import { height } from 'window-size';


Vue.use(Toast, {
    type: 'bottom',
    duration: 3500,
    wordWrap: true,
    width: '600px',
    height: '200px',
});

Vue.use(VueParticles)
Vue.use(VueFire)
Vue.use(VueAgile)



firebase.initializeApp({
  apiKey: "AIzaSyAsXvSSpzrSOYa_OAHrrWJenk5A4tqQcrA",
    authDomain: "chattirealtors-4ca32.firebaseapp.com",
    databaseURL: "https://chattirealtors-4ca32.firebaseio.com",
    projectId: "chattirealtors-4ca32",
    storageBucket: "chattirealtors-4ca32.appspot.com",
})
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
