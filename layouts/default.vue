<template lang="pug">
  Header

</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'default',
  components: { Header },
  head: () => ({ htmlAttrs: { lang: 'ru' } })
}
</script>
