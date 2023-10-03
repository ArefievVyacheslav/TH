<template lang="pug">
  div
    .container
      HowItWorks(:class="{ mt65px: $mq === 'lg', mt20px: $mq === 'md' }")
      Advantages(:class="{ mt100px: $mq === 'lg', mt50px: $mq !== 'lg' }")

    BrandRunString(:class="{ mt100px: $mq === 'lg', mt50px: $mq !== 'lg' }")
    .container
      PopularCategories(:class="{ mt100px: $mq === 'lg', mt50px: $mq !== 'lg' }")
      //ProductsNew.mt100px
      ProductsSale(:class="{ mt100px: $mq === 'lg', mt50px: $mq !== 'lg' }")
      Shops(:class="{ mt65px: $mq === 'lg', mt20px: $mq !== 'lg' }")
      ProductsHits(:class="{ mt100px: $mq === 'lg', mt50px: $mq !== 'lg' }")
      ProductsSeason.mb40px(:class="{ mt65px: $mq === 'lg', mt20px: $mq !== 'lg' }")
      MailForm.mt65px.mb40px

</template>

<script>
import MailForm from '@/components/pages/main/MailForm.vue'
import ProductsSale from '@/components/pages/main/ProductsSale.vue'
import PopularCategories from '@/components/pages/main/PopularCategories.vue'
import ProductsHits from '@/components/pages/main/ProductsHits.vue'
import ProductsSeason from '@/components/pages/main/ProductsSeason.vue'
import HowItWorks from '@/components/pages/main/HowItWorks.vue'
import Advantages from '@/components/pages/main/Advantages.vue'
import BrandRunString from '@/components/pages/main/BrandRunString.vue'
import Shops from '@/components/pages/main/Shops.vue'
// import ProductsNew from '@/components/pages/main/ProductsNew.vue'
export default {
  name: 'IndexPage',
  components: { HowItWorks, Advantages, BrandRunString, PopularCategories, ProductsSale, Shops, ProductsHits, ProductsSeason, MailForm },
    // ProductsNew: async () => await import('@/components/pages/main/Shops.vue'),
  layout: 'default',
  meta: {
    name: 'Главная'
  },
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
    this.$store.commit('filters/RESET_FILTERS')
    this.$store.commit('catalog/UNSET_URL_PARAM')
  },
  data: () => ({
    title: 'Поиск скидок, распродаж и акций на брендовые одежду, обувь и аксессуары',
    description: 'Самый большой онлайн дисконт оригинальных брендов со скидками! В нашем каталоге собраны все вещи из разделов скидок официальных брендовых магазинов с удобными фильтрами!',
    imgUrl: 'https://sales-search.ru/favicon.svg',
    url: 'https://sales-search.ru/',
    meta: null
  })
}
</script>

<style lang="scss">
  .main__header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    color: #2E333A;
  }

  .main__wrap {
    background: #F6F7F9;
    border-radius: 40px;
  }

  .main__wrap-header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #6A7380;
  }

  @media (max-width: 1150px) {
    .main__header {
      font-size: 20px;
      line-height: 24px;
    }

    .main__wrap-header {
      font-size: 16px;
      line-height: 19px;
    }
  }

  @media (max-width: 767px) {
    .main__header {
      font-size: 16px;
      line-height: 19px;
    }
  }

</style>
