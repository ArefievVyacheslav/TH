<template lang="pug">
  b-sidebar(
    id="sidebar-extra-filters" v-model="conditionExtraFilters" sidebar-class="extra-filters"
    @change="isShowExtraFilters = !isShowExtraFilters" no-header-close right :shadow="true" body-class="extra-filters-body"
  )
    .extra-filters__wrap(:class="{ h90p: isShowUrlMobile }")
      .df.jcsb.oh.wsn
        .extra-filters__header.ttu.toe дополнительные параметры
        .mr3px(@click="conditionExtraFilters = false")
          IconCloseModal.extra-filters__icon-close.cp

      InstallmentFilter(@is-installment="toggleFilterCount")
      SaleSizeFilter(ref="SaleSizeFilter" @is-sale-size="toggleFilterCount" @show-filter="() => hideFilters('SaleSizeFilter')" :reset="reset")
      ShopFilter(v-if="selects && selects.shop.length" ref="ShopFilter" @is-shop="toggleFilterCount" @show-filter="() => hideFilters('ShopFilter')" :reset="reset")
      ColorFilter(v-if="selects && selects.color.length" ref="ColorFilter" @is-color="toggleFilterCount" @show-filter="() => hideFilters('ColorFilter')" :reset="reset")
      BrandCountryFilter(v-if="selects && selects.brandCountry.length" ref="BrandCountryFilter" @is-brand-country="toggleFilterCount" @show-filter="() => hideFilters('BrandCountryFilter')" :reset="reset")
      CountyManufactureFilter(v-if="selects && selects.country.length" ref="CountyManufactureFilter" @is-country-manufacture="toggleFilterCount" @show-filter="() => hideFilters('CountyManufactureFilter')" :reset="reset")
      SeasonFilter(v-if="selects && selects.season.length" ref="SeasonFilter" @is-season="toggleFilterCount" @show-filter="() => hideFilters('SeasonFilter')" :reset="reset")
      StyleFilter(v-if="selects && selects.style.length" ref="StyleFilter" @is-style="toggleFilterCount" @show-filter="() => hideFilters('StyleFilter')" :reset="reset")

    .df.g10.mr15px(:class="{ mb54px: $mq === 'sm' }")
      button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
        v-if="filterCount" @click.stop="filterCount = 0; reset = true; resetFilter()"
      ) Сбросить
      button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(
        @click.stop="hideExtraFilters; conditionExtraFilters = false; FETCH_SELECTS()"
      ) Готово

</template>

<script>
import { computed } from "vue";
import { mapActions, mapState } from "vuex";
import IconCloseModal from "@/components/ui/icons/IconCloseModal.vue"
import InstallmentFilter from "@/components/pages/extra/sidebar/sidebar-filters/InstallmentFilter.vue"
import SaleSizeFilter from "@/components/pages/extra/sidebar/sidebar-filters/SaleFilter.vue"
import BrandFilter from "@/components/pages/header/header-filters/BrandFilter.vue"
import ShopFilter from "@/components/pages/extra/sidebar/sidebar-filters/ShopFilter.vue"
import ColorFilter from "@/components/pages/extra/sidebar/sidebar-filters/ColorFilter.vue"
import BrandCountryFilter from "@/components/pages/extra/sidebar/sidebar-filters/BrandCountryFilter.vue"
import CountyManufactureFilter from "@/components/pages/extra/sidebar/sidebar-filters/CountyManufactureFilter.vue"
import SeasonFilter from "@/components/pages/extra/sidebar/sidebar-filters/SeasonFilter.vue"
import StyleFilter from "@/components/pages/extra/sidebar/sidebar-filters/StyleFilter.vue"
export default {
  name: "ExtraFilterSidebar",
  components: { StyleFilter, SeasonFilter, CountyManufactureFilter, BrandCountryFilter, ColorFilter, ShopFilter, BrandFilter, SaleSizeFilter, InstallmentFilter, IconCloseModal },
  data: () => ({
    isShowExtraFilters: false,
    conditionExtraFilters: null,
    filterCount: 0,
    reset: false,
    windowHeight: null,
    isShowUrlMobile: true,
    filterComponentRefs: [ 'SaleSizeFilter', 'ShopFilter', 'ColorFilter', 'BrandCountryFilter', 'CountyManufactureFilter', 'SeasonFilter', 'StyleFilter' ]
  }),
  computed: {
    ...mapState({ selects: state => state.selects.selects })
  },
  watch: {
    isShowExtraFilters (nV) {
      nV
        ? this.showExtraFilters()
        : this.hideExtraFilters()
    },
    conditionExtraFilters (nV) {
      this.$root.$emit('show-extra-filters', nV)
       nV
         ? document.addEventListener('click', this.handleClick)
         : document.removeEventListener('click', this.handleClick); this.FETCH_SELECTS()
    },
    filterCount (nV) {
      this.$root.$emit('count-extra-filters', nV)
    },
    windowHeight (nV, oV) {
      this.isShowUrlMobile = !(nV > oV)
    }
  },
  provide () {
    return {
      reset: computed(() => this.reset)
    }
  },
  methods: {
    hideFilters (exceptionComponent) {
      this.filterComponentRefs.forEach(ref => {
        if (ref !== exceptionComponent && this.$refs[ ref ]) this.$refs[ ref ].hideFilters()
      })
    },
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    handleClick (event) {
      if (event?.target?.className?.includes('b-sidebar-outer')) this.conditionExtraFilters = false
    },
    showExtraFilters () {
      document.querySelector('.b-sidebar-outer').classList.add('b-open-sidebar-right')
      document.body.classList.add('no-scroll')
    },
    hideExtraFilters () {
      document.querySelector('.b-sidebar-outer').classList.remove('b-open-sidebar-right')
      document.body.classList.remove('no-scroll')
    },
    resetFilter () {
      setTimeout(() => this.reset = false, 0)
      this.$store.commit('filters/RESET_EXTRA_FILTERS')
      this.FETCH_SELECTS()
    },
    toggleFilterCount (count) {
      count
        ? this.filterCount ? this.filterCount += 1 : this.filterCount = 1
        : this.filterCount ? this.filterCount -= 1 : this.filterCount = 0
    },
    setWindowHeight () {
      this.windowHeight = window.innerHeight
    }
  },
  mounted () {
    window.onresize = this.setWindowHeight
  }
};
</script>

<style lang="scss">
  .b-open-sidebar-right {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .b-sidebar-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .extra-filters {
    position: fixed;
    top: 0;
    right: 0;
    width: 375px !important;
    padding: 40px 5px 40px 30px;
    background: #FFFFFF;

    .extra-filters__wrap {
      height: 94%;
      padding-right: 15px;
      overflow-y: auto;

      .extra-filters__header {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #B3B3B3;
      }

      .extra-filters__icon-close {
        margin-top: -10px;
        margin-left: 34px;
      }

      .extra-filters__filter {
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #EAECF1;

        .extra-filters__filter-name {
          font-family: 'Inter',serif  ;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: 0.02em;
          color: #616161;
        }
      }
    }

    .extra-filters-body {
      height: calc(100vh - 30px);
    }
  }

  @media (max-width: 1150px) {
    .extra-filters {
      width: 96vw !important;

      .extra-filters-body {
        margin-left: 10px;
        height: calc(100vh - 73px);
      }
    }
  }
  @media (max-width: 767px) {
    .extra-filters {
      padding: 30px 5px 40px 20px;

      .extra-filters__icon-close {
        margin-left: 0 !important;
      }
    }
  }

  .no-scroll {
    position: fixed;
    inline-size: 100%;
    overflow-y: scroll
  }

</style>
