<template lang="pug">
  .menu-links.df.jcsb.aic
    .container.df.jcsb.aic
      .df.aic
        nuxt-link.menu-links__logo.tdn(to="/")
          Logo

        MenuLinksCategoryChoice(v-if="$route.path !== '/'")

      .pos-rel.ml-auto
        input.menu-search.mr25px(v-model="query" placeholder="Поиск")
        IconSearchMenuLinks.pos-abs.t7px.l9px

      nuxt-link.df.pos-rel.tdn(v-for="component in iconsComponents" :key="component.name" :to="component.link")
        component.hover-icon-menu-links.cp(:is="component.name" :class="{ 'hover-icon-menu-links_clone': $route.path === component.link }")
        .dreambox-counter.pos-abs.df.jcc.aic(v-if="dreambox.length" :key="dreambox.length") {{ dreambox.length }}

</template>

<script>
import { mapActions, mapState } from "vuex";
import IconSearchMenuLinks from '@/components/ui/icons/menu-links/IconSearchMenuLinks.vue'
import IconJournalMenuLinks from '@/components/ui/icons/menu-links/IconJournalMenuLinks.vue'
import IconDreamboxMenuLinks from '@/components/ui/icons/menu-links/IconDreamboxMenuLinks.vue'
import IconLkMenuLinks from '@/components/ui/icons/menu-links/IconLkMenuLinks.vue'
import IconAllMenuLinks from '@/components/ui/icons/menu-links/IconAllMenuLinks.vue'
import MenuLinksCategoryChoice from '@/components/pages/header/header-second-line/MenuLinksCategoryChoice.vue'
import Logo from '@/components/ui/blocks/Logo.vue'
export default {
  name: "MenuLinks",
  components: { Logo, MenuLinksCategoryChoice, IconAllMenuLinks, IconLkMenuLinks, IconDreamboxMenuLinks, IconJournalMenuLinks, IconSearchMenuLinks },
  // TODO: Скрыты журнал, лк, блок доп. ссылок
  // data: () => ({ iconsComponents: [ 'IconJournalMenuLinks', 'IconDreamboxMenuLinks', 'IconLkMenuLinks', 'IconAllMenuLinks' ] }),
  data: () => ({
    query: '',
    iconsComponents: [ { name: "IconDreamboxMenuLinks", link: '/dreambox' } ]
  }),
  computed: {
    ...mapState({ dreambox: state => state.dreambox.dreambox })
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
  .menu-links {
    height: 36px;
    padding-top: 24px;
    background: #EAECF1;

    .hover-icon-menu-links:hover {
      background: #DDE1E9;
      border-radius: 10px;
    }

    .hover-icon-menu-links_clone {
      background: #DDE1E9;
      border-radius: 10px;
    }
  }

  .menu-links__logo {
    display: flex;
    align-items: center;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #212121;
  }

  .menu-search {
    width: 240px;
    max-height: 21px;
    padding: 9px 12px 10px 38px;
    background: #FFFFFF;
    border: none;
    border-radius: 50px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #303030;
    outline: none;
  }
  .menu-search:hover {
    outline: 1px solid #DADEE7;
  }
  .menu-search:focus {
    outline: 1px solid #2D78EA;
  }
  .menu-search_filter {
    width: 100%;
    background: #F6F7F9;
  }
  .dreambox-counter {
    width: 21px;
    height: 14px;
    top: 19px;
    left: 15px;
    background: #2D78EA;
    border: 1px solid #EAECF1;
    border-radius: 100px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #FFFFFF;
  }

</style>
