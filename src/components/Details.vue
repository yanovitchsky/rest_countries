<template lang="pug">
  a-modal(:visible="visible" :title="country.name" @ok="handleCancel" @cancel="handleCancel" v-if="country")
    a-descriptions
      a-descriptions-item(label='Locale Currency')
        span(class='desc' v-for="currency in country.currencies" :key="currency.code")
          | {{currency.name}} {{currency.symbol}}
    a-descriptions
      a-descriptions-item(label='Neighboring Countries')
        div(v-for="border in country.borders" :key="border")
          | {{border}}
    a-descriptions
      a-descriptions-item(label='Alternative Spelling')
        div(v-for="spelling in country.altSpelling" :key="spelling")
          | {{spelling}}

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['country']),
  },
  methods: {
    handleCancel() {
      this.$emit('close')
    },
  },
}
</script>
<style>
.desc {
  padding-right: 10px;
}
</style>
