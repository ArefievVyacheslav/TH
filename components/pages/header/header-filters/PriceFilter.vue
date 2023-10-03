<template lang="pug">
  div
    .filter__item.filter__item_price.pos-rel(v-if="$mq === 'lg'" @click="editMode = true; isShowPriceFilter = !isShowPriceFilter" :class="{ 'cnd': disabled }")
      .filter__item-price.pos-abs(:class="{ 'grey': disabled }") Цена, ₽
      .filter__item-price-wrapper.pos-abs.df
        p.filter__item-start-price от
        input.filter__item-price-field(v-model="startPrice" :disabled="disabled" :class="{ 'cnd': disabled }")
        p.filter__item-end-price до
        input.filter__item-price-field(v-model="endPrice" :disabled="disabled" :class="{ 'cnd': disabled }")

    .filter__item.filter__item_size.pos-rel.df.jcsb.aic.cp(v-if="$mq !== 'lg'" @click="isShowPriceFilter = !isShowPriceFilter" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }")
      .filter__name.filter__name_gender.mt-4px.mt-1px(:class="{ disabled }") Цены
      .number-selected-options.pos-abs.ml47px(v-if="priceArr.length && editMode") 1
      IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(:disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowPriceFilter && !disabled }")

    FilterTabletModal(
      v-if="isShowPriceFilter && $mq !== 'lg' && !disabled" filter-name="Цена" :reset="editMode"
      @close="handlerClose" @reset="resetPrice" @accept="handlerClose"
    )
      .df.aic.g12.mr16px.pt16px
        .pos-rel
          p.filter__item-start-price_tablet от
          input.filter__item-price-field_tablet(v-model="startPrice" @click="editMode = true" :disabled="disabled" :class="{ 'cnd': disabled }")

        .pos-rel
          p.filter__item-end-price_tablet до
          input.filter__item-price-field_tablet(v-model="endPrice" @click="editMode = true" :disabled="disabled" :class="{ 'cnd': disabled }")

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import FilterTabletModal from "@/components/extra/FilterModal.vue";

export default {
  name: "PriceFilter",
  components: { FilterTabletModal, IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({
    startPrice: 0,
    endPrice: 0,
    editMode: false,
    isShowPriceFilter: false,
    init: false
  }),
  computed: {
    priceArr () {
      return [ this.startPrice, this.endPrice ]
    }
  },
  watch: {
    startPrice (nV) {
      if (this.init) {
        if (nV) {
          const priceArr = nV.toString().split('')
          if (priceArr[0] === '0') priceArr.splice(0, 1)
          this.startPrice = +priceArr.filter(symbol => !isNaN(symbol)).join('').substring(0, 6)
        }
      }
    },
    endPrice (nV) {
      if (this.init) {
        if (nV) {
          nV.toString()
          const priceArr = nV.toString().split('')
          if (priceArr[0] === '0') priceArr.splice(0, 1)
          this.endPrice = +priceArr.filter(symbol => !isNaN(symbol)).join('').substring(0, 6)
        }
      }
    },
    priceArr (nV) {
      if ((this.$store.state.selects.selects.price[0] && this.$store.state.selects.selects.price[0] !== nV[0]
        || this.$store.state.selects.selects.price[1] && this.$store.state.selects.selects.price[1] !== nV[1]) && this.editMode) this.fetchEntriesDebounced()
      if (this.$store.state.selects.selects.price.every(price => !price) && this.init)
        this.SET_NOTIFICATION({ text: 'Товаров по этим фильтрам нету, уберите последний фильтр или обновите страницу', type: 'danger', autoHideDelay: 7 })
    },
    editMode (nV) {
      if (nV === true) setTimeout(() => {
        this.editMode = false
        this.SET_NOTIFICATION({ text: 'Если мало вариантов в фильтрах - измените диапазон цены', type: 'info', autoHideDelay: 5 })
      }, 15 * 1000)
    },
    '$store.state.selects.selects.price': {
      handler () {
        if (this.init && !this.editMode) setTimeout(() => [ this.startPrice, this.endPrice ] = this.$store.state.selects.selects.price, 1000)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(async () => {
        if (!this.endPrice && !this.editMode) this.endPrice = 999999
        if (this.startPrice && this.endPrice) {
          if (this.startPrice > this.endPrice) {
            this.endPrice = 999999
            this.SET_NOTIFICATION({ text: 'Максимальная цена меньше минимальной, мы установим максимальное значение', type: 'danger', autoHideDelay: 5 })
          }
          if (!this.endPrice) this.endPrice = 999999
          await this.setPrice()
        }
        if (!this.startPrice && !this.endPrice) this.resetFilter()
      }, 5000)
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'price',
        value: { $in: [ this.startPrice, this.endPrice ] }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'price' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'e-price',
        value: `from-${ this.startPrice }-to-${ this.endPrice }`
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'e-price' })
    },
    async setPrice () {
      this.setFindParam()
      this.setUrlParam()
      await this.FETCH_SELECTS()
    },
    resetPrice () {
      this.editMode = false
      this.startPrice = 0
      this.endPrice = 0
    },
    resetFilter () {
      this.unsetFindParam()
      this.unsetUrlParam()
      this.FETCH_SELECTS()
    },
    getPrice () {
      const priceArr = []
      setTimeout(() => {
        const pathArr = this.$route.path.split('/')
        pathArr.forEach(pathStr => {
          if (pathStr.includes('from-') && pathStr.includes('-to-')) {
            priceArr.push(...pathStr.replace('from-', '').split('-to-'))
          }
        })
        if (priceArr.length) [ this.startPrice, this.endPrice ] = priceArr
        else [ this.startPrice, this.endPrice ] = this.$store.state.selects.selects.price
      }, 1500)
    },
    handlerClose () {
      this.isShowPriceFilter = false
      if (!!this.startPrice === false) this.startPrice = 1
    }
  },
  created () {
    if (this.$route.path.includes('catalog')) this.getPrice()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item_price:after {
    display: none;
  }

  .filter__item_price {
    height: 23px;
    width: 185px;

    .filter__item-price {
      top: 13px;
      left: 16px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .filter__item-price-wrapper {
      top: 15px;

      .filter__item-start-price,
      .filter__item-end-price {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #B3B3B3;
      }

      .filter__item-price-field {
        max-width: 67px;
        max-height: 15px;
        margin-top: 14px;
        margin-left: 6px;
        border: none;
        outline: none;
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #303030;
      }
      .filter__item-price-field:disabled {
        background-color: white;
      }
    }

    .grey,
    .filter__item-start-price {
      color: #B3B3B3;
    }
  }

  @media (max-width: 1150px) {
    .filter__item-start-price_tablet,
    .filter__item-end-price_tablet {
      position: absolute;
      top: 0;
      left: 14px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #A3AAB5;
    }
    .filter__item-price-field_tablet {
      width: 316px;
      max-width: 316px !important;
      height: 42px !important;
      padding-left: 40px;
      background: #F6F7F9;
      border-radius: 10px;
      border: none;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #2E333A;
      outline: none;
    }
  }

  @media (max-width: 767px) {
    .filter__item-price-field_tablet {
      width: calc((100vw / 2) - 65px);
      max-width: calc((100vw / 2) - 65px) !important;
      height: 42px !important;
      padding-left: 40px;
      background: #F6F7F9;
      border-radius: 10px;
      border: none;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.02em;
      color: #2E333A;
      outline: none;
    }
  }

</style>
