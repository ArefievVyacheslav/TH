<template lang="pug">
  header.header.zi1(:class="{ 'pos-sticky t0': height > heightHeader && $route.path !== '/', o0: hide, o1t: !hide }")
    MenuTop(v-show="!strip")
    MenuLinks(v-show="!strip" :class="{ pb24px: isProductPage }")
    HeaderMiddleFirstView(v-show="$route.path === '/'")
    //HeaderMyData(v-if="!isProductPage" v-show="!strip" :isShowHeaderFirstView="isShowHeaderFirstView")
    .placeholder-my-data(v-if="!isProductPage" v-show="!strip" :class="{ 'pt22px pb16px p0': !isShowHeaderFirstView && $mq !== 'sm', 'pt16px jcsb': $mq === 'sm', pt30px: isShowHeaderFirstView }")
    HeaderFilters(:key="$route.path" :pt20px="strip")
    HeaderSortLine(v-if="$route.path !== '/' && !isProductPage && $route.path.includes('catalog')" v-show="$route.path !== '/' && !strip")
    HeaderTagLine(:is-background="!strip")
    Sales(v-if="height < heightHeader + 30 && ($route.path === '/' || $route.path.includes('catalog'))" :isShowHeaderFirstView="isShowHeaderFirstView")
    .mb54px(v-else-if="!isProductPage")

</template>

<script>
import MenuTop from '@/components/pages/header/header-top/MenuTop.vue'
import MenuLinks from '@/components/pages/header/header-second-line/MenuLinks.vue'
import HeaderMiddleFirstView from '@/components/pages/header/HeaderMiddleFirstView.vue'
import HeaderFilters from '@/components/pages/header/header-filters/HeaderFilters.vue'
import HeaderMyData from '@/components/pages/header/HeaderMyData'
import HeaderSortLine from '@/components/pages/header/HeaderSortLine.vue'
import HeaderTagLine from '@/components/pages/header/HeaderTagLine.vue'
import Sales from '@/components/pages/header/Sales.vue'
export default {
  name: 'Header',
  components: { Sales, HeaderTagLine, HeaderSortLine, HeaderMyData, HeaderFilters, HeaderMiddleFirstView, MenuLinks, MenuTop },
  props: [ 'height' ],
  data: () => ({ strip: false, hide: false, heightHeader: null, isProductPage: null }),
  computed: {
    isShowHeaderFirstView () { return this.$store.state.statistic.isFirstView || this.$route.path === '/' }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (nV) {
        if (nV === '/') {
          this.hide = false
          this.strip = false
        }
        this.isProductPage = nV.includes('product')
      }
    },
    height (nV, oV) {
      if (this.$route.path !== '/') {
        if (nV > oV) {
          if (nV > this.heightHeader) {
            this.hide = true
            this.strip = true
          }
        } else {
          this.hide = false
          if (this.heightHeader >= this.height) this.strip = false
        }
      }
    }
  },
  methods: {
    resizeHandler () { this.heightHeader = document.querySelector('.header').offsetHeight }
  },
  mounted () { new ResizeObserver(this.resizeHandler).observe(document.querySelector('.header')) },
  beforeDestroy () { document.querySelector('.header').removeEventListener('resize', this.resizeHandler) }
}
</script>

<style lang="scss">
  .placeholder-my-data {
    background: #EAECF1 !important;
  }

</style>
