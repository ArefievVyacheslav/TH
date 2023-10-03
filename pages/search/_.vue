<template lang="pug">
  .container.mt-18px
    .df.aic(:class="{ mb24px: $mq !== 'sm', mb16px: $mq === 'sm' }")
      h1.count_header.mr16px(v-text="`Результаты поиска по запросу \"${$route.path.replace('/search/', '')}\"`" :class="{ mt30px: $mq !== 'lg' }")

    Catalog
    MailForm.mt65px.mb40px

</template>

<script>
import MailForm from '@/components/pages/main/MailForm.vue'
import Catalog from '@/components/pages/catalog/Catalog.vue'
export default {
  // TODO: Сделать поиск при перезагрузке
  name: "search",
  components: { MailForm, Catalog },
  layout: 'default',
  async fetch () {
    const metaObj = {
      title: 'Результаты поиска по запросу' + this.$route.path.replace('/search/', ''),
      description: 'Результаты поиска по запросу' + this.$route.path.replace('/search/', ''),
      imgUrl: 'https://sales-search.ru/favicon.svg',
      url: 'https://sales-search.ru' + this.$route.path.replace('/search/', '')
    }
    const { dispatch, getters } = this.$store
    await dispatch('meta/SET_META_TAGS', metaObj)
    this.meta = getters['meta/GET_META_TAGS']
  },
  data: () => ({ meta: null }),
  meta: { name: 'Результаты поиска' }
}
</script>

<style lang="scss">
.product__header {
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #2E333A;
}

@media (max-width: 1150px) {
  .product__header {
    font-size: 18px;
    line-height: 22px;
  }
}

@media (max-width: 767px) {
  .product__header {
    font-size: 16px !important;
    line-height: 19px !important;
  }
}

.count_header,
.count {
  font-family: 'Inter',serif;
  font-style: normal;
}

.count_header {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #2E333A;
}

.count {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #A3AAB5;
}

@media (max-width: 767px) {
  .count_header {
    font-weight: 600 !important;
    font-size: 16px !important;
    line-height: 19px !important;
  }

  .count {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #A3AAB5;
  }
}

</style>

