import Vue from 'vue'
import Vuex from 'vuex'
import types from '../utils/types'
import { get_countries, get_country } from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    selectedCountry: null,
    locale: 'en',
  },
  getters: {
    countries: (state) => {
      return state.countries
    },
    selectedLocale: (state) => {
      return state.locale
    },
    country: (state) => {
      return state.selectedCountry
    },
  },
  mutations: {
    [types.SET_COUNTRIES](state, countries) {
      state.countries = countries
    },
    [types.SET_COUNTRY](state, country) {
      state.selectedCountry = country
    },
    [types.SET_LOCALE](state, locale) {
      state.locale = locale
    },
  },
  actions: {
    async [types.GET_COUNTRIES]({ commit, state }) {
      const data = await get_countries(state.locale)
      commit(types.SET_COUNTRIES, data)
    },
    [types.SET_LOCALE]({ commit }, locale) {
      commit(types.SET_LOCALE, locale)
    },
    [types.SET_COUNTRY]({ commit }, country) {
      commit(types.SET_COUNTRY, country)
    },
  },
  modules: {},
})
