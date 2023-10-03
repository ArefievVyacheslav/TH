<template lang="pug">
  div
    .sort-wrapper(v-if="$mq === 'lg'")
      .container.df.jcsb
        .sort-line
          .df
            span.sort-line__text.sort-line__text_light-grey.mr16px Сортировать по:
            .sort-line__text.sort-line__text_dark-grey.cp(
              v-for="sortKey,idx in Object.keys(sort)" :key="sortKey" @click="setSortParam(sortKey)"
              :class="{ ml18px: idx !== 0, 'sort-line__text_active-grey': sortKey in currentSort }"
            ) {{ sort[ sortKey ][ 'name' ] }}
              IconSortArrow.sort-line__icon-arrow.sort-line__icon-arrow-down.ml6px(v-if="sortKey in currentSort")

        .show-line
        .df
          span.sort-line__text.sort-line__text_light-grey.mr16px Показывать по:
          .sort-line__text.sort-line__text_dark-grey.cp(
            v-for="showCount,idx in show" :key="showCount" @click="setShowCount(showCount)"
            :class="{ ml12px: idx !== 0, 'sort-line__text_active-grey': showCount === currentShow }"
          ) {{ showCount }}

    .sort__tablet-wrapper.df.jcc.aic(v-if="$mq !== 'lg'" @click="isShowSortList = !isShowSortList")
      .sort-header__tablet {{ sort[ Object.keys(currentSort)[ 0 ] ]?.nameTablet || 'Сортировка' }}

    FilterTabletModal(v-if="isShowSortList && $mq !== 'lg'" filter-name="Сортировка" @close="isShowSortList = false")
      .filter__options-item-tablet(
        v-for="sortKey,idx in Object.keys(sort)" :key="idx" @click.stop="setSortParam(sortKey)"
        :class="{ 'filter__options-item_active': currentSort[ sortKey ] === 1 || currentSort[ sortKey ] === -1, mt12px: idx === 0, mt3px: idx !== 0 }"
      )
        .df.aic
          RadioButton(:label="sortKey" :is-checked="currentSort[ sortKey ] === 1 || currentSort[ sortKey ] === -1" height="24")
          span.gender__name-tablet.ml8px(:class="{ 'gender__name_active-tablet': currentSort[ sortKey ] === 1 || currentSort[ sortKey ] === -1 }") {{ sort[ sortKey ].name }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconSortArrow from '@/components/ui/icons/IconSortArrow.vue'
import FilterTabletModal from '@/components/extra/FilterModal.vue'
import RadioButton from '@/components/ui/blocks/RadioButton.vue'
export default {
  name: "HeaderSortLine",
  components: { RadioButton, FilterTabletModal, IconSortArrow },
  data: () => ({
    sort: {
      like: { name: 'Рейтингу', nameTablet: 'По рейтингу', url: '' },
      sale: { name: 'Скидке', nameTablet: 'По размеру скидки', url: 'sort-sale' },
      price: { name: 'Цене', nameTablet: 'По возрастанию цены', url: 'sort-price' },
      create: { name: 'Дате добавления', nameTablet: 'По размеру скидки', url: 'sort-create' },
      deliveryPrice: { name: 'Бесплатная доставка', nameTablet: 'По стоимости доставки', url: 'sort-delivery' }
    },
    show: [ 60, 120, 240 ],
    currentSort: { like: -1 },
    currentShow: 60,
    isShowSortList: false
  }),
  watch: {
    currentSort: {
      handler (nV) {
        this.SET_SORT_PARAM(nV)
        this.SET_URL_PARAM({
          param: 'n-sort',
          value: Object.keys(this.currentSort).length ? this.sort[ Object.keys(this.currentSort)[0] ][ 'url' ] : ''
        })
      },
      deep: true
    },
    '$route.path': {
      handler () {
        this.getSortParam()
        this.getShowParam()
      }
    },
    currentShow (nV) {
      this.SET_SHOW_PARAM(nV)
      this.SET_URL_PARAM({
        param: 'o-show',
        value: this.currentShow !== 60 ? `show-${this.currentShow}` : ''
      })
      if (this.$route.path.includes('catalog')) setTimeout(async () => {
        this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'success' })
        await this.$store.dispatch('products/FETCH_PRODUCTS')
        this.$router.push(this.$store.getters['catalog/GET_URL'])
        this.SET_NOTIFICATION(null)
      }, 500)
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('filters', ['SET_SORT_PARAM', 'SET_SHOW_PARAM']),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    setSortParam (sortKey) {
      this.$store.commit('filters/SET_PAGE_PARAM', 1)
      if (sortKey in this.currentSort) {
        this.currentSort = {}
        this.UNSET_URL_PARAM({ param: 'n-sort' })
        if (this.$route.path.includes('catalog')) setTimeout(async () => {
          this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'success' })
          await this.$store.dispatch('products/FETCH_PRODUCTS')
          this.SET_NOTIFICATION(null)
          this.$router.push(this.$store.getters['catalog/GET_URL'])
        }, 500)
      }
      else {
        this.currentSort = {}
        if (sortKey === 'sale' || sortKey === 'like' || sortKey === 'create') {
          this.$set(this.currentSort, sortKey, -1)
          this.SET_URL_PARAM({
            param: 'n-sort',
            value: this.sort[ sortKey ][ 'url' ]
          })
        } else {
          this.$set(this.currentSort, sortKey, 1)
          this.SET_URL_PARAM({
            param: 'n-sort',
            value: this.sort[ sortKey ][ 'url' ]
          })
        }
        if (this.$route.path.includes('catalog')) setTimeout(async () => {
          this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'success' })
          await this.$store.dispatch('products/FETCH_PRODUCTS')
          this.SET_NOTIFICATION(null)
          this.$router.push(this.$store.getters['catalog/GET_URL'])
        }, 500)
      }
    },
    setShowCount (showCount) {
      this.currentShow = showCount
    },
    getSortParam () {
      Object.keys(this.sort).forEach(sortParamKey => {
        if (this.sort[ sortParamKey ][ 'url' ] !== '' && this.$route.path.includes(this.sort[ sortParamKey ][ 'url' ])) {
          this.currentSort = {}
          this.currentSort[ sortParamKey ] = sortParamKey === 'sale' ? -1 : 1
        } else this.SET_SORT_PARAM(this.currentSort)
      })
    },
    getShowParam () {
      [ 120, 240 ].forEach(showCount => {
        if (this.$route.path.includes(`show-${showCount}`)) this.currentShow = showCount
      })
    }
  },
  created () {
    this.getSortParam()
    this.getShowParam()
  }
};
</script>

<style lang="scss">
.sort-wrapper {
  background: #EAECF1;
  padding-bottom: 21px;

  .sort-line__text {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;

    .sort-line__icon-arrow-down {
      transform: rotateX(180deg);
      transition: .3s;
    }
  }

  .sort-line__text_light-grey {
    color: #7F7F7F;
  }

  .sort-line__text_dark-grey {
    color: #616161;
  }

  .sort-line__text_active-grey {
    color: #303030;
    font-weight: 500;
  }
}

.sort__tablet-wrapper {
  width: 736px;
  margin: 10px auto;
  padding: 13px 0;
  background: #F6F7F9;
  border-radius: 10px;
  border: 1px solid #EAECF1;

  .sort-header__tablet {
    text-align: center;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #2E333A;
  }
}

@media (max-width: 767px) {
  .sort__tablet-wrapper {
    width: 96%;
    margin: 10px auto;
  }
}

</style>
