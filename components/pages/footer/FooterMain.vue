<template lang="pug">
  .footer.pb38px(
    :class="{ pt37px: $mq === 'lg' || $route.path === '/', pt24px: $mq !== 'lg', mb12px: $mq !== 'lg', mb110px: $mq !== 'lg' && ($route.path.includes('product') || $route.path.includes('dreambox')) }"
  )
    .container.df.jcsb(v-if="$mq !== 'sm'" :class="{ g42: $mq !== 'lg' }")
      .footer__column.df.fdc
        p.footer__column-header.mb16px {{ blocks[ 0 ].header }}
        a.footer__column-link.hover-text-blue.mb12px.tdn.cp(v-for="linkObj,idx in blocks[ 0 ].links" :key="linkObj.anchor" :href="linkObj.link") {{ linkObj.anchor }}

        p.footer__column-header.mt12px.mb16px {{ blocks[ 3 ].header }}
        nuxt-link.footer__column-link.hover-text-blue.mb12px.tdn(v-for="linkObj,idx in blocks[ 3 ].links" :key="linkObj.anchor" :to="linkObj.link") {{ linkObj.anchor }}

      .footer__column.df.fdc
        p.footer__column-header.mb16px {{ blocks[ 1 ].header }}
        nuxt-link.footer__column-link.hover-text-blue.mb12px.tdn(v-for="linkObj,idx in blocks[ 1 ].links" :key="linkObj.anchor" :to="linkObj.link") {{ linkObj.anchor }}

        p.footer__column-header.mt12px.mb16px {{ blocks[ 4 ].header }}
        a.df.aic.hover-text-blue.tdn(v-for="linkObj,idx in blocks[ 4 ].links" :key="linkObj.anchor" :href="linkObj.link" target="_blank" rel="nofollow")
          component(:is="linkObj.icon")
          .footer__column-link.ml7px.mt-2px {{ linkObj.anchor }}

      .footer__column.df.fdc
        .footer__column-header.mb16px(:class="{ mt16px: $mq !== 'sm' }") {{ blocks[ 2 ].header }}
        nuxt-link.footer__column-link.hover-text-blue.mb12px.tdn(v-for="linkObj,idx in blocks[ 2 ].links" :key="linkObj.anchor" :to="linkObj.link") {{ linkObj.anchor }}

      //.footer__column.df.fdc(v-if="$mq === 'lg'")
      //  .footer__column-qr
      //    QRApp
      //    .footer__column-qr-header.mt10px.mb10px Наведите камеру и скачайте <br> бесплатное приложение
      //    .db.df.jcc.g10
      //      a(v-for="iconApp in iconApps" :key="iconApp.href" :href="iconApp.href" rel="nofollow")
      //        img(:src="iconApp.icon" alt="app icon")

    //.container.mt25px.mb35px(v-if="$mq === 'md'")
    //  .df.g25
    //    a(v-for="iconApp in iconAppsTablet" :key="iconApp.href" :href="iconApp.href" rel="nofollow")
    //      img(:src="iconApp.icon" alt="app icon")

    .container(v-if="$mq === 'sm'")
      .footer__section(v-for="block,idx in blocks" :key="block.header" :class="{ pt22px: idx }")
        .df.aic.jcsb(@click="showLinksIdx = showLinksIdx === idx ? null: idx")
          .footer__column-header {{ block.header }}
          IconArrowDownDarkGreyMedium(:class="{ 'menu-links__icon-arrow-down-active': showLinksIdx === idx }")

        transition-group(name="fade")
          template(v-if="showLinksIdx === idx")
            template(v-if="idx !== 4")
              nuxt-link.footer__column-link.hover-text-blue.df.aic.tdn(
                v-for="linkObj,idx2 in blocks[ idx ].links" :key="linkObj.anchor" :to="linkObj.link"
                :class="{ mb24px: idx2 !== blocks[ idx ].links.length - 1, mt24px: !idx2, 'color-blue': !idx2 && !idx }"
              ) {{ linkObj.anchor }}

            template(v-else)
              a.footer__column-link.hover-text-blue.df.aic.tdn(
                v-for="linkObj,idx2 in blocks[ 4 ].links" :key="linkObj.anchor" :href="linkObj.link" target="_blank" rel="nofollow"
                :class="{ mb24px: idx2 !== blocks[ idx ].links.length - 1, mt24px: !idx2, 'color-blue': !idx2 && !idx }"
              )
                IconVkFooter.mr7px
                | {{ linkObj.anchor }}


    //.container.df.fww.g20(v-if="$mq === 'sm'" :class="{ 'mt30px mb35px': !$route.path.includes('/product'), 'pt16px mb110px': $route.path.includes('/product'), 'pt16px': $route.path.includes('/catalog') }")
    //  a(v-for="iconApp in iconAppsMobile" :key="iconApp.href" :href="iconApp.href" rel="nofollow")
    //    img(:src="iconApp.icon" alt="app icon")

</template>

<script>
import IconVkFooter from "@/components/ui/icons/IconVkFooter.vue";
// import QRApp from "@/components/ui/images/QRApp.vue";
import IconArrowDownDarkGreyMedium from "@/components/ui/icons/arrows/IconArrowDownDarkGreyMedium.vue";
export default {
  name: "FooterMain",
  components: { IconArrowDownDarkGreyMedium, IconVkFooter }, //, QRApp
  data: () => ({
    blocks: [
      {
        header: 'Помощь',
        links: [
          { anchor: 'info@sales-search.ru', link: 'mailto:info@sales-search.ru' }
        ]
      },
      // {
      //   header: 'Помощь',
      //   links: [
      //     { anchor: 'Центр поддержки SalesSearch', link: '/contacts' }, { anchor: 'Качество товаров', link: '/quality-of-goods' }, { anchor: 'Как выбрать размер', link: '/how-to-choose-the-size' },
      //     { anchor: 'Публичная оферта', link: '/public-offer' }, { anchor: 'Часто задаваемые вопросы', link: '/frequently-asked-questions' }
      //   ]
      // },
      {
        header: 'Покупателям',
        links: [
          { anchor: 'Способы оплаты', link: '/payment-methods' }
        ]
      },
      // {
      //   header: 'Покупателям',
      //   links: [
      //     { anchor: 'Как сделать заказ', link: '/how-to-place-an-order' }, { anchor: 'Способы оплаты', link: '/payment-methods' }, { anchor: 'Доставка', link: '/delivery' },
      //     { anchor: 'Возврат товара', link: '/return-of-goods' }, { anchor: 'Возврат денежных средств', link: '/refund-of-funds' }
      //   ]
      // },
      {
        header: 'Компания',
        links: [
          { anchor: 'О нас', link: '/about' }, { anchor: 'Контакты', link: '/contacts' }
        ]
      },
      // {
      //   header: 'Компания',
      //   links: [
      //     { anchor: 'О нас', link: '/about' }, { anchor: 'Контакты', link: '/contacts' }, { anchor: 'Реквизиты', link: '/requisites' },
      //     { anchor: 'Вакансии', link: '/job-openings' }, { anchor: 'Инвесторам', link: '/investors' }
      //   ]
      // },
      {
        header: 'Партнерам',
        links: [ { anchor: 'Продавайте на SalesSearch', link: '/sell-on-salessearch' } ] // { anchor: 'Партнерская программа', link: '/affiliate-program' }
      },
      {
        header: 'Социальные сети',
        links: [
          { anchor: 'Вконтакте', link: 'https://vk.com/salessearchru', icon: 'IconVkFooter' }
        ]
      }
    ],
    iconApps: [
      { icon: '/icon-app-store-footer.svg', href: '/' },
      { icon: '/icon-play-market-footer.svg', href: '/' },
      { icon: '/icon-huawei-gallery-footer.svg', href: '/' },
      { icon: '/icon-ru-store-footer.svg', href: '/' }
    ],
    iconAppsTablet: [
      { icon: '/button-app-store-footer.svg', href: '/' },
      { icon: '/button-play-market-footer.svg', href: '/' },
      { icon: '/button-huawei-gallery-footer.svg', href: '/' },
      { icon: '/button-ru-store-footer.svg', href: '/' }
    ],
    iconAppsMobile: [
      { icon: '/button-app-store-mobile-footer.svg', href: '/' },
      { icon: '/button-play-market-mobile-footer.svg', href: '/' },
      { icon: '/button-huawei-gallery-mobile-footer.svg', href: '/' },
      { icon: '/button-ru-store-mobile-footer.svg', href: '/' }
    ],
    showLinksIdx: 0
  }),
  computed: {
    isShowFirstView () { return this.$store.state.statistic.isFirstView || this.$route.path === '/' },
    imageSize () {
      if (this.$mq === 'lg') return { height: 350, width: 264 }
      if (this.$mq === 'md') return { height: 308, width: 232 }
      if (this.$mq === 'sm') return { height: 212, width: 160 }
      return {}
    }
  },
};
</script>

<style lang="scss">
  .footer {
    background: #EAECF1;

    .footer__column-header,
    .footer__column-link,
    .footer__column-qr-header {
      font-family: 'Inter',serif;
      font-style: normal;
    }

    .footer__column-header {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #2E333A;
    }

    .footer__column-link {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #6A7380;
    }

    .footer__column-qr {
      padding: 20px 47px;
      border: 1px solid #2D78EA;
      border-radius: 20px;
    }

    .footer__column-qr-header {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #6A7380;
    }

    .footer__section {
      padding-bottom: 22px;
      border-bottom: 1px solid #D1D5E0;
    }
  }

  @media (max-width: 1150px) {
    .footer__column {
      width: 100%;
    }
  }

  .hover-text-blue:hover {
    color: #2D78EA !important;
  }

</style>
