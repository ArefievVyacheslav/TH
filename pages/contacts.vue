<template lang="pug">
  .container
    Breadcrumbs(:custom-crumbs="[{ anchor: 'Контакты', link: '' }]")
    .container-article
      Article
    MailForm.mt50px.mb50px

</template>

<script>
import Article from "@/components/pages/article/Article.vue";
import Breadcrumbs from "@/components/extra/Breadcrumbs.vue";
import MailForm from "@/components/pages/main/MailForm.vue";
export default {
  name: "contacts",
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
    name: 'Контакты'
  },
  data: () => ({
    title: 'Контакты - все способы связаться с нами | Sales Search',
    description: "На этой страницы вы найдёте самый удобный способ связи с нами. Связаться по почте, в мессенджерах или через форму обратной связи - мы рады контакту с вами везде.",
    imgUrl: 'https://sales-search.ru/favicon.svg',
    url: 'https://sales-search.ru/contacts',
    meta: null
  })
};
</script>

<style lang="scss">
  .article__header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    color: #2E333A;
  }

</style>
