<template lang="pug">
  .logo.black-bgc
    nuxt-link(to="/")
      nuxt-img(
        v-if="$mq !== 'sm' && !seoUserAgentDesktop && !seoUserAgentMobile" src="/img/header/logo.png" preload
        alt="text-helper.ru logo" title="text-helper.ru logo" width="178" height="44" placeholder format="webp"
      )
      img(
        v-if="seoUserAgentDesktop" src="/img/header/logo.png" alt="text-helper.ru logo"
        title="text-helper.ru logo" width="178" height="44"
      )
      nuxt-img(
        v-if="$mq === 'sm' && !seoUserAgentMobile" src="/img/header/logo-mobile.png" alt="text-helper.ru logo"
        title="text-helper.ru logo" width="178" height="36" placeholder format="webp" preload
      )
      img(
        v-if="seoUserAgentMobile" src="/img/header/logo-mobile.png" alt="text-helper.ru logo"
        title="text-helper.ru logo" width="178" height="36"
      )

</template>

<script>
export default {
  name: "Logo",
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    }
  }
}
</script>
