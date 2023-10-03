<template lang="pug">
  .tabs.m0auto(:class="{ mt16px: $mq === 'md' }")
    .category-tab.cp(
      v-for="categoryKey,idx in Object.keys(categories)" :key="categoryKey"
      :class="{ 'category-tab-active': categoryKey === currentCategory }" @click="setCategory(categoryKey)"
    )
      span.category-tab__category(:class="{ 'category-tab__category-active': categoryKey === currentCategory }") {{ categoryKey }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "HeaderCategoryTabLine",
  data: () => ({
    categories: {
      'Одежда': 'clothes',
      'Обувь': 'shoes',
      'Аксессуары': 'accessories'
    },
    currentCategory: null,
    init: false
  }),
  watch: {
    async currentCategory (nV) {
      this.SET_COLLECTION(this.categories[ nV ])
      this.SET_URL_PARAM({ param: '1category', value: this.categories[ nV ] })
      this.RESET_FILTERS()
      if (this.init) await this.FETCH_SELECTS()
    },
    '$store.state.filters.collection': {
      handler (nV) {
        if (!nV) this.currentCategory = 'Одежда'
      }
    }
  },
  methods: {
    ...mapActions('selects', ['FETCH_SELECTS']),
    ...mapMutations('filters', ['SET_COLLECTION', 'RESET_FILTERS']),
    ...mapMutations('catalog', ['SET_URL_PARAM']),
    setCategory (cat) {
      this.currentCategory = cat
      this.$metrika.reachGoal('changeCategory')
    },
    getCategory () {
      const cats = this.categories
      Object.keys(cats).forEach(catKey => {
        if (this.$route.path.includes('/' + cats[ catKey ])) this.SET_COLLECTION(cats[ catKey ])
      })
      if (!this.$store.state.filters.collection) this.SET_COLLECTION('clothes')
      this.currentCategory = Object.keys(this.categories).find(key => this.categories[key] === this.$store.state.filters.collection)
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
  .header-fv {
    padding-top: 60px;
    background: #EAECF1;

    .header-fv__h1 {
      text-align: center;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 39px;
      color: #343843;
    }

    .header-fv__desc {
      margin-top: 25px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #767C8E;
    }

    .tabs {
      display: flex;
      align-items: flex-start;
      max-width: 384px;
      margin-top: 30px;
      padding: 4px;
      gap: 10px;
      background: #DDE1E9;
      border-radius: 10px;

      .category-tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 29px;
        gap: 10px;
        border-radius: 6px;

        .category-tab__category {
          font-family: 'Inter',serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: 0.02em;
          color: #666666;
          transition: .3s;
        }

        .category-tab__category-active {
          color: #2D78EA;
          transition: .3s;
        }
      }

      .category-tab:hover {
        background: #E9EBF1;
        transition: .3s;
      }

      .category-tab-active {
        background: #FFFFFF !important;
        transition: .3s;
      }
    }
  }

  @media (max-width: 1150px) {
    .header-fv {
      padding-top: 16px;

      .tabs {
        display: flex;
        justify-content: center;
        max-height: 50px;
        width: 100%;
        max-width: 726px !important;
        margin-top: 16px !important;
        padding: 6px 7px;
        background: #E0E3EB !important;
        border-radius: 10px !important;

        .category-tab {
          width: 100%;
          max-width: 237px;
          padding: 12px 0 !important;
          border-radius: 10px !important;

          .category-tab__category {
            font-weight: 400 !important;
          }

          .category-tab__category-active {
            color: #2D78EA !important;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .header-fv {
      padding-top: 0;

      .tabs {
        margin-top: 5px !important;
        max-height: 38px;
        max-width: 326px !important;

        .category-tab {
          padding: 10px 0 !important;
        }
      }
    }
  }

  @media (max-width: 370px) {
    .tabs {
      width: 286px !important;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;               /* ширина scrollbar */
  }
  ::-webkit-scrollbar-track {
    background: transparent;        /* цвет дорожки */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #F0F0F0;    /* цвет плашки */
    border-radius: 30px;       /* закругления плашки */
  }

</style>
