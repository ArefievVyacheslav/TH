<template lang="pug">
  section.article(v-if="article")
    component(v-for="tagData in article" :key="tagData.text" :is="tagData.tag" v-html="tagData.text")

</template>

<script>
export default {
  name: "Article",
  async fetch () {
    try {
      this.article = await require(`../../../static/articles${this.$route.path}.js`).default
    } catch (e) {}
  },
  data: () => ({ article: null })
}
</script>

<style lang="scss">
.container-article {
  margin: 0 auto !important;
  max-width: 744px !important;
}
.article p {
  font-size: 16px;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
}
.article h1 {
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
}
.article h2 {
  margin-top: 35px;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
}
.article li {
  margin-top: 14px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
}

.article p,
.article h2,
.article li,
.article h1 {
  color: var(--text-dark, #2E333A);
  font-family: Inter,serif;
  font-style: normal;
}

</style>
