<template lang="pug">
  div
    .df.m0auto(:class="{ pt16px: $store.state.statistic.isFirstView || $route.path === '/', pt20px, 'filter__wrapper pb20px': $mq === 'lg' || seoUserAgentDesktop }")
      .container.df.jcc(:class="{ 'fww g8': $mq !== 'lg' || seoUserAgentMobile }")
        component(:is="comp" v-for="comp in components" :key="comp")
        button.filter__btn-search.cp(
          @click="toProductPage"
          :class="{ 'blue-btn-disabled': isDisabled, 'blue-btn-hover blue-btn-active': !isDisabled, ml8px: $mq === 'lg' || seoUserAgentDesktop, mb16px: $mq !== 'lg' || seoUserAgentMobile }"
        ) Найти скидки

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import GenderFilter from '@/components/pages/header/header-filters/GenderFilter.vue'
import SubcategoryFilter from '@/components/pages/header/header-filters/SubcategoryFilter.vue'
import BrandFilter from '@/components/pages/header/header-filters/BrandFilter.vue'
import SizeFilter from '@/components/pages/header/header-filters/SizeFilter.vue'
import PriceFilter from '@/components/pages/header/header-filters/PriceFilter.vue'
import ExtraFilter from '@/components/pages/header/header-filters/ExtraFilter.vue'
export default {
  name: "HeaderFilters",
  components: {
    GenderFilter,
    SubcategoryFilter,
    BrandFilter,
    SizeFilter,
    PriceFilter,
    ExtraFilter
  },
  props: [ 'pt20px' ],
  data: () => ({ isDisabled: false, components: ['GenderFilter', 'SubcategoryFilter', 'BrandFilter', 'SizeFilter', 'PriceFilter', 'ExtraFilter'] }),
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_SORT_PARAM', 'SET_PAGE_PARAM' ]),
    async toProductPage () {
      if (!this.isDisabled) {
        this.SET_SORT_PARAM({ like: -1 })
        this.SET_PAGE_PARAM(1)
        this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'success', autoHideDelay: 3 })
        await this.$store.dispatch('products/FETCH_PRODUCTS')
        await this.$router.push(this.$store.getters[ "catalog/GET_URL" ])
        if (this.$mq !== 'lg') this.$emit('close-filters')
      } else this.SET_NOTIFICATION({ text: 'Для поиска товаров выберите пол', type: 'danger', autoHideDelay: 5 })
    }
  },
  mounted () {
    if (this.$route.path === '/') setTimeout(this.FETCH_SELECTS, 1000)
  }
};
</script>

<style lang="scss">
  .filter__wrapper {
    background: #EAECF1;
  }

  .filter__btn-search {
    width: 170px;
    height: 60px;
    background: #2D78EA;
    border-radius: 10px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    border: none;
    outline: none;
  }

  .blue-btn-disabled {
    background-color: rgba(45, 120, 234, 0.3) !important;
  }

  .blue-btn-hover:hover {
    background-color: #5D97EF !important;
  }

  .blue-btn-active:active {
    background-color: #1560D0 !important;
  }

  @media (max-width: 1150px) {
    .filter__btn-search {
      width: 736px;
      height: 50px;
      margin-top: 8px;
      background: #2D78EA;
      border-radius: 10px;
      border: none;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #FFFFFF;
    }
  }

</style>
