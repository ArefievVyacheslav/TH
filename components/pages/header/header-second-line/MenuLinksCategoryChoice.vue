<template lang="pug">
  .menu-links__category-choice.ml32px.cp.pos-rel(@click="isShowCategoryList = !isShowCategoryList")
    | {{ currentCategory }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.pos-abs.mt2px(
      :active="isShowCategoryList" :class="{ 'menu-links__icon-arrow-down-active': isShowCategoryList }"
    )
    .pos-abs.t38px.l0px(v-if="isShowCategoryList" @click.stop)
      DropDown(@close="isShowCategoryList = false" :styles="{ padding: '10px 20px 20px 20px', width: '130px' }")
        span.category-header.toe.wsn.oh Выбор типа товаров
        .category-item.cp(
          v-for="categoryKey,idx in Object.keys(categories)" :key="categoryKey" @click.stop="setCategory(categoryKey)"
          :class="{ 'category-item-active': categoryKey === currentCategory, mt12px: idx === 0, mt3px: idx !== 0 }"
        )
          span.category-item__category(:class="{ 'category-item__category-active': categoryKey === currentCategory }") {{ categoryKey }}
          IconCheckMarkBlue.ml-auto(v-if="categoryKey === currentCategory")

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconCheckMarkBlue from "@/components/ui/icons/IconCheckMarkBlue.vue";
export default {
  name: "MenuLinksCategoryChoice",
  components: { IconCheckMarkBlue, DropDown, IconArrowDownGreyMedium },
  data: () => ({
    categories: {
      'Одежда': 'clothes',
      'Обувь': 'shoes',
      'Аксессуары': 'accessories'
    },
    currentCategory: null,
    isShowCategoryList: false,
    init: false
  }),
  watch: {
    async currentCategory (nV) {
      this.SET_COLLECTION(this.categories[ nV ])
      this.SET_URL_PARAM({ param: '1category', value: this.categories[ nV ] })
      this.RESET_FILTERS()
      if (this.init) await this.FETCH_SELECTS()
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_COLLECTION', 'RESET_FILTERS' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM' ]),
    setCategory (cat) {
      this.isShowCategoryList = false
      this.currentCategory = cat
      this.$metrika.reachGoal('changeCategory')
    },
    getCategory () {
      const route = this.$route.path
      const cats = this.categories
      Object.keys(cats).forEach(catKey => {
        if (route.includes('/' + cats[ catKey ])) {
          this.SET_COLLECTION(cats[ catKey ])
          this.currentCategory = catKey
        }
      })
      // this.currentCategory = Object.keys(this.categories).find(key => this.categories[key] === this.$store.state.filters.collection)
      if (!this.currentCategory) this.currentCategory = 'Одежда'
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .menu-links__category-choice {
    width: 134px;
    max-height: 19px;
    padding-top: 11px;
    padding-left: 13px;
    padding-bottom: 10px;
    background: #FFFFFF;
    border-radius: 6px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #303030;

    .category-header {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .category-item {
      display: flex;
      align-items: center;
      height: 16px;
      padding: 10px 12px;
      gap: 6px;

      .category-item__category {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #303030;
      }

      .category-item__category-active {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #2D78EA;
      }
    }

    .category-item-active,
    .category-item:hover {
      background: #F6F7F9;
      border-radius: 6px;
    }
  }

  .menu-links__category-choice:hover svg .icon-arrow-down-grey-medium {
    fill: #303030 !important;
  }

  .menu-links__icon-arrow-down {
    top: 15px;
    right: 13px;
    transition: .3s;
  }

  .menu-links__icon-arrow-down-active {
    transform: rotateX(180deg);
    transition: .3s;
  }

</style>
