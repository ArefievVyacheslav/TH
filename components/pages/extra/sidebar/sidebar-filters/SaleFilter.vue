<template lang="pug">
  .extra-filters__filter
    .df.jcsb.aic.cp(@click="isShowSaleSizeFilter = !isShowSaleSizeFilter")
      span.extra-filters__filter-name Размер скидки
      .df.aic
        span.extra-filters__filter-reset.mr25px(v-if="currentSaleSize.length > 0" @click.stop="currentSaleSize = []") Сбросить
        IconArrowDownGreyMedium.mt-2px(
          :color="`${ isShowSaleSizeFilter ? '#616161' : '#B3B3B3' }`" :class="{ 'menu-links__icon-arrow-down-active': isShowSaleSizeFilter }"
        )

    .extra-filters__choices(v-if="isShowSaleSizeFilter")
      .dropdown-choice-count.mt12px.mb10px Выбрано: {{ currentSaleSize.length }}
      .extra-filters__options-wrapper
        .filter__options-item.filter__options-item-subcategory.df.aic.cp(
          v-for="saleObj,idx in saleSizeOptions" :key="saleObj.text" @click="toggleSaleSize(saleObj)"
          :class="{ 'filter__options-item_active': currentSaleSize.includes(saleObj), 'mt12px mt7px': idx !== 0 }"
        )
          .df.aic.pl10px
            Checkbox(:is-checked="currentSaleSize.includes(saleObj)" styles="top: 4px; left: 3px;")
            span.gender__name.ml8px {{ saleObj.text }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";

export default {
  name: "SaleSizeFilter",
  components: { Checkbox, IconArrowDownGreyMedium },
  props: [ 'reset' ],
  data: () => ({
    saleSizeOptions: [
      { text: '10% и более', url: 'discount-10', value: { $gt: 9 } },
      { text: '20% и более', url: 'discount-20', value: { $gt: 19 } },
      { text: '30% и более', url: 'discount-30', value: { $gt: 29 } },
      { text: '40% и более', url: 'discount-40', value: { $gt: 39 } },
      { text: '50% и более', url: 'discount-50', value: { $gt: 49 } },
      { text: '60% и более', url: 'discount-60', value: { $gt: 59 } },
      { text: '70% и более', url: 'discount-70', value: { $gt: 69 } },
      { text: '80% и более', url: 'discount-80', value: { $gt: 79 } },
      { text: '90% и более', url: 'discount-90', value: { $gt: 89 } }
    ],
    currentSaleSize: [],
    isShowSaleSizeFilter: false,
    isChangeSaleSize: false,
    init: false
  }),
  watch: {
    isShowSaleSizeFilter (nV) {
      nV
        ? this.$emit('show-filter')
        : this.FETCH_SELECTS()
    },
    currentSaleSize (nV) {
      if (nV.length) {
        this.setUrlParam()
        this.setFindParam()
        this.isChangeSaleSize = true
      } else if (this.init) {
        this.unsetUrlParam()
        this.unsetFindParam()
        this.isChangeSaleSize = false
      }
    },
    reset (nV) {
      if (nV) this.currentSaleSize = []
    },
    isChangeSaleSize (nV) {
      this.$emit('is-sale-size', nV ? 1 : 0)
    },
    '$store.state.filters.collection': {
      handler () {
        if (this.init) {
          this.currentSaleSize = []
          this.isChangeSaleSize = false
        }
      }
    },
    '$store.state.filters.findObj.sale': {
      handler (nV) {
        if (!nV) this.currentSaleSize = []
      }
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    hideFilters () {
      this.isShowSaleSizeFilter = false
    },
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'sale',
        value: !this.currentSaleSize.length ? true : this.currentSaleSize[0].value
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'sale' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'g-sale',
        value: this.currentSaleSize.length ? this.currentSaleSize[0].url : ''
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'g-sale' })
    },
    getSaleSize () {
      let sale
      const pathArr = this.$route.path.split('/')
      pathArr.forEach(pathStr => {
        if (pathStr.includes('discount')) sale = +pathStr.replace('discount-', '') - 1
      })
      if (sale) {
        this.saleSizeOptions.forEach(sizeObj => {
          if (sale <= sizeObj.value.$gt) this.currentSaleSize.push(sizeObj)
        })
        this.isChangeSaleSize = true
        this.SET_FIND_PARAM({ param: 'sale', value: { $gt: sale } })
      }
    },
    toggleSaleSize (saleObj) {
      if (saleObj.value.$gt <= this.$store.state.selects.selects.sale[1]) {
        this.currentSaleSize = []
        this.saleSizeOptions.forEach(saleSizeObj => {
          if (saleObj.value['$gt'] <= saleSizeObj.value['$gt']) {
            if (!this.currentSaleSize.includes(saleSizeObj)) this.currentSaleSize.push(saleSizeObj)
          }
        })
      } else this.SET_NOTIFICATION({
        text: 'Товаров с таким размером скидки - нету. Установите меньший процент скидки',
        type: 'warning', autoHideDelay: 5
      })
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getSaleSize(), 1200)
  }
};
</script>

<style lang="scss">
  .extra-filters__filter {
    .extra-filters__filter-reset {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: right;
      letter-spacing: 0.02em;
      color: #B3B3B3;
    }

    .extra-filters__choices {

      .extra-filters__options-wrapper {
        max-height: 261px;
        padding-right: 8px;
        overflow-y: auto;

        .filter__options-item {
          height: 32px;
          font-family: 'Inter',serif;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.02em;
          color: #616161;
        }

        .filter__options-item:hover {
          background: #F6F7F9;
          border-radius: 6px;
        }
        .filter__options-item:hover .gender__name {
          color: #2D78EA;
        }
        .filter__options-item_active:hover .gender__name {
          color: #6BA0F0;
        }
      }
    }

    .filter__options-item:hover .checkbox {
      border: 2px solid #6BA0F0;
    }

    .filter__options-item_active:hover .checkbox {
      border: 2px solid #6BA0F0;
      background: #6BA0F0;
    }
  }

</style>
