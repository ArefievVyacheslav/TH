<template lang="pug">
  .header-top-mobile
    .container.df.jcsb.aic
      template(v-if="!isShowSearch")
        .df.aic
          nuxt-link.menu-links__logo.fs20px.tdn(to="/")
            Logo

        .df.aic
          ChoosingCountryProducts.mt-8px
          .ml12px.mt-3px(@click="isShowSearch = !isShowSearch")
            IconSearchMobileHeader

          .df.aic.cp.hover-text-dark.pos-rel.mt-8px(@click="isShowDropdown = !isShowDropdown")
            IconAllMenuLinks
            .pos-abs.t38px.r237px(v-if="isShowDropdown" @click="isShowDropdown = false")
              DropDown(@close="isShowDropdown = false" :styles="{ padding: '8px 12px 12px 12px', width: '213px' }")
                span.help-dropdown__header.toe.wsn.oh Помощь
                a.help-dropdown__link.db.tdn.cp(
                  v-for="linkObj,idx in links" :key="linkObj.href" :href="linkObj.href"
                  :class="{ mt12px: idx === 0, 'mt3px': idx !== 0 }"
                ) {{ linkObj.anchor }}

      .pos-rel.df.jcc.ml-auto(v-else)
        input.menu-search.mr15px(v-model="query" placeholder="Поиск")
        IconSearchMenuLinks.pos-abs.t7px.l9px
        p.crumb.db.mt10px(@click="isShowSearch = !isShowSearch") Скрыть

</template>

<script>
import { mapActions } from "vuex";
import IconSearchMobileHeader from "@/components/ui/icons/IconSearchMobileHeader.vue"
import IconSearchMenuLinks from "@/components/ui/icons/menu-links/IconSearchMenuLinks.vue"
import IconAllMenuLinks from "@/components/ui/icons/menu-links/IconAllMenuLinks.vue"
import DropDown from "@/components/ui/blocks/DropDown.vue"
import ChoosingCountryProducts from "@/components/pages/header/header-top/ChoosingCountryProducts.vue"
import Logo from "@/components/ui/blocks/Logo.vue"
export default {
  name: "HeaderTopMobile",
  components: { DropDown, IconAllMenuLinks, IconSearchMenuLinks, IconSearchMobileHeader, Logo, ChoosingCountryProducts },
  data: () => ({
    query: '',
    isShowSearch: false,
    links: [
      { anchor: 'Бренды', href: '/brands' },
      { anchor: 'Новинки', href: '/catalog/sort-create' },
      { anchor: 'О SalesSearch', href: '/about' },
      { anchor: 'Контакты', href: '/contacts' },
      { anchor: 'Vk', href: 'https://vk.com/salessearchru' }
    ],
    isShowDropdown: false
  }),
  computed: {
    isShowCategoryChoice () {
      return !this.$store.state.statistic.isFirstView && this.$route.path !== '/'
    }
  },
  watch: {
    query (nV) {
      if (nV) this.fetchEntriesDebounced()
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    async downloadProducts () {
      try {
        this.SET_NOTIFICATION({ text: 'Загружаю результаты поиска...', type: 'warning' })
        const { data } = await this.$axios.post('/search', { searchTerm: this.query })
        this.SET_NOTIFICATION({ text: 'Поиск завершён', type: 'success', autoHideDelay: 2 })
        this.$store.commit('products/SET_PRODUCTS_DATA', { products: data })
        this.$router.push('/search/' + this.query)
      } catch (e) {
        this.SET_NOTIFICATION({ text: 'При поиске произошла ошибка. Свяжитесь с нами для решения проблемы на странице "Контакты"', type: 'danger', autoHideDelay: 4 })
        console.log(e)
      }
    },
    fetchEntriesDebounced () {
      clearTimeout(this._timerId)
      this._timerId = setTimeout(this.downloadProducts, 1500)
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 340px !important;

  .menu-search {
    width: 60vw !important;
  }
}

</style>

<style lang="scss">
  .header-top-mobile {
    max-height: 80px;
    padding: 9px;
    background: #EAECF1;
  }

  @media (max-width: 767px) {
    .header-top-mobile {
      max-height: 36px;
    }
  }

</style>
