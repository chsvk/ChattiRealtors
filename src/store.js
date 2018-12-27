import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    uid: '',
    MainNavState: {
      Home: false,
      Products: false,
      DashBoard: false,
      Authentication: false,
      Requirement: false,
      Recruitment: false,
      Contact: false
    },
    DashBoard: {
      All: false,
      AddPlot: false,
      AddFlat: false,
      AddHouse: false
    }
  },
  mutations: {
    
  },
  actions: {

  }
})
