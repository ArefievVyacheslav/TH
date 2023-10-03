<template lang="pug">
  .layout-default
    HeaderDesktop(v-if="$mq === 'lg' || seoUserAgentDesktop")
    HeaderTablet(v-if="$mq === 'md'")
    HeaderMobile(v-if="$mq === 'sm' || seoUserAgentMobile")
    Nuxt.page
    FooterMain
    UpArrowScroll
    transition(name="bounce")
      Notification(v-if="$store.state.notifications.notification")

</template>

<script>
import HeaderDesktop from '@/components/pages/header/HeaderDesktop.vue'
import HeaderTablet from "@/components/pages/header/HeaderTablet.vue"
import HeaderMobile from "@/components/pages/header/HeaderMobile.vue"
import Notification from "@/components/extra/Notification.vue"
import ExtraFilterSidebar from "@/components/pages/extra/sidebar/ExtraFilterSidebar.vue"
import FilterTabletModal from "@/components/extra/FilterModal.vue"
import FooterMenu from "@/components/pages/footer/FooterMenu.vue"
import UpArrowScroll from "@/components/ui/blocks/UpArrowScroll.vue"
import FooterMain from "@/components/pages/footer/FooterMain.vue"
export default {
  name: 'default',
  components: { Notification, FooterMain, UpArrowScroll, HeaderMobile, FooterMenu, FilterTabletModal, HeaderTablet, ExtraFilterSidebar, HeaderDesktop },
  head () {
    const countries = { '--rb--': 'ru-by', '--kz--': 'ru-kz', '--am--': 'ru-am', '--kg--': 'ru-kg', '--az--': 'ru-az', '--md--': 'ru-md', '--tj--': 'ru-tg', '--uz--': 'ru-uz', '--tm--': 'ru-tm' }
    let lang;
    for (const pathKey of Object.keys(countries)) {
      if (this.$route.path.includes(pathKey)) {
        lang = countries[ pathKey ]
        break
      }
    }
    if (!lang) lang = 'ru'
    return {
      htmlAttrs: { lang }
    }
  },
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
