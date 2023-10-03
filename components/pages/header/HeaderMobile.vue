<template lang="pug">
  header.header.zi1(:class="{ 'pos-sticky t0': height > heightHeader && $route.path !== '/', o0: hide, o1t: !hide }")
    HeaderTopMobile(v-show="!strip || $route.path === '/'")
    .bgc-grey(v-show="isShowFilters")
      HeaderMiddleFirstView
      //HeaderMyData
      HeaderFilters(:key="$route.path" @close-filters="isShowFilters = false" :class="{ mt24px: $mq !== 'lg' }")

    .filters-tablet.filters-tablet__mobile.df.jcc.aic(v-if="$route.path !== '/'" @click="setShowFilters")
      .filters-tablet__action-header(:class="{ p5px: isShowFilters }") {{ isShowFilters ? 'Скрыть фильтры' : 'Фильтры' }}

    HeaderSortLine(v-if="$route.path !== '/' && !isProductPage && $route.path.includes('catalog')")
    HeaderTagLine
    Sales(v-show="height < heightHeader + 30 && ($route.path === '/' || $route.path.includes('catalog'))")

</template>

<script>
import HeaderTopMobile from "@/components/pages/header/header-top/HeaderTopMobile.vue";
import HeaderMiddleFirstView from "@/components/pages/header/HeaderMiddleFirstView.vue";
import HeaderMyData from "@/components/pages/header/HeaderMyData.vue";
import HeaderFilters from "@/components/pages/header/header-filters/HeaderFilters.vue";
import HeaderTagLine from "@/components/pages/header/HeaderTagLine.vue";
import HeaderSortLine from "@/components/pages/header/HeaderSortLine.vue";
import Sales from "@/components/pages/header/Sales.vue";
export default {
  name: "HeaderMobile",
  components: { Sales, HeaderSortLine, HeaderTagLine, HeaderFilters, HeaderMyData, HeaderMiddleFirstView, HeaderTopMobile },
  props: [ 'height' ],
  data: () => ({ isShowFilters: false, strip: false, hide: false, heightHeader: null, isProductPage: null }),
  computed: {
    isShowFirstView () { return this.$store.state.statistic.isFirstView || this.$route.path === '/' }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (nV, oV) {
        if (nV === '/') {
          this.isShowFilters = true
          this.hide = false
          this.strip = false
        }
        this.isProductPage = nV.includes('product')
        if (nV.includes('/product') && oV === '/') this.isShowFilters = false
      }
    },
    isShowFilters (nV) { this.$root.$emit('show-filters', nV) },
    height (nV, oV) {
      if (this.$route.path !== '/') {
        if (nV > oV) {
          if (nV > this.heightHeader) {
            if (!this.isShowFilters) {
              this.hide = true
              this.strip = true
            }
          }
        } else {
          this.hide = false
          if (this.heightHeader >= this.height) this.strip = false
          else {
            this.isShowFilters = false
            this.strip = true
          }
        }
      }
    }
  },
  methods: {
    setShowFilters () {
      this.isShowFilters = !this.isShowFilters
      this.strip = !this.isShowFilters
    },
    resizeHandler () {
      this.heightHeader = document.querySelector('.header').offsetHeight
    }
  },
  created () {
    if (this.$route.path === '/') this.isShowFilters = true
  },
  mounted () {
    new ResizeObserver(this.resizeHandler).observe(document.querySelector('.header'))
  }
};
</script>

<style lang="scss">
  .filters-tablet__mobile {
    height: 31px !important;
  }

</style>
