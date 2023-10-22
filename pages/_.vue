<template lang="pug">
  SliderLinks(:links="links")

</template>

<script>
import SliderLinks from '../components/SliderLinks.vue'
export default {
  name: "_",
  components: { SliderLinks },
  async asyncData ({ store }) {
    await store.dispatch('section/FETCH_SECTION')
    return { ...store.state.section.current }
  },
  async fetch () {
    const { title, description, imgUrl, url } = this
    const { dispatch, getters } = this.$store
    await dispatch('meta/SET_META_TAGS', { title, description, imgUrl, url: url + this.$route.path })
    this.meta = getters['meta/GET_META_TAGS']
  },
  data: () => ({
    imgUrl: '/img/header/logo.png',
    url: 'https://text-helper.ru',
    meta: null
  })
}
</script>

<style lang="scss">

</style>
