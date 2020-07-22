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
    countriesName: (state) => {
      return state.countries.map((country) => {
        const translation =
          country.translations[state.locale] === undefined
            ? country.name
            : country.translations[state.locale]
        return {
          name: country.name,
          translation: translation,
        }
      })
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
    async [types.GET_COUNTRIES]({ commit }) {
      const data = await get_countries()
      commit(types.SET_COUNTRIES, data)
    },
    [types.SET_LOCALE]({ commit }, locale) {
      commit(types.SET_LOCALE, locale)
    },
    async [types.SET_COUNTRY]({ commit }, country) {
      const data = await get_country(country.alpha3Code)
      commit(types.SET_COUNTRY, data)
    },
  },
  modules: {},
})
