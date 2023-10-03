<template lang="pug">
  .menu-top
    .container.df.jcsb
      ChoosingCountryProducts
      .menu-top__link-wrapper.df.aic.pos-rel
        a.menu-top__links.hover-text-dark.mr30px(href="mailto:info@sales-search.ru" rel="nofollow") info@sales-search.ru
        a.menu-top__links.hover-text-dark(
          v-for="link,idx in links.filter(link => link.href)" :key="link.anchor" :href="link.href"
          :class="{ 'mr16px': idx !== links.length - 1, 'help-dropdown': idx === links.length - 1 }"
        ) {{ link.anchor }}
        .df.aic.cp.hover-text-dark.pos-rel(
          v-for="link,idx in links.filter(link => !link.href)" :key="link.anchor"
          @click.stop="hideAll(); isShowDropdown[ link.anchor ] = !isShowDropdown[ link.anchor ]"
          :class="{ 'mr16px': idx !== links.filter(link => !link.href).length - 1 }"
        )
          span.menu-top__links.hover-text-dark {{ link.anchor }}
          IconArrowDownGreyMini.cp.ml7px(:class="{ 'icon-arrow-down-grey-mini-active': isShowDropdown[ link.anchor ] }")
          .pos-abs.t27px.r237px(v-show="isShowDropdown[ link.anchor ]" @click="isShowDropdown[ link.anchor ] = false")
            DropDown(@close="isShowDropdown[ link.anchor ] = false" :styles="{ padding: '8px 12px 12px 12px', width: '213px' }")
              span.help-dropdown__header.toe.wsn.oh Выберите раздел
              a.help-dropdown__link.db.tdn.cp(
                v-for="linkObj,idx in link.links" :key="linkObj.href" :href="linkObj.href"
                :class="{ mt12px: idx === 0, 'mt3px': idx !== 0 }"
              ) {{ linkObj.anchor }}

</template>

<script>
// import selects from '@/static/selects'
import IconArrowDownGreyMini from '@/components/ui/icons/arrows/IconArrowDownGreyMini.vue'
import ChoosingCountryProducts from '@/components/pages/header/header-top/ChoosingCountryProducts.vue'
import DropDown from '@/components/ui/blocks/DropDown.vue'
export default {
  name: 'MenuTop',
  components: { DropDown, ChoosingCountryProducts, IconArrowDownGreyMini },
  data: () => ({
    links: [
      { anchor: 'Бренды', href: '/brands' },
      { anchor: 'Новинки', href: '/catalog/sort-create' },
      { anchor: 'Одежда', href: '/catalog/clothes' },
      { anchor: 'Обувь', href: '/catalog/shoes' },
      { anchor: 'Аксессуары', href: '/catalog/accessories' },
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
    // helpLinks: [
    //   { anchor: 'Контакты', href: '/contacts' },
    //   // { anchor: 'Центр поддержки SalesSearch', href: '/tsentr-podderzhki-sales-search' },
    //   // { anchor: 'Качество товаров', href: '/kachestvo-tovarov' },
    //   // { anchor: 'Как выбрать размер', href: '/kak-vybrat-razmer' },
    //   // { anchor: 'Публичная оферта', href: '/publichnaya-oferta' },
    //   // { anchor: 'Часто задаваемые вопросы', href: '/chasto-zadavayemyye-voprosy' }
    // ],
    isShowDropdown: { 'Мужское': false, 'Женское': false, 'Помощь': false }
  }),
  methods: {
    hideAll () {
      Object.keys(this.isShowDropdown).forEach(key => this.isShowDropdown[ key ] = false)
    }
  }
}
</script>

<style lang="scss">
  .menu-top {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: $color-blue;

    .menu-top__link-wrapper {
      margin-top: -2px;
    }
  }

  .menu-top__links {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #616161;
    text-decoration: none;
  }

  .icon-arrow-down.grey-mini {
    transition: .4s;
  }

  .icon-arrow-down-grey-mini-active {
    transform: rotateX(180deg);
    transition: .4s;
  }

  .help-dropdown__header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #303030;
  }

  .help-dropdown__link {
    display: flex;
    align-items: center;
    min-width: 166px;
    height: 19px;
    padding: 6px 8px;
    gap: 6px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: #303030;
  }

  .help-dropdown__link:hover {
    color: #2D78EA;
    background: #F6F7F9;
    border-radius: 6px;
  }

</style>
