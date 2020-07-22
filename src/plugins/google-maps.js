import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyArMnLT2QYPfYauKkiFy4GYspmi7O7RI_A',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
