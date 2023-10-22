<template lang="pug">
  .black-bgc(
    :class="{ 'pt60px pb60px': $mq !== 'sm' || seoUserAgentDesktop, 'pt40px pb40px': $mq === 'sm' || seoUserAgentMobile }"
  )
    .container.df.jcsb.aic(:class="{ 'fdc ais': $mq === 'sm' || seoUserAgentMobile }")
      h1.header.font-tektur.text-white(v-html="section.header")
      .description.mt16px.mb0.pb0.font-tektur.text-white(
        v-html="$mq !== 'sm' || seoUserAgentDesktop ? section.desc : section.desc.replaceAll('<br>', '')"
      )

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "HeaderSecond",
  computed: {
    ...mapState({ section: state => state.section.current }),
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    }
  }
}
</script>

<style lang="scss">
.header,
.description {
  line-height: 120%;
}
.header {
  font-size: 72px;
}
.description {
  font-size: 36px;
}

@media (max-width: 1300px) {
  .header {
    font-size: 56px !important;
  }
  .description {
    font-size: 28px !important;
  }
}

@media (max-width: 700px) {
  .header {
    font-size: 40px !important;
  }
  .description {
    font-size: 20px !important;
  }
}

</style>
