<template lang="pug">
  .filter__item.filter__item_size.pos-rel.df.jcsb.aic.cp(
    @click="isShowSizeList = !isShowSizeList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    .filter__name.filter__name_gender(:class="{ disabled }") Размер
    .number-selected-options.pos-abs.ml58px(v-if="currentSizeArr.length") {{ currentSizeArr.length }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowSizeList && !disabled }"
    )
    .filter__dropdown.pos-abs(v-if="isShowSizeList && $mq === 'lg' && !disabled")
      DropDown(@close="isShowSizeList = false; acceptParameters()" :styles="{ padding: '10px 20px 20px 20px', 'width': '214px' }")
        .df.aic
          //IconTooltip#tooltip-dropdown-language.ml6px
          //b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
          //  | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
          //  nuxt-link.tooltip-link(to="/lk") себя в профиле

        .filter__options-wrapper.mt12px.pr12px
          .filter__options-item.filter__options-item-size.df.aic.mt7px.cp(
            v-for="sizeStr,idx in sizeArr" :key="sizeStr" @click.stop="toggleSize(sizeStr)"
              :class="{ 'filter__options-item_active': currentSizeArr.includes(sizeStr) }"
            )
              .df.aic
                Checkbox(:is-checked="currentSizeArr.includes(sizeStr)" styles="top: 4px; left: 3px;") {{ sizeStr }}
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentSizeArr.includes(sizeStr) }") {{ sizeStr }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие размеры нажмите «Сбросить»

        .df.g10
          button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
            v-if="currentSizeArr.length" @click.stop="currentSizeArr = []; resetFilter()"
          ) Сбросить
          button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

    FilterTabletModal(
      v-if="isShowSizeList && $mq !== 'lg' && !disabled" :reset="!!currentSizeArr.length"
      @close="isShowSizeList = false" @reset="currentSizeArr = []; resetFilter()" @accept="acceptParameters"
    )
      .dropdown-choice-count.mt12px.mb10px(v-if="currentSizeArr.length") Выбрано: {{ currentSizeArr.length }}

      .filter__options-wrapper
        .filter__options-item-tablet.df.aic.mt7px.ml2px.cp(
          v-for="sizeStr in sizeArr" :key="sizeStr" @click.stop="toggleSize(sizeStr)"
          :class="{ 'filter__options-item_active': currentSizeArr.includes(sizeStr) }"
        )
          .df.aic
            Checkbox(:is-checked="currentSizeArr.includes(sizeStr)" styles="top: 4px; left: 3px;") {{ sizeStr }}
            span.gender__name-tablet.ml8px(:class="{ 'gender__name_active': currentSizeArr.includes(sizeStr) }") {{ sizeStr }}

        .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие размеры нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import FilterTabletModal from "@/components/extra/FilterModal.vue";
export default {
  name: "SizeFilter",
  components: { FilterTabletModal, Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    currentSizeArr: [],
    isShowSizeList: false,
    init: false
  }),
  computed: {
    sizeArr () {
      return this.$store.state.selects?.selects?.size
    },
    isActiveFilter () {
      return this.$store.state.selects?.selects?.size
        ? (this.currentSizeArr.length === this.$store.state.selects?.selects?.size.length)
        && this.currentSizeArr.every(el => this.$store.state.selects?.selects?.size.includes(el))
        : false
    }
  },
  watch: {
    currentSizeArr (nV) {
      if (nV.length) {
        this.setFindParam()
        this.setUrlParam()
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
      }
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) this.currentSizeArr = []
      }
    },
    '$store.state.filters.findObj.sizes': {
      handler (nV) {
        if (nV) {
          const newSizeArr = this.currentSizeArr.filter(currentSizeStr => nV[ '$in' ].includes(currentSizeStr))
          if (!(JSON.stringify(this.currentSizeArr) === JSON.stringify(newSizeArr))) this.currentSizeArr = newSizeArr
        } else this.currentSizeArr = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'sizes',
        value: { $in: this.currentSizeArr.concat() }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'sizes' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'd-size',
        value: this.currentSizeArr.reduce((acc, size, idx) => acc += idx === 0
          ? '--' + size.toLowerCase().replaceAll(' ', '-') + '--'
          : '' + size.toLowerCase().replaceAll(' ', '-') + '--', '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'd-size' })
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
      this.FETCH_SELECTS()
    },
    acceptParameters () {
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
      setTimeout(() => this.isShowSizeList = false, 100)
    },
    getSize () {
      const sizesArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.size.forEach(sizeStr => {
          if (this.$route.path.includes('/--' + sizeStr.toLowerCase() + '--') || this.$route.path.includes('--' + sizeStr.toLowerCase() + '--')) {
            sizesArr.push(sizeStr)
          }
        })
        if (!sizesArr.length) sizesArr.push(...this.currentSizeArr)
        else this.currentSizeArr = sizesArr
        if (sizesArr.length) this.SET_FIND_PARAM({ param: 'sizes', value: sizesArr })
      }, 1000)
    },
    toggleSize (sizeStr) {
      this.currentSizeArr.includes(sizeStr)
        ? this.currentSizeArr.splice(this.currentSizeArr.indexOf(sizeStr), 1)
        : this.currentSizeArr.push(sizeStr)
    }
  },
  created () {
    if (this.$route.path.includes('catalog')) this.getSize()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_size {
    width: 106px;

    .dropdown {
      max-height: 330px;

      .filter__options-wrapper {
        max-height: 213px;

        .filter__options-item-size {
          padding-left: 12px;
        }
      }
    }
  }

</style>
