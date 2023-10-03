<template lang="pug">
  div
    .filter__item.filter__item_brand.pos-rel.df.jcsb.aic.cp(
      @click="isShowBrandList = !isShowBrandList" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
    )
      .filter__name.filter__name_gender(:class="{ disabled }") Бренд
      .number-selected-options.pos-abs.ml50px(v-if="currentBrandArr.length") {{ currentBrandArr.length }}
      IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
        :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowBrandList && !disabled }"
      )
      .filter__dropdown.pos-abs(v-if="isShowBrandList && $mq === 'lg' && !disabled")
        DropDown(@close="isShowBrandList = false; acceptParameters()" :styles="{ padding: '10px 20px 20px 20px', 'width': '263px' }")
          .df.aic
            //IconTooltip#tooltip-dropdown-language.ml6px
            //b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            //  | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            //  nuxt-link.tooltip-link(to="/lk") себя в профиле

          .df.pos-rel.mt14px(@click.stop)
            input.menu-search.menu-search_filter(v-model.trim="query" placeholder="Поиск")
            IconSearchMenuLinks.pos-abs.t6px.l8px(color="#B3B3B3")
            div(v-if="query" @click="query = ''")
              IconCloseSearch.pos-abs.t7px.r8px

          .dropdown-choice-count.mt12px.mb10px(v-if="!query && brandOptionsSearch.length") Выбрано: {{ currentBrandArr.length }}

          .filter__options-wrapper(v-if="!query")
            .filter__letter.mb12px(v-for="letterKey,idx in Object.keys(brandOptions)" :key="letterKey") {{ letterKey }}
              .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.cp(
                v-for="brandStr,idx in brandOptions[ letterKey ]" :key="idx" @click.stop="toggleBrand(brandStr)"
                :class="{ 'filter__options-item_active': currentBrandArr.includes(brandStr) }"
              )
                .df.aic
                  Checkbox(:is-checked="currentBrandArr.includes(brandStr)" styles="top: 4px; left: 3px;") {{ brandStr }}
                  span.gender__name.ml8px(:class="{ 'gender__name_active': currentBrandArr.includes(brandStr) }") {{ brandStr }}

            .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие бренды нажмите «Сбросить»

          .filter__options-wrapper(v-else :class="{ mt37px: query }")
            .filter__options-item.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
              v-for="brandStr in brandOptionsSearch" :key="brandStr" @click.stop="toggleBrand(brandStr)"
              :class="{ 'filter__options-item_active': currentBrandArr.includes(brandStr) }"
            )
              .df.aic
                Checkbox(:is-checked="currentBrandArr.includes(brandStr)" styles="top: 4px; left: 3px;")
                span.gender__name.ml8px(:class="{ 'gender__name_active': currentBrandArr.includes(brandStr) }") {{ brandStr }}

            .brand-offer.df.fdc(v-if="query && !brandOptionsSearch.length")
              .dropdown-choice-count.mt12px.mb10px.tac Ничего не найдено
              .brand-offer-text.tac(@click.stop v-b-modal.add-brand-modal) Предложить добавить бренд

          .df.g10
            button.filter__dropdown-btn.filter__dropdown-btn-disagree.df.jcc.aic.mt12px.cp(
              v-if="currentBrandArr.length" @click.stop="currentBrandArr = []; resetFilter()"
            ) Сбросить
            button.filter__dropdown-btn.filter__dropdown-btn-agree.df.jcc.aic.mt12px.cp(@click.stop="acceptParameters") Готово

      FilterTabletModal(
        v-if="isShowBrandList && $mq !== 'lg' && !disabled" :reset="!!currentBrandArr.length"
        @close="isShowBrandList = false" @reset="currentBrandArr = []; resetFilter()" @accept="acceptParameters"
      )
        .df.pos-rel.mt28px(@click.stop)
          input.menu-search.menu-search_filter.menu-search_filter-tablet(v-model="query" placeholder="Поиск")
          IconSearchMenuLinks.pos-abs.t10px.l8px(color="#B3B3B3")
          div(v-if="query" @click="query = ''")
            IconCloseSearch.pos-abs.t10px.r25px

        .dropdown-choice-count.mt12px.mb10px(v-if="query && !brandOptionsSearch.length") Ничего не найдено
        .dropdown-choice-count.mt12px.mb10px(v-else) Выбрано: {{ currentBrandArr.length }}

        .brand-offer.df.fdc(v-if="query && !brandOptionsSearch.length")
          .dropdown-choice-count.mt12px.mb10px.tac Ничего не найдено
          .brand-offer-text.tac(@click.stop v-b-modal.add-brand-modal) Предложить добавить бренд

        .filter__options-wrapper
          .filter__options-item-tablet.filter__options-item-subcategory.df.aic.mt7px.pl10px.cp(
            v-for="brandStr in brandOptionsSearch" :key="brandStr" @click.stop="toggleBrand(brandStr)"
            :class="{ 'filter__options-item_active': currentBrandArr.includes(brandStr) }"
          )
            .df.aic
              Checkbox(:is-checked="currentBrandArr.includes(brandStr)" styles="top: 4px; left: 3px;")
              span.gender__name-tablet.ml10px(:class="{ 'gender__name_active': currentBrandArr.includes(brandStr) }") {{ brandStr }}

          .dropdown-choice-count.mt12px.mb10px(v-if="isActiveFilter") Чтобы увидеть другие бренды нажмите «Сбросить»

    Modal(@modal-ok="addBrands" ident="add-brand-modal" title="Добавление бренда" okTitle="Предложить" cancelTitle="Отменить")
      template(#modal-desc)
        span.modal-desc Если вы не нашли бренд, который искали, то можете предложить добавить его.
        input.menu-search.modal-brand-search(v-model="userBrandsStr" placeholder="Названия брендов через ," @click.stop :class="{ mt30px: $mq !== 'sm', mt20px: $mq === 'sm' }")

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue";
import IconCloseSearch from "@/components/ui/icons/IconCloseSearch.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
import Modal from "@/components/extra/Modal.vue";
import FilterTabletModal from "@/components/extra/FilterModal.vue";
export default {
  name: "BrandFilter",
  components: { FilterTabletModal, Modal, Checkbox, IconCloseSearch, IconSearchMenuLinks, IconTooltip, DropDown, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    query: '',
    currentBrandArr: [],
    userBrandsStr: '',
    isShowBrandList: false,
    isDisabled: true,
    isDisabledAddFilter: false,
    init: false
  }),
  computed: {
    brandOptions () {
      const brand = this.$store.state.selects.selects.brand.concat().filter(str => !str.includes('&') || (str.includes('&') && str.match(/[^&]\s&\s[^&]/)))
      const brandSort = brand.sort()
      return brandSort.reduce((acc, brandStr) => {
        const firstLetter = brandStr[ 0 ]
        if (!acc[ firstLetter ]) acc[ firstLetter ] = [ brandStr ]
        else acc[ firstLetter ].push(brandStr)
        return acc
      }, {})
    },
    brandOptionsSearch () {
      return this.query
        ? this.$store.state.selects.selects.brand
          .filter(brandStr => brandStr.toLowerCase().includes(this.query.toLowerCase()))
          .sort((brandStr1, brandStr2) => brandStr1 > brandStr2 ? 1 : -1)
        : this.$store.state.selects.selects.brand.concat()
          .sort((brandStr1, brandStr2) => brandStr1 > brandStr2 ? 1 : -1)
    },
    isActiveFilter () {
      return this.$store.state.selects.selects?.brand
        ? (this.currentBrandArr.length === this.$store.state.selects.selects.brand.length)
        && this.currentBrandArr.every(el => this.$store.state.selects.selects.brand.includes(el))
        : false
    },
    userBrandsArr () {
      return this.userBrandsStr.split(',')
        .map(brandStr => brandStr.replaceAll(' ', '').toLowerCase())
        .filter(brandStr => brandStr)
    }
  },
  watch: {
    currentBrandArr (nV) {
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
        if (this.init) this.currentBrandArr = []
      }
    },
    '$store.state.filters.findObj.brand': {
      handler (nV) {
        if (nV) {
          const newBrandArr = this.currentBrandArr.filter(currentBrandStr => nV[ '$in' ].includes(currentBrandStr))
          if (!(JSON.stringify(this.currentBrandArr) === JSON.stringify(newBrandArr))) this.currentBrandArr = newBrandArr
        } else this.currentBrandArr = []
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
        param: 'brand',
        value: { $in: this.currentBrandArr.concat() }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'brand' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'c-brand',
        value: this.currentBrandArr.reduce((acc, brand, idx) => acc += idx === 0
          ? '--' + brand.toLowerCase().replaceAll(' ', '-') + '--'
          : '' + brand.toLowerCase().replaceAll(' ', '-') + '--', ''
        )
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'c-brand' })
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
      setTimeout(() => this.isShowBrandList = false, 100)
    },
    getBrand () {
      const route = this.$route.path
      const brandArr = []
      setTimeout(() => {
        this.$store.state.selects?.selects?.brand.forEach(brandStr => {
          if (route.replaceAll('and', '&').includes(brandStr.toLowerCase().replaceAll(' ', '-').replaceAll('and', '&'))) {
            brandArr.push(brandStr)
          }
        })
        if (!brandArr.length) brandArr.push(...this.currentBrandArr)
        else this.currentBrandArr = brandArr
        if (brandArr.length) this.SET_FIND_PARAM({ param: 'brand', value: brandArr })
      }, 1000)
    },
    toggleBrand (brandStr) {
      this.currentBrandArr.includes(brandStr)
        ? this.currentBrandArr.splice(this.currentBrandArr.indexOf(brandStr), 1)
        : this.currentBrandArr.push(brandStr)
    },
    async addBrands () {
      if (this.isDisabledAddFilter) this.SET_NOTIFICATION({
        text: 'Возможность добавить появится через минуту',
        type: 'warning', autoHideDelay: 5
      })
      else if (this.userBrandsArr.length) {
        try {
          this.isDisabledAddFilter = true
          const { data } = await this.$axios.put('service', { userBrands: this.userBrandsArr })
          this.SET_NOTIFICATION({
            text: data.msg,
            type: 'success', autoHideDelay: 5
          })
          this.query = ''
          setTimeout(() => this.isDisabledAddFilter = false, 60 * 1000)
        } catch (e) {}
      }
    }
  },
  created () {
    if (this.$route.path.includes('catalog')) this.getBrand()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_brand {
    width: 94px;

    .brand-offer-text {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #2D78EA;
    }
  }

  .modal-brand-search {
    width: 100% !important;
    max-width: 331px !important;
    padding: 14px !important;
    border-radius: 10px !important;
    background: #F6F7F9 !important;
  }

</style>
