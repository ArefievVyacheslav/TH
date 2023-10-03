<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowColorFilter = !isShowColorFilter")
      .df
        span.extra-filters__filter-name Цвет

      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentColor.length > 0" @click.stop="currentColor = []; resetFilter()") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowColorFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowColorFilter }"
        )

    .extra-filters__choices(v-if="isShowColorFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentColor.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="colorObj,idx in colorArr" :key="colorObj.color" @click="toggleColor(colorObj)"
          :class="{ 'filter__options-item_active': currentColor.map(colorObj2 => colorObj2.color).includes(colorObj.color), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentColor.map(colorObj2 => colorObj2.color).includes(colorObj.color)" styles="top: 4px; left: 3px;")
            span.gender__name.ml8px(v-if="colorObj.color") {{ colorObj?.color.charAt(0).toUpperCase() + colorObj?.color.slice(1) }}

      .dropdown-choice-count.mt12px.mb10px(v-if="currentColor.length === colorArr.length") Чтобы увидеть другие варианты цвета нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconTooltipInfo from "@/components/ui/icons/IconTooltipInfo.vue";

export default {
  name: "ColorFilter",
  components: { IconTooltipInfo, IconSearchMenuLinks, Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    currentColor: [],
    isShowColorFilter: false,
    isChangeColor: false,
    init: false
  }),
  computed: {
    colorArr () {
      return this.$store.state.selects?.selects?.color.concat().sort((a, b) => a.color.localeCompare(b.color))
    }
  },
  watch: {
    isShowColorFilter (nV) {
      nV
        ? this.$emit('show-filter')
        : this.FETCH_SELECTS()
    },
    currentColor (nV) {
      if (nV.length) {
        this.setFindParam()
        this.setUrlParam()
        this.isChangeColor = true
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
        this.isChangeColor = false
      }
    },
    reset (nV) {
      if (nV) this.currentColor = []
    },
    isChangeColor (nV) {
      this.$emit('is-color', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentColor = []
      }
    },
    '$store.state.filters.findObj.color': {
      handler (nV) {
        if (!nV) this.currentColor = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    hideFilters () {
      this.isShowColorFilter = false
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'color',
        value: { $in: this.currentColor.map(colorObj => colorObj.color).concat() } // TODO: Везде сделать конкаты
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'color' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'i-color',
        value: this.currentColor.reduce((acc, colorObj, idx) => acc += idx === 0
          ? '--' + colorObj.color_t.toLowerCase() + '--'
          : '' + colorObj.color_t.toLowerCase() + '--', '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'i-color' })
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getColor () {
      const colorArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.color.forEach(colorObj => {
          if (this.$route.path.includes('--' + colorObj.color_t.toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('yj', 'yy') + '--')) {
            colorArr.push(colorObj)
          }
        })
        if (!colorArr.length) colorArr.push(...this.currentColor)
        else {
          this.currentColor = colorArr
          this.isChangeColor = true
        }
        if (this.currentColor.length) this.SET_FIND_PARAM({ param: 'color', value: { $in: this.currentColor } })
      }, 1000)
    },
    toggleColor (colorObj) {
      this.currentColor.map(colorObj2 => colorObj2.color).includes(colorObj.color)
        ? this.currentColor.splice(this.currentColor.indexOf(colorObj), 1)
        : this.currentColor.push(colorObj)
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getColor(), 1400)
  }
};
</script>
