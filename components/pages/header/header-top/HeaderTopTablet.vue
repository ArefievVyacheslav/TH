<template lang="pug">
  .header-top-tablet
    .container.df.jcsb.aic
      .df.aic
        nuxt-link.menu-links__logo.tdn(to="/")
          Logo

      .df.aic.mt-3px(v-if="!isShowSearch" :class="{ 'mt-10px': $mq === 'md' && $route.path !== '/' }")
        .menu-top__link-wrapper.df.aic.pos-rel
          a.menu-top__links.hover-text-dark.mr30px(href="/brands") Бренды
          a.menu-top__links.hover-text-dark.mr30px(href="/catalog/sort-create") Новинки
          .df.aic.cp.hover-text-dark.pos-rel(
            v-for="link,idx in links.filter(link => !link.href)" :key="link.anchor"
            @click="isShowDropdown[ link.anchor ] = !isShowDropdown[ link.anchor ]"
            :class="{ 'mr16px': idx !== links.filter(link => !link.href).length - 1 }"
          )
            span.menu-top__links.hover-text-dark {{ link.anchor }}
            IconArrowDownGreyMini.cp.ml7px(:class="{ 'icon-arrow-down-grey-mini-active': isShowDropdown[ link.anchor ] }")
            .pos-abs.t27px.r237px(v-if="isShowDropdown[ link.anchor ]" @click="isShowDropdown[ link.anchor ] = false")
              DropDown(@close="isShowDropdown[ link.anchor ] = false" :styles="{ padding: '8px 12px 12px 12px', width: '213px' }")
                span.help-dropdown__header.toe.wsn.oh Выберите категорию
                a.help-dropdown__link.db.tdn.cp(
                  v-for="linkObj,idx in link.links" :key="linkObj.href" :href="linkObj.href"
                  :class="{ mt12px: idx === 0, 'mt3px': idx !== 0 }"
                ) {{ linkObj.anchor }}

        ChoosingCountryProducts.ml24px
        .ml24px.mt4px(@click="isShowSearch = !isShowSearch")
          IconSearchMobileHeader

      .pos-rel.df.jcc.ml-auto(v-else)
        input.menu-search.mr15px(v-model="query" placeholder="Поиск")
        IconSearchMenuLinks.pos-abs.t7px.l9px
        p.crumb.db.mt10px(@click="isShowSearch = !isShowSearch") Скрыть

</template>

<script>
import { mapActions } from "vuex";
import IconSearchMobileHeader from '@/components/ui/icons/IconSearchMobileHeader.vue'
import IconSearchMenuLinks from '@/components/ui/icons/menu-links/IconSearchMenuLinks.vue'
import IconArrowDownGreyMini from '@/components/ui/icons/arrows/IconArrowDownGreyMini.vue'
import DropDown from '@/components/ui/blocks/DropDown.vue'
import IconAllMenuLinks from '@/components/ui/icons/menu-links/IconAllMenuLinks.vue'
import ChoosingCountryProducts from '@/components/pages/header/header-top/ChoosingCountryProducts.vue'
import Logo from '@/components/ui/blocks/Logo.vue'
export default {
  name: "HeaderTopTablet",
  components: { IconAllMenuLinks, DropDown, IconArrowDownGreyMini, IconSearchMenuLinks, IconSearchMobileHeader, Logo, ChoosingCountryProducts },
  data: () => ({
    query: '',
    isShowSearch: false,
    links: [
      {
        anchor: 'Мужское', href: '', links: [
          { anchor: 'Мужская одежда', href: '/catalog/clothes/muzhchinam' },
          { anchor: 'Мужская обувь', href: '/catalog/shoes/muzhchinam' },
          { anchor: 'Мужские аксессуары', href: '/catalog/accessories/muzhchinam' }
        ]
      },
      {
        anchor: 'Женское', href: '', links: [
          { anchor: 'Женская одежда', href: '/catalog/clothes/zhenshchinam' },
          { anchor: 'Женская обувь', href: '/catalog/shoes/zhenshchinam' },
          { anchor: 'Женские аксессуары', href: '/catalog/accessories/zhenshchinam' }
        ]
      },
      {
        anchor: 'Помощь', href: '', links: [
          { anchor: 'О SalesSearch', href: '/about' },
          { anchor: 'Контакты', href: '/contacts' },
          { anchor: 'Vk', href: 'https://vk.com/salessearchru' }
        ]
      }
    ],
    isShowDropdown: { 'Мужское': false, 'Женское': false, 'Помощь': false }
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

<style lang="scss">
  .header-top-tablet {
    max-height: 48px;
    padding: 16px;
    background: #EAECF1;
    border-bottom: 1px solid #D1D5E0;
  }

</style>
