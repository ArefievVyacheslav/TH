<template lang="pug">
  header.pt40px
    .container.df.aic(:class="{ jcsb: $mq === 'lg' || seoUserAgentDesktop }")
      Logo
      Menu(v-if="$mq === 'lg' || seoUserAgentDesktop" )
      template(v-if="$mq === 'lg' || seoUserAgentDesktop")
        Balance
        Authorize

      template(v-if="$mq !== 'lg'")
        .df.aic.ml-auto
          template(v-if="!seoUserAgentDesktop && !seoUserAgentMobile")
            Balance(v-if="$mq !== 'sm'" :class="{ ml24px: $mq === 'md', 'ml-30px': $mq === 'sm' || seoUserAgentMobile }")
            Authorize(v-if="$mq !== 'sm'" :class="{ ml24px: $mq === 'md' }")

          nuxt-img.menu-icon(
            v-if="$mq !== 'lg' && !seoUserAgentDesktop" src="/img/header/icon-menu-adaptive.png"
            alt="menu adaptive icon" title="Меню" width="28" height="28" placeholder format="webp"
            @click="$root.$emit('toggle-sidebar')" :class="{ ml24px: $mq === 'md' }" preload
          )

      Sidebar(v-if="$mq !== 'lg' && !seoUserAgentDesktop")

    .container.df.jcsb.mt26px(v-if="$mq === 'sm' || seoUserAgentMobile")
      Balance
      Authorize.ml-auto

</template>

<script>
import Logo from './header/Logo.vue'
import Menu from './header/Menu.vue'
import Balance from './header/Balance.vue'
import Authorize from './header/Authorize.vue'
import Sidebar from './Sidebar.vue'
export default {
  name: "Header",
  components: { Sidebar, Authorize, Balance, Menu, Logo },
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
