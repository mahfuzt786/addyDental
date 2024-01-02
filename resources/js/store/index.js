import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    // calculateValuesApi(_, input, token_send) {
    calculateValuesApi(_, input) {
      // console.log('values', JSON.stringify(input))
      const formData = new FormData();
      formData.append('data', JSON.stringify(input));

      // imp to load output in different structure for test and Addy
      formData.append('ENVIRONMENT', 'PROD');

      // return axios.post('http://localhost/dental-api/', formData)
      return axios.post('https://www.alegralabs.com/syed/dental-api/', formData)
    },
    getStatusImport(_) {
      // return axios.post('http://localhost/dental-api/subsidy_import/')

      return axios.post('https://www.alegralabs.com/syed/dental-api/subsidy_import/')
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  modules: {
  }
})