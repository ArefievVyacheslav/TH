<template lang="pug">
  .footer-menu.pos-fixed(v-if="isShowFooterMenu")
    //.container.df(:key="$route.path" :class="{ jcsb: $mq === 'sm', jcsa: $mq === 'md' }")
    .container.df.g42(:key="$route.path" :class="{ jcsa: $mq !== 'lg' }")
      div(v-for="linkObj,idx in links" :key="linkObj.url" @click="$router.push(linkObj.url)" :class="{ 'pos-rel': idx === links.length - 1 }")
        component.db.m0auto(:is="getIconLink(linkObj)" :color="activeLink?.url === linkObj.url ? '#2D78EA' : '#2E333A'")
        .dreambox-counter.pos-abs.df.jcc.aic.l31px.t-1px(v-show="idx === links.length - 1 && dreambox.length") {{ dreambox.length }}
        .footer-menu__title(:class="{ 'footer-menu__title-active': activeLink?.url === linkObj.url }") {{ linkObj.anchor }}

</template>

<script>
import { mapState } from "vuex";
import IconHomeMenuLinksMini from "@/components/ui/icons/menu-links/IconHomeMenuLinksMini.vue"
import IconDreamboxMenuLinksMini from "@/components/ui/icons/menu-links/IconDreamboxMenuLinksMini.vue"
import IconJournalMenuLinksMini from "@/components/ui/icons/menu-links/IconJournalMenuLinksMini.vue"
import IconLkMenuLinksMini from "@/components/ui/icons/menu-links/IconLkMenuLinksMini.vue"
export default {
  name: "FooterMenu",
  components: { IconLkMenuLinksMini, IconJournalMenuLinksMini, IconDreamboxMenuLinksMini, IconHomeMenuLinksMini },
  data: () => ({
    links: [
      { anchor: 'Поиск скидок', url: '/', icon: 'Home' },
      // { anchor: 'Лента', url: '/news', icon: 'Journal' },
      { anchor: 'Дримбокс', url: '/dreambox', icon: 'Dreambox' },
      // { anchor: 'Профиль', url: '/lk', icon: 'Lk' }
    ],
    activeLink: null,
    isShowFooterMenu: true
  }),
  computed: {
    ...mapState({ dreambox: state => state.dreambox.dreambox })
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (nV) {
        if (nV === '/') setTimeout(() => this.isShowFooterMenu = true, 500)
        this.links.forEach(linkObj => {
          if (nV === linkObj.url) this.activeLink = linkObj
        })
        if (nV !== this.activeLink?.url) this.activeLink = null
      }
    }
  },
  methods: {
    getIconLink: linkObj => `Icon${linkObj.icon}MenuLinksMini`,
    setCondition (condition) {
      this.isShowFooterMenu = !condition }
  },
  created () {
    this.$root.$on('show-filters', this.setCondition)
    this.$root.$on('show-extra-filters', this.setCondition)
    this.$root.$on('show-adaptive-filter-modal', this.setCondition)
  },
  mounted () {
    setTimeout(() => this.isShowFooterMenu = true, 1000)
  },
  beforeDestroy () {
    this.$root.$off('show-filters', this.setCondition)
    this.$root.$off('show-extra-filters', this.setCondition)
    this.$root.$off('show-adaptive-filter-modal', this.setCondition)
  }
};
</script>

<style lang="scss">
  .footer-menu {
    bottom: 0;
    width: 100vw;
    padding-top: 7px;
    padding-bottom: 7px;
    background: #FFFFFF;
    box-shadow: 0 -1px 10px rgba(47, 54, 70, 0.06);

    .footer-menu__title {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #2E333A;
    }
    .footer-menu__title-active {
      color: #2D78EA;
    }
  }

</style>
