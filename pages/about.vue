<template lang="pug">
  .container
    Breadcrumbs(:custom-crumbs="[{ anchor: 'О нас', link: '' }]")
    .container-article
      Article
    MailForm.mt50px.mb50px

</template>

<script>
import Article from "@/components/pages/article/Article.vue";
import Breadcrumbs from "@/components/extra/Breadcrumbs.vue";
import MailForm from "@/components/pages/main/MailForm.vue";
export default {
  name: "about",
  components: { MailForm, Breadcrumbs, Article },
  async fetch () {
    const metaObj = {
      title: this.title,
      description: this.description,
      imgUrl: this.imgUrl,
      url: this.url
    }
    const { dispatch, getters } = this.$store
    await dispatch('meta/SET_META_TAGS', metaObj)
    this.meta = getters['meta/GET_META_TAGS']
  },
  meta: {
    name: 'О нас'
  },
  data: () => ({
    title: 'Как пользоваться Sales Search: преимущества и наша миссия',
    description: "Пользуясь нашим сервисом вы не захотите больше искать скидки самостоятельно! Ознакомьтесь на этой странице детально как устроен наш сервис и компания и какую миссию мы несем",
    imgUrl: 'https://sales-search.ru/favicon.svg',
    url: 'https://sales-search.ru/about',
    meta: null
  })
};
</script>

<style lang="scss">

</style>
