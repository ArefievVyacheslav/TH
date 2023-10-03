<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowStyleFilter = !isShowStyleFilter")
      .df
        span.extra-filters__filter-name Стиль

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentStyle.length > 0" @click.stop="currentStyle = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowStyleFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowStyleFilter }"
        )

    .extra-filters__choices(v-if="isShowStyleFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentStyle.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="styleObj,idx in styleArr" :key="styleObj.style" @click="toggleStyle(styleObj)"
          :class="{ 'filter__options-item_active': currentStyle.map(styleObj => styleObj.style), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentStyle.map(styleObj => styleObj.style).includes(styleObj.style)" styles="top: 4px; left: 3px;")
            span.gender__name.ml8px(v-if="styleObj.style") {{ styleObj?.style.charAt(0).toUpperCase() + styleObj?.style.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentStyle.length === styleArr.length") Чтобы увидеть другие варианты стиля нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "StyleFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentStyle: [],
    isShowStyleFilter: false,
    isChangeStyle: false,
    init: false
  }),
  computed: {
    styleArr () {
      return this.$store.state.selects?.selects?.style.concat().sort((a, b) => a.style.localeCompare(b.style))
    }
  },
  watch: {
    isShowStyleFilter (nV) {
      nV
        ? this.$emit('show-filter')
        : this.FETCH_SELECTS()
    },
    currentStyle (nV) {
      if (nV.length) {
        this.setFindParam()
        this.setUrlParam()
        this.isChangeStyle = true
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeStyle = false
      }
      if (this.init) this.fetchEntriesDebounced()
    },
    reset (nV) {
      if (nV) this.currentStyle = []
    },
    isChangeStyle (nV) {
      this.$emit('is-style', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentStyle = []
      }
    },
    '$store.state.filters.findObj.style': {
      handler (nV) {
        if (!nV) this.currentStyle = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    hideFilters () {
      this.isShowStyleFilter = false
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'style',
        value: { $in: this.currentStyle.map(styleObj => styleObj.style).concat() }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'style' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'm-style',
        value: this.currentStyle.reduce((acc, styleObj, idx) =>  acc += idx === 0
          ? '--' + styleObj.style_t.toLowerCase() + '--'
          : '' + styleObj.style_t.toLowerCase() + '--', ''
        )
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'm-style' })
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getStyle () {
      const styleArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.style.forEach(styleObj => {
          if (this.$route.path.includes('--' + styleObj.style_t + '--')) {
            styleArr.push(styleObj)
          }
        })
        if (!styleArr.length) styleArr.push(...this.currentStyle)
        else {
          this.currentStyle = styleArr
          this.isChangeStyle = true
        }
        if (this.currentStyle.length) this.SET_FIND_PARAM({ param: 'style', value: { $in: this.currentStyle } })
      }, 1000)
    },
    toggleStyle (styleObj) {
      this.currentStyle.map(style2 => style2.color).includes(styleObj.color)
        ? this.currentStyle.splice(this.currentStyle.indexOf(styleObj), 1)
        : this.currentStyle.push(styleObj)
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.FETCH_SELECTS, 1000)
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getStyle(), 1800)
  }
};
</script>
