<template lang="pug">
  .header-fv
    .container.df.fdc.jcc
      template(v-if="$route.path === '/'")
        h1.header-fv__h1.m0.p0(:class="{ fs20px: $mq !== 'lg' || seoUserAgentMobile }") Поиск скидок на бренды
        .header-fv__desc.p0(v-if="$mq === 'lg' || seoUserAgentDesktop") Вещи собраны из разделов скидок официальных магазинов

      template(v-else)
        .header-fv__h1.m0.p0(:class="{ fs20px: $mq !== 'lg' || seoUserAgentMobile }") Поиск скидок на бренды
        .header-fv__desc.p0(v-if="$mq === 'lg' || seoUserAgentDesktop") Вещи собраны из разделов скидок официальных магазинов

      HeaderCategoryTabLine

</template>

<script>
import HeaderCategoryTabLine from "@/components/pages/header/HeaderCategoryTabLine.vue";
export default {
  name: "HeaderMiddleFirstView",
  components: { HeaderCategoryTabLine },
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    }
  }
};
</script>
