<template lang="pug">
  .black-bgc.pt60px.pb60px
    .container.df.jcsb.aic
      h1.header.font-tektur.text-white(v-html="data.header")
      p.description.font-tektur.text-white(v-html="data.desc")

</template>

<script>
export default {
  name: "HeaderSecond",
  data: () => ({ data: { header: 'Нейросеть <br><span class="text-purple"">онлайн</span>', desc: 'быстрое <br>решение <br>твоих задач' } }),
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

<style lang="scss">
.header {
  font-size: 72px;
  line-height: 120%;
}
.description {
  font-size: 36px;
  line-height: 120%;
}

</style>
