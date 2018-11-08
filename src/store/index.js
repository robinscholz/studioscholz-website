import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    apidata: [],
    filtervalue: [],
    weather: [],
    count: 0,
    color: 'black',
    isProject: false
  },
  actions: {
    // Get API Data
    LOAD_DATASET: function ({ commit }) {
      axios.get('/cms/api/data').then((response) => {
        commit('SET_DATASET', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    // Filter
    UPDATE_FILTER ({ commit }, filtervalue) {
      commit('SET_FILTER', filtervalue)
    }
  },
  // Set API Data
  mutations: {
    SET_DATASET: (state, { list }) => {
      state.apidata = list
    },
    // Filter
    SET_FILTER (state, filtervalue) {
      state.filtervalue = filtervalue
    },
    // Color
    UPDATE_COLOR (state, color) {
      state.color = color
    },
    UPDATE_MENU (state, isProject) {
      state.isProject = isProject
    }
  }
})
export default store
