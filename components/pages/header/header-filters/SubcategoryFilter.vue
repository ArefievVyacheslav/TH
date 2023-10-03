<template lang="pug">
  div
    .filter__item.filter__item_subcategory.pos-rel.df.jcsb.aic.cp(
      @click="isShowSubCategoryList = !isShowSubCategoryList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
    )
      .filter__name.filter__name_gender(:class="{ disabled }") Категория
      .number-selected-options.pos-abs.ml78px(v-if="currentSubCategoryArr.length") {{ currentSubCategoryArr.length }}
      IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
        :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowSubCategoryList && !disabled }"
      )
      .filter__dropdown.pos-abs(v-if="isShowSubCategoryList && $mq === 'lg' && !disabled")
        DropDown(@close="isShowSubCategoryList = false; acceptParameters()" :styles="{ padding: '10px 20px 20px 20px', 'width': '263px' }")
          .df.aic
            //IconTooltip#tooltip-dropdown-language.ml6px
            //b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            //  | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            //  nuxt-link.tooltip-link(to="/lk") себя в профиле

          .df.pos-rel.mt14px(@click.stop)
            input.menu-search.menu-search_filter(v-model="query" placeholder="Поиск")
            IconSearchMenuLinks.pos-abs.t6px.l8px(color="#B3B3B3")
            div(v-if="query" @click="query = ''")
              IconCloseSearch.pos-abs.t7px.r8px

          .dropdown-choice-count.mt12px.mb10px(v-if="query && !subcategoryOptionsSearch.length") Ничего не найдено
          .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentSubCategoryArr.length }}

          .filter__options-wrapper(v-if="!query")
            .filter__letter.mb12px(v-for="letterKey,idx in Object.keys(subcategoryOptions)" :key="letterKey") {{ letterKey }}
              .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
                v-for="subCatObj,idx in subcategoryOptions[ letterKey ]" :key="idx" @click.stop="toggleSubCategory(subCatObj)"
                :class="{ 'filter__options-item_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }"
              )
                .df.aic
                  Checkbox(:is-checked="currentSubCategoryArrNameRus.includes(subCatObj.subcategory)" styles="top: 4px; left: 3px;")
                  span.gender__name.ml8px(:class="{ 'gender__name_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }") {{ subCatObj.subcategory }}

            .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter && $store.state.selects.selects?.subCat.length") Чтобы увидеть другие категории нажмите «Сбросить»

          .filter__options-wrapper(v-else)
            .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
              v-for="subCatObj in subcategoryOptionsSearch" :key="subCatObj.subcategory" @click.stop="toggleSubCategory(subCatObj)"
              :class="{ 'filter__options-item_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }"
            )
              .df.aic
                Checkbox(:is-checked="currentSubCategoryArrNameRus.includes(subCatObj.subcategory)" styles="top: 4px; left: 3px;")
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }") {{ subCatObj.subcategory }}

          .df.g10
            button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
              v-if="currentSubCategoryArr.length" @click.stop="currentSubCategoryArr = []; resetFilter()"
            ) Сбросить
            button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="isShowSubCategoryList = false; acceptParameters()") Готово

    FilterTabletModal(
      v-if="isShowSubCategoryList && $mq !== 'lg' && !disabled" :reset="!!currentSubCategoryArr.length"
      @close="isShowSubCategoryList = false" @reset="currentSubCategoryArr = []; resetFilter()" @accept="acceptParameters"
    )
      .df.pos-rel.mt28px(@click.stop)
        input.menu-search.menu-search_filter.menu-search_filter-tablet(v-model="query" placeholder="Поиск")
        IconSearchMenuLinks.pos-abs.t10px.l8px(color="#B3B3B3")
        div(v-if="query" @click="query = ''")
          IconCloseSearch.pos-abs.t10px.r25px

      .dropdown-choice-count.mt12px.mb10px(v-if="query && !subcategoryOptionsSearch.length") Ничего не найдено
      .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentSubCategoryArr.length }}

      .filter__options-wrapper
        .filter__options-item-tablet.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
          v-for="subCatObj in subcategoryOptionsSearch" :key="subCatObj.subcategory" @click.stop="toggleSubCategory(subCatObj)"
          :class="{ 'filter__options-item_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }"
        )
          .df.aic
            Checkbox(:is-checked="currentSubCategoryArrNameRus.includes(subCatObj.subcategory)" styles="top: 4px; left: 3px;")
            span.gender__name-tablet.ml10px(:class="{ 'gender__name_active': currentSubCategoryArrNameRus.includes(subCatObj.subcategory) }") {{ subCatObj.subcategory }}

        .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter && $store.state.selects.selects?.subCat.length") Чтобы увидеть другие категории нажмите «Сбросить»

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";
import FilterTabletModal from "@/components/extra/FilterModal.vue";
export default {
  name: "subcategoryFilter",
  components: { FilterTabletModal, IconCloseSearch, IconSearchMenuLinks, Checkbox, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentSubCategoryArr: [],
    isShowSubCategoryList: false,
    isDisabled: true,
    init: false
  }),
  computed: {
    subcategoryOptions () {
      const subCat = this.$store.state.selects.selects.subCat.concat()
      const collator = new Intl.Collator('ru')
      const subCatSort = subCat.sort((x, y) => collator.compare(x.subcategory, y.subcategory))
      return subCatSort.reduce((acc, subCatObj) => {
        const firstLetter = subCatObj.subcategory[ 0 ]
        if (!acc[firstLetter]) acc[firstLetter] = [ subCatObj ]
        else acc[firstLetter].push(subCatObj)
        return acc
      }, {})
    },
    subcategoryOptionsSearch () {
      return this.query
        ? this.$store.state.selects.selects.subCat
          .filter(subCatObj => subCatObj.subcategory.toLowerCase().includes(this.query.toLowerCase()))
          .sort((subCat1, subCat2) => subCat1[ 'subcategory' ] > subCat2[ 'subcategory' ] ? 1 : -1)
        : this.$store.state.selects.selects.subCat.concat()
          .sort((subCat1, subCat2) => subCat1[ 'subcategory' ] > subCat2[ 'subcategory' ] ? 1 : -1)
    },
    currentSubCategoryArrNameRus () {
      return this.currentSubCategoryArr.map(currentSubCatObj => currentSubCatObj.subcategory)
    },
    currentSubCategoryArrNameEn () {
      return this.currentSubCategoryArr.map(currentSubCatObj => currentSubCatObj?.subcategory_t.toLowerCase().replaceAll(' ', '-'))
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.subCat
        ? (this.currentSubCategoryArr.length === this.$store.state.selects.selects.subCat.length)
          && this.currentSubCategoryArr.map(subCatObj => subCatObj.subcategory)
            .every(el => this.$store.state.selects.selects.subCat.map(subCatObj => subCatObj.subcategory).includes(el))
        : false
    }
  },
  watch: {
    currentSubCategoryArr (nV) {
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
        if (this.init) this.currentSubCategoryArr = []
      }
    },
    '$store.state.filters.findObj.subcategory': {
      handler (nV) {
        if (nV) {
          const newSubCategoryArr = this.currentSubCategoryArr.filter(currentSubCatObj => nV[ '$in' ].includes(currentSubCatObj.subcategory))
          if (!(JSON.stringify(this.currentSubCategoryArr) === JSON.stringify(newSubCategoryArr))) this.currentSubCategoryArr = newSubCategoryArr
        } else this.currentSubCategoryArr = []
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
        param: 'subcategory',
        value: { $in: this.currentSubCategoryArrNameRus }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'subcategory' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'b-subcategory',
        value: this.currentSubCategoryArrNameEn.reduce((acc, subCatT, idx) => acc += idx === 0
          ? '--' + subCatT + '--'
          : '' + subCatT + '--', '')
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'b-subcategory' })
    },
    resetFilter () {
      this.query = ''
      this.unsetFindParam()
      this.unsetUrlParam()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
      this.FETCH_SELECTS()
    },
    acceptParameters () {
      this.FETCH_SELECTS()
      this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
    },
    async getSubCategory () {
      const route = this.$route.path
      const subCatArr = []
      await setTimeout(() => {
        this.$store.state.selects?.selects?.subCat.forEach(subCatObj => {
          if (route.includes('--' + subCatObj?.subcategory_t.replaceAll('ey', 'ej').replaceAll('ju', 'yu').toLowerCase() + '--'))
            subCatArr.push(subCatObj)
        })
        if (!subCatArr.length) subCatArr.push(...this.currentSubCategoryArr)
        else this.currentSubCategoryArr = subCatArr
        if (subCatArr.length) this.SET_FIND_PARAM({ param: 'subcategory', value: subCatArr })
      }, 1000)
    },
    toggleSubCategory (subCatObj) {
      this.currentSubCategoryArr.map(currentSubCatObj => currentSubCatObj.subcategory).includes(subCatObj.subcategory)
        ? this.currentSubCategoryArr.splice(this.currentSubCategoryArr.map(currentSubCatObj => currentSubCatObj.subcategory).indexOf(subCatObj.subcategory), 1)
        : this.currentSubCategoryArr.push(subCatObj)
    }
  },
  created () {
    if (this.$route.path.includes('catalog')) this.getSubCategory()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .disabled {
    color: #B3B3B3 !important;
  }

  .dropdown-choice-count {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #B3B3B3;
  }

  .filter__item_subcategory {
    width: 124px;
  }

  .filter__options-wrapper {
    height: 267px;
    overflow-x: auto;
  }

  .filter__letter {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #B3B3B3;

    .filter__options-item-subcategory {
      width: 235px;
      padding-left: 12px;
    }
  }

  .filter__dropdown-allow {
    padding: 12px 24px;
    background: #2D78EA;
    border-radius: 10px;
  }

  .filter__dropdown-btn {
    max-height: 41px;
    border-radius: 10px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    border: none;
  }

  .filter__dropdown-btn-agree {
    width: 100%;
    padding: 12px 0;
    color: #FFFFFF;
    background: #2D78EA;
  }

  .filter__dropdown-btn-disagree {
    width: 100%;
    padding: 12px 0;
    color: #616161;
    background: #F6F7F9;
  }

  @media (max-width: 1150px) {
    .menu-search_filter-tablet {
      width: 100% !important;
      height: 25px !important;
      margin-right: 15px;
    }

    .filter__options-wrapper {
      height: 40vh !important;
      overflow-x: auto;
    }
  }

  @media (max-width: 370px) {
    .filter__item_subcategory {
      max-width: 114px !important;
    }
  }

</style>
