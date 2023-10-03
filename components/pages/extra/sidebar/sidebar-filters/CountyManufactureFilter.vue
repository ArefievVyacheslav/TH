<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowCountyManufactureFilter = !isShowCountyManufactureFilter")
      .df
        span.extra-filters__filter-name Страна производства

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentCountyManufacture.length > 0" @click.stop="currentCountyManufacture = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowCountyManufactureFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowCountyManufactureFilter }"
        )

    .extra-filters__choices(v-if="isShowCountyManufactureFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentCountyManufacture.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="countyManufactureObj,idx in countyManufactureArr" :key="countyManufactureObj.country" @click="toggleCountyManufacture(countyManufactureObj)"
          :class="{ 'filter__options-item_active': currentCountyManufacture.map(countryObj2 => countryObj2.country).includes(countyManufactureObj.color), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentCountyManufacture.map(countryObj2 => countryObj2.country).includes(countyManufactureObj.country)" styles="top: 4px; left: 3px;")
            span.gender__name.ml8px {{ countyManufactureObj.country.charAt(0).toUpperCase() + countyManufactureObj.country.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentCountyManufacture.length === countyManufactureArr.length") Чтобы увидеть другие страны производства нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "CountyManufactureFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentCountyManufacture: [],
    isShowCountyManufactureFilter: false,
    isChangeCountyManufacture: false,
    init: false
  }),
  computed: {
    countyManufactureArr () {
      return this.$store.state.selects?.selects?.country.concat().sort((a, b) => ('' + a.country).localeCompare(b.country))
    }
  },
  watch: {
    isShowCountyManufactureFilter (nV) {
      nV
        ? this.$emit('show-filter')
        : this.FETCH_SELECTS()
    },
    currentCountyManufacture (nV) {
      if (nV.length) {
        this.setFindParam()
        this.setUrlParam()
        this.isChangeCountyManufacture = true
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeCountyManufacture = false
      }
    },
    reset (nV) {
      if (nV) this.currentCountyManufacture = []
    },
    isChangeCountyManufacture (nV) {
      this.$emit('is-country-manufacture', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentCountyManufacture = []
      }
    },
    '$store.state.filters.findObj.country': {
      handler (nV) {
        if (!nV) this.currentCountyManufacture = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    hideFilters () {
      this.isShowCountyManufactureFilter = false
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'country',
        value: { $in: this.currentCountyManufacture.map(countryObj2 => countryObj2.country).concat() }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'country' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'k-country',
        value: this.currentCountyManufacture.reduce((acc, countyManufactureObj, idx) => {
          if (idx !== this.currentCountyManufacture.length - 1) acc += countyManufactureObj.country_t.toLowerCase() + '--'
          else acc += countyManufactureObj.country_t.toLowerCase()
          return acc
        }, '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'k-country' })
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getCountyManufactureArr () {
      const countyManufactureArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.country.forEach(countyManufactureObj => {
          if (this.$route.path.includes(countyManufactureObj.country_t.toLowerCase())) {
            countyManufactureArr.push(countyManufactureObj)
          }
        })
        if (!countyManufactureArr.length) countyManufactureArr.push(...this.currentCountyManufacture)
        else {
          this.currentCountyManufacture = countyManufactureArr
          this.isChangeCountyManufacture = true
        }
        if (this.currentCountyManufacture.length) this.SET_FIND_PARAM({ param: 'country', value: { $in: this.currentCountyManufacture.map(countryObj => countryObj.country) } })
      }, 1000)
    },
    toggleCountyManufacture (countyManufactureObj) {
      this.currentCountyManufacture.map(countryObj2 => countryObj2.country).includes(countyManufactureObj.country)
        ? this.currentCountyManufacture.splice(this.currentCountyManufacture.indexOf(countyManufactureObj), 1)
        : this.currentCountyManufacture.push(countyManufactureObj)
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.FETCH_SELECTS, 1000)
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getCountyManufactureArr(), 1600)
  }
};
</script>
