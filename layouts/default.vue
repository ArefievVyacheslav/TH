<template lang="pug">
  .black-bgc
    Header
    HeaderSecond
    Nuxt

</template>

<script>
import Header from '../components/Header.vue'
import HeaderSecond from '../components/HeaderSecond.vue'
export default {
  name: 'default',
  components: { HeaderSecond, Header },
  head: () => ({ htmlAttrs: { lang: 'ru' } })
}
</script>
