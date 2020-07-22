<template lang="pug">
  #countries
    a-select(@change='changeLocale' :default-value="selectedLocale" class='locale')
      a-select-option(
        v-for="locale in locales" 
        :key="locale"
        :value='locale'
      ) {{ locale }}
    a-table(
      :columns="columns" 
      :data-source="countries" 
      :pagination="pagination" 
      rowKey='alpha3Code'
      :customRow='customRow'
      :rowClassName="(record, index) => 'country-row'"
    )
      span(slot='names', slot-scope='text, record') {{translatedName(record).translation}}
      span(slot="flags" slot-scope="text" class='parent')
        img(class='flag' :src="text" width='70' height='40')
    Details(:visible="modalShow" @close='handleClose')
</template>

<script>
import { mapGetters } from 'vuex'
import types from '../utils/types'
import Details from '../components/Details'

const columns = [
  {
    title: '',
    dataIndex: 'flag',
    key: 'flag',
    scopedSlots: { customRender: 'flags' },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    defaultSortOrder: 'ascend',
    scopedSlots: { customRender: 'names' },
  },
  {
    title: 'Capital City',
    dataIndex: 'capital',
    key: 'capital',
    sorter: (a, b) => a.capital.localeCompare(b.capital),
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Continent',
    dataIndex: 'region',
    key: 'region',
    sorter: (a, b) => a.region.localeCompare(b.region),
    defaultSortOrder: 'ascend',
  },
]

export default {
  name: 'Countries',
  components: {
    Details,
  },
  data() {
    return {
      modalShow: false,
      columns: columns,
      pagination: {
        defaultPageSize: 20,
      },
      locales: ['en', 'fr', 'es'],
      customRow: (record) => {
        return {
          on: {
            click: (event) => {
              this.showDetails(record.alpha3Code)
            },
          },
        }
      },
    }
  },
  computed: {
    ...mapGetters(['countries', 'selectedLocale', 'countriesName']),
  },
  methods: {
    changeLocale(locale) {
      this.$store.dispatch(types.SET_LOCALE, locale)
      this.$store.dispatch(types.GET_COUNTRIES)
    },
    showDetails(code) {
      const selected = this.countries.find(
        (country) => country.alpha3Code === code
      )
      this.$store.dispatch(types.SET_COUNTRY, selected)
      this.modalShow = true
    },
    handleClose() {
      this.modalShow = false
    },
    translatedName(country) {
      return this.countriesName.find((cname) => cname.name === country.name)
    },
  },
  mounted() {
    this.$store.dispatch(types.GET_COUNTRIES)
  },
}
</script>

<style>
#countries {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.parent {
  width: 100px;
}
.flag {
  /* object-fit: contain; */
  /* width: 10%;
  height: 10%; */
}

.locale {
  margin-bottom: 24px !important;
  width: 30%;
}
.country-row {
  cursor: pointer !important;
}
</style>
