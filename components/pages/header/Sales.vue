<template lang="pug">
  //.sales(:class="{ 'pt35px bgc-50-grey': isShowHeaderFirstView, pt30px: $route.path === '/' && Object.keys($store.getters['filters/GET_LINE_FILTERS']).length < 2 && $mq !== 'lg' }")
  //  .container.df.jcsb
  //    template(v-if="$mq !== 'sm'")
  //      .sales__wrap(v-for="salePic in sales" :key="salePic.url")
  //        div(@click="goSalesPage(salePic.url)")
  //          component.cp(:is="getSalesPictureName(salePic.compName)")
  //
  //    div(v-else @click="goSalesPage(sales[0].url)")
  //      component.cp(:is="'SalesPictureFirstMobile'")

  .sales(:class="{ 'pt35px bgc-50-grey': isShowHeaderFirstView, pt30px: $route.path === '/' && Object.keys($store.getters['filters/GET_LINE_FILTERS']).length < 2 && $mq !== 'lg' }")
    .container.df.jcsb
      template(v-if="$mq !== 'sm' || seoUserAgentDesktop")
        .sales__wrap.pos-rel.cp(v-for="sale in sales" :key="sale.link" @click="goSalesPage(sale.link)")
          .sales__header {{ sale.header }}
          .sales__bottom.pos-abs.b20.df.jcsb.aic.w100p
            .df
              span.sales__link.mr8px Перейти
              img(src="/arrow-right-sales.svg" alt="arrow right sales icon")

            .sales__brand(:class="{ 'mt-22px': $mq === 'lg' || seoUserAgentDesktop, 'mt-5px': $mq === 'md' }") {{ sale.shop }}

          img.pos-abs.r0.b0(src="/sales-line.svg" alt="sales line block" width="158" height="114")

      div(@click="goSalesPage(sales[0].link)" v-else)
        .sales__wrap.pos-rel.cp(@click="goSalesPage(sales[0].link)")
          .sales__header {{ sales[0].header }}
          .sales__bottom.pos-abs.b20.df.jcsb.aic.w100p
            .df
              span.sales__link.mr8px Перейти
              img(src="/arrow-right-sales.svg" alt="arrow right sales icon")

            .sales__brand(:class="{ 'mt-22px': $mq === 'lg' || seoUserAgentDesktop, 'mt-5px': $mq === 'md' }") {{ sales[0].shop }}

          img.pos-abs.r0.b0(src="/sales-line.svg" alt="sales line block" width="158" height="114")

</template>

<script>
// import SalesPictureFirstDesktop from "@/components/ui/images/Sales/SalesPictureFirstDesktop.vue";
// import SalesPictureSecondDesktop from "@/components/ui/images/Sales/SalesPictureSecondDesktop.vue";
// import SalesPictureThirdDesktop from "@/components/ui/images/Sales/SalesPictureThirdDesktop.vue";
// import SalesPictureFirstTablet from "@/components/ui/images/Sales/SalesPictureFirstTablet.vue";
// import SalesPictureSecondTablet from "@/components/ui/images/Sales/SalesPictureSecondTablet.vue";
// import SalesPictureThirdTablet from "@/components/ui/images/Sales/SalesPictureThirdTablet.vue";
// import SalesPictureFirstMobile from "@/components/ui/images/Sales/SalesPictureFirstMobile.vue";
export default {
  name: "Sales",
  // components: { SalesPictureFirstMobile, SalesPictureThirdTablet, SalesPictureSecondTablet, SalesPictureFirstTablet, SalesPictureFirstDesktop, SalesPictureSecondDesktop, SalesPictureThirdDesktop },
  props: [ 'isShowHeaderFirstView' ],
  data: () => ({
    sales: [
      { header: 'Летние брендовые вещи со скидкой до 75%', shop: 'SalesSearch', link: '/catalog/clothes/--brjuki--futbolki--olimpijki--shorty--rubashki--platja--trusy--topy--mini--midi--noski--tuniki--polo--bjustgaltery--jubki--lify--plavki--majki--leginsy--jubkimidi--jubkimini--letnieplatja--rubashki-polo--' },
      { header: 'CK, MK, BOSS, GUESS, LAGERFELD, HILFIGER и другие со скидкой до 70%', shop: 'SalesSearch', link: '/catalog/clothes/--timberland--lacoste--dsquared2--armani--armani--collezioni--boss--giorgio-armani--michael-kors--dirk-bikkembergs--karl-lagerfeld--hugo--emporio-armani--guess--ea7--tommy-hilfiger--calvin-klein--calvin-klein-jeans--tommy-jeans--trussardi--diesel--the-north-face--armani-jeans--/sort-sale/' },
      { header: 'На спорте с ADIDAS, NIKE, PUMA, CHAMPION со скидкой до 80%', shop: 'SalesSearch', link: '/catalog/clothes/--adidas-originals--adidas-skateboarding--alpha-industries--champion--converse--nike--napapijri--puma--/sort-sale/' }
    ],
    // sales: [ { compName: 'SalesPictureFirst', url: 'https://google.com' }, { compName: 'SalesPictureSecond', url: 'https://yandex.com' }, { compName: 'SalesPictureThird', url: 'https://yahoo.com' } ],
    viewMode: { sm: 'Mobile', md: 'Tablet', lg: 'Desktop' }
  }),
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    }
  },
  methods: {
    goSalesPage (url) {
      this.$metrika.reachGoal('promoUnderHeader')
      window.open(url, '_blank')
    }
    // getSalesPictureName (name) {
    //   return `${ name }${ this.viewMode[ this.$mq ] }`
    // }
  }
};
</script>

<style lang="scss">
  .sales {
    width: 100%;
    padding: 28px 0 24px;

    .sales__wrap {
      width: 320px;
      height: 160px;
      padding: 20px;
      background: #242E3E;
      border-radius: 10px;

      .sales__header {
        display: block;
        width: 200px;
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
      }

      .sales__bottom {
        max-width: 320px;
      }

      .sales__link {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
      }

      .sales__brand {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        color: #FFFFFF;
      }
    }
  }

  .bgc-50-grey {
    background: linear-gradient(180deg, #EAECF1 50%, #fff 50%);
  }

  @media (max-width: 1150px) {
    .sales {
      padding-top: 0 !important;
    }
    .sales__wrap {
      width: 192px !important;
      height: 160px !important;

      .sales__bottom {
        max-width: 192px !important;
      }
      .sales__brand {
        font-size: 19px !important;
        line-height: 20px !important;
      }
    }
  }

  @media (max-width: 767px) {
    .sales__wrap {
      padding: 16px !important;
      width: 306px !important;
      height: 88px !important;

      .sales__bottom {
        max-width: 306px !important;
      }
      .sales__brand {
        font-size: 19px !important;
        line-height: 20px !important;
      }
    }
  }

</style>
