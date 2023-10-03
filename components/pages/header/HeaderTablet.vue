<template lang="pug">
  header.header.zi1(:class="{ 'pos-sticky t0': height > heightHeader && $route.path !== '/', o0: hide, o1t: !hide }")
    HeaderTopTablet(v-show="!strip || $route.path === '/'")
    .bgc-grey(v-show="isShowFilters")
      HeaderMiddleFirstView
      //HeaderMyData
      HeaderFilters(:key="$route.path" @close-filters="isShowFilters = false" :class="{ mt24px: $mq !== 'lg' }")

    .filters-tablet.df.jcc.aic(v-if="$route.path !== '/'" @click="setShowFilters")
      .filters-tablet__action-header(:class="{ p5px: isShowFilters }") {{ isShowFilters ? 'Скрыть фильтры' : 'Раскрыть фильтры' }}
      IconArrowDownGreyMedium.ml10px(color="#303030" :class="{ 'menu-links__icon-arrow-down-active': isShowFilters }")

    HeaderSortLine(v-if="$route.path !== '/' && !isProductPage && $route.path.includes('catalog')")
    HeaderTagLine
    Sales(v-show="height < heightHeader + 30 && ($route.path === '/' || $route.path.includes('catalog'))")

</template>

<script>
import HeaderTopTablet from "@/components/pages/header/header-top/HeaderTopTablet.vue";
import HeaderMiddleFirstView from "@/components/pages/header/HeaderMiddleFirstView.vue";
import HeaderMyData from "@/components/pages/header/HeaderMyData.vue";
import HeaderFilters from "@/components/pages/header/header-filters/HeaderFilters.vue";
import HeaderSortLine from "@/components/pages/header/HeaderSortLine.vue";
import HeaderTagLine from "@/components/pages/header/HeaderTagLine.vue";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Sales from "@/components/pages/header/Sales.vue";
export default {
  name: "HeaderTablet",
  components: { Sales, IconArrowDownGreyMedium, HeaderTagLine, HeaderSortLine, HeaderFilters, HeaderMyData, HeaderMiddleFirstView, HeaderTopTablet },
  props: [ 'height' ],
  data: () => ({ isShowFilters: false, strip: false, hide: false, heightHeader: null, isProductPage: null }),
  computed: {
    isShowFirstView () { return this.$store.state.statistic.isFirstView || this.$route.path === '/' }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (nV) {
        if (nV === '/') {
          this.isShowFilters = true
          this.hide = false
          this.strip = false
        } else this.isShowFilters = false
        this.isProductPage = nV.includes('product')
      }
    },
    isShowFilters (nV) { if (this.$route.path !== '/') this.$root.$emit('show-filters', nV) },
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
  .filters-tablet {
    padding: 7px 0;
    background: #EAECF1;
    border-top: 1px solid #D1D5E0;
    transition: .3s;

    .filters-tablet__action-header {
      margin: 10px 0;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #303030;

    }
  }

  .bgc-grey {
    background: #EAECF1;
  }

  .menu-links__icon-arrow-down-active {
    transform: rotateX(180deg);
    transition: .3s;
  }

</style>
