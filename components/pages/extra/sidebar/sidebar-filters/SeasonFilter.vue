<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowSeasonFilter = !isShowSeasonFilter")
      .df
        span.extra-filters__filter-name Сезон

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentSeason.length > 0" @click.stop="currentSeason = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowSeasonFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowSeasonFilter }"
        )

    .extra-filters__choices(v-if="isShowSeasonFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentSeason.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="seasonObj,idx in seasonArr" :key="seasonObj.season" @click="toggleSeason(seasonObj)"
          :class="{ 'filter__options-item_active': currentSeason.map(seasonObj => seasonObj.season), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentSeason.map(seasonObj => seasonObj.season).includes(seasonObj.season)" styles="top: 4px; left: 3px;")
            span.gender__name.ml8px(v-if="seasonObj.season") {{ seasonObj?.season.charAt(0).toUpperCase() + seasonObj?.season.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentSeason.length === seasonArr.length") Чтобы увидеть другие варианты сезона нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "SeasonFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentSeason: [],
    isShowSeasonFilter: false,
    isChangeSeason: false,
    init: false
  }),
  computed: {
    seasonArr () {
      return this.$store.state.selects?.selects?.season.concat().sort().sort((a, b) => a.season.localeCompare(b.season))
    }
  },
  watch: {
    isShowSeasonFilter (nV) {
      nV
        ? this.$emit('show-filter')
        : this.FETCH_SELECTS()
    },
    currentSeason (nV) {
      if (nV.length) {
        this.setFindParam()
        this.setUrlParam()
        this.isChangeSeason = true
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeSeason = false
      }
      if (this.init) this.fetchEntriesDebounced()
    },
    reset (nV) {
      if (nV) this.currentSeason = []
    },
    isChangeSeason (nV) {
      this.$emit('is-season', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentSeason = []
      }
    },
    '$store.state.filters.findObj.season': {
      handler (nV) {
        if (!nV) this.currentSeason = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    hideFilters () {
      this.isShowSeasonFilter = false
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'season',
        value: { $in: this.currentSeason.map(seasonObj => seasonObj.season).concat() }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'season' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'l-season',
        value: this.currentSeason.reduce((acc, seasonObj, idx) =>  acc += idx === 0
          ? '--' + seasonObj.season_t.toLowerCase() + '--'
          : '' + seasonObj.season_t.toLowerCase() + '--', ''
        )
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'l-season' })
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getSeason () {
      const seasonArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.season.forEach(seasonObj => {
          if (this.$route.path.includes('--' + seasonObj.season_t + '--')) {
            seasonArr.push(seasonObj)
          }
        })
        if (!seasonArr.length) seasonArr.push(...this.currentSeason)
        else {
          this.currentSeason = seasonArr
          this.isChangeSeason = true
        }
        if (this.currentSeason.length) this.SET_FIND_PARAM({ param: 'season', value: { $in: this.currentSeason } })
      }, 1000)
    },
    toggleSeason (seasonObj) {
      this.currentSeason.map(seasonObj2 => seasonObj2.color).includes(seasonObj.color)
        ? this.currentSeason.splice(this.currentSeason.indexOf(seasonObj), 1)
        : this.currentSeason.push(seasonObj)
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.FETCH_SELECTS, 1000)
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getSeason(), 1700)
  }
};
</script>
