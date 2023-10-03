<template lang="pug">
  .tag-wrapper.pb12px(
    v-if="Object.keys($store.getters['filters/GET_LINE_FILTERS']).length > 2"
    :class="{ mt10px: $mq !== 'lg' || seoUserAgentMobile, 'bgc-header': isBackground && $mq === 'lg' || seoUserAgentDesktop, pt16px: !isBackground && $mq === 'lg' || seoUserAgentDesktop }"
  )
    .df(:class="{ container: $mq !== 'sm' || seoUserAgentDesktop, 'ml10px mr10px mt10px': $mq === 'sm' || seoUserAgentMobile }")
      button.tag.df.jcc.aic.tag__reset.cp.mr8px(@click="RESET_FILTERS('gender'); RESET_EXTRA_FILTERS(); FETCH_PRODUCTS()")
        span.mt-2px.toe.oh.wsn Сбросить все

      .df(ref="tags" :class="{ 'tag-wrapper__scroll': $mq !== 'lg' || seoUserAgentMobile, 'fww': $mq === 'lg' || seoUserAgentDesktop }")
        button.tag.df.jcc.aic.cp.mr8px.mb12px(v-if="gender")
          span.mt-2px.toe.oh.wsn {{ gender }}
          div.mt2px(@click="removeFindParam('gender')")
            IconCloseCircleGrey.ml6px

        button.tag.df.jcc.aic.cp.mr8px.mb12px(v-for="subcat in subcategory" :key="subcat")
          span.mt-2px.toe.oh.wsn {{ subcat }}
          div.mt2px(@click="removeOneFindParam('subcategory', subcat)")
            IconCloseCircleGrey.ml6px

        button.tag.df.jcc.aic.cp.mr8px.mb12px(v-for="brandStr in brand" :key="brandStr")
          span.mt-2px.toe.oh.wsn {{ brandStr }}
          div.mt2px(@click="removeOneFindParam('brand', brandStr)")
            IconCloseCircleGrey.ml6px

        button.tag.df.jcc.aic.cp.mr8px.mb12px(v-for="size in sizes" :key="size")
          span.mt-2px.toe.oh.wsn {{ size }}
          div.mt2px(@click="removeOneFindParam('sizes', size)")
            IconCloseCircleGrey.ml6px

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconCloseCircleGrey from "@/components/ui/icons/IconCloseCircleGrey.vue";
export default {
  name: "HeaderTagLine",
  components: { IconCloseCircleGrey },
  props: {
    isBackground: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    // scrollAmount: 0,
    gender: null,
    subcategory: [],
    brand: [],
    sizes: []
  }),
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    }
  },
  // computed: {
  //   lengthLettersInFilter () {
  //     let count = 0
  //     if (this.gender) count += this.gender.length
  //     if (this.subcategory) count += this.subcategory.reduce((acc, subcat) => acc += subcat.length, 0)
  //     if (this.brand) count += this.brand.reduce((acc, brand) => acc += brand.length, 0)
  //     if (this.sizes) count += this.sizes.reduce((acc, size) => acc += size.length, 0)
  //     return count
  //   },
  //   isShowRightArrow () {
  //     if (this.lengthLettersInFilter > 60 && this.scrollAmount === 0) return true
  //     return this.$refs?.tags?.scrollWidth > 900 && this.$refs?.tags?.scrollWidth - 50 > this.scrollAmount + 900
  //   }
  // },
  watch: {
    '$store.state.filters.findObj': {
      handler (nV) {
        this.gender = nV.gender
        nV.subcategory
          ? this.subcategory = nV.subcategory[ '$in' ]
          : this.subcategory = []
        nV.brand
          ? this.brand = nV.brand[ '$in' ]
          : this.brand = []
        nV.sizes
          ? this.sizes = nV.sizes[ '$in' ]
          : this.sizes = []
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', ['FETCH_SELECTS']),
    ...mapActions('products', ['FETCH_PRODUCTS']),
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('filters', ['UNSET_FIND_PARAM', 'UNSET_ONE_FIND_PARAM', 'RESET_FILTERS', 'RESET_EXTRA_FILTERS']),
    removeFindParam (paramStr) {
      this.UNSET_FIND_PARAM({ param: paramStr })
      if (this.$route.path !== '/') {
        this.FETCH_SELECTS()
        this.FETCH_PRODUCTS()
      }
      window.scrollTo(pageYOffset, 0)
    },
    removeOneFindParam (param, value) {
      this.UNSET_ONE_FIND_PARAM({ param, value })
      if (this.$route.path !== '/') this.fetchEntriesDebounced()
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(() => {
        this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'info', autoHideDelay: 3 })
        this.FETCH_SELECTS()
        this.FETCH_PRODUCTS()
      }, 2500)
    }
    // scrollLeft () {
    //   const tags = this.$refs.tags
    //   tags.scrollTo({ left: this.scrollAmount += this.isShowRightArrow ? 100 : 0, behavior: 'smooth' })
    // },
    // scrollRight () {
    //   const tags = this.$refs.tags
    //   tags.scrollTo({ left: this.scrollAmount -= this.scrollAmount ? 100 : 0, behavior: 'smooth' })
    // }
  }
};
</script>

<style lang="scss">
  .bgc-header {
    background: #EAECF1;
  }
  .pt16px {
    .tag {
      border: 1px solid #e7e7e8 !important;
    }
  }

  .tag-wrapper {
    .tag {
      height: 32px;
      padding: 8px 12px;
      background: #FFFFFF;
      border-radius: 100px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #303030;
      border: none;
    }

    .tag__reset {
      color: #2D78EA;
    }
  }

  @media (max-width: 1150px) {
    .tag-wrapper {
      background: transparent;

      .tag {
        padding: 11px 12px;
        background: #FFFFFF;
        border: 1px solid #EAECF1;
      }
    }
  }

  .tag-wrapper__scroll {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tag-wrapper__scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
