import { Vue } from 'vue'
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
    calculateValuesApi(_, input, token_send) {
      // console.log('values', JSON.stringify(input))
      const formData = new FormData();
      formData.append('data', JSON.stringify(input));
      formData.append('testdata', token_send);

      // return axios.post('http://localhost/dental-api/', formData)

      // return axios.post('https://www.alegralabs.com/syed/dental-api/', formData)
      return axios.post('http://festzuschuss.online/dental-api/', formData)
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