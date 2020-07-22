<template lang="pug">
  a-modal(:visible="visible" :title="country.name" @ok="handleCancel" @cancel="handleCancel" v-if="country")
    transition(name="component-fade" mode="out-in")
      div(:key='country.name')
        GmapMap(
          :center='latLng'
          :zoom="7"
          class='map'
        )
        a-descriptions
          a-descriptions-item(label='Locale Currency')
            span(class='desc' v-for="currency in country.currencies" :key="currency.code")
              | {{currency.name}} {{currency.symbol}}
        a-descriptions
          a-descriptions-item(label='Neighboring Countries')
            span(class='desc' v-for="neighbour in neighbours" :key="neighbour.name")
              a(@click.prevent="setCountry(neighbour)") {{neighbour.name}}
        a-descriptions
          a-descriptions-item(label='Alternative Spelling')
            span(class='desc' v-for="spelling in country.altSpelling" :key="spelling")
              | {{spelling}}

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { get_country } from '../utils/api'
import types from '../utils/types'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['country']),
    latLng() {
      return {
        lat: this.country.latlng[0],
        lng: this.country.latlng[1],
      }
    },
  },
  asyncComputed: {
    async neighbours() {
      if (!this.country) return []
      return await Promise.all(
        this.country.borders.map(async (border) => await get_country(border))
      )
    },
  },
  methods: {
    handleCancel() {
      this.$emit('close')
    },
    setCountry(country) {
      this.$store.dispatch(types.SET_COUNTRY, country)
    },
  },
}
</script>
<style>
.desc {
  padding-right: 10px;
}
.map {
  width: 100%;
  height: 350px;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
