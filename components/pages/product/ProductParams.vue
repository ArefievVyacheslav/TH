<template lang="pug">
  div(:class="{ 'df jcsb fww': $mq === 'md' }")
    .product__params.df.mb16px(v-if="paramPrepared(param, idx)" v-for="param,val,idx in params")
      .product__params-icon.df.jcc.aic
        component(:is="dict[idx][val].icon")

      .df.fdc.mt5px.ml12px
        .product__params-data-header.mb3px {{ paramPrepared(param, idx) }}
        .product__params-data-desc {{ dict[idx][val].desc }}

</template>

<script>
import IconShopProductPage from '@/components/ui/icons/product-page/IconShopProductPage.vue'
import IconBrandProductPage from '@/components/ui/icons/product-page/IconBrandProductPage.vue'
import IconDeliveryProductPage from '@/components/ui/icons/product-page/IconDeliveryProductPage.vue'
import IconInstallmentProductPage from '@/components/ui/icons/product-page/IconInstallmentProductPage.vue'
import IconCountryProductPage from '@/components/ui/icons/product-page/IconCountryProductPage.vue'
export default {
  name: "ProductParams",
  components: { IconCountryProductPage, IconInstallmentProductPage, IconDeliveryProductPage, IconBrandProductPage, IconShopProductPage },
  props: [ 'params' ],
  data: () => ({
    dict: [
      { shop: { icon: 'IconShopProductPage', desc: 'Магазин' } }, { brand: { icon: 'IconBrandProductPage', desc: 'Бренд' } },
      { deliveryPrice: { icon: 'IconDeliveryProductPage', desc: 'Стоимость доставки' } }, { installment: { icon: 'IconInstallmentProductPage', desc: 'Возможность рассрочки' } },
      { brandCountry: { icon: 'IconCountryProductPage', desc: 'Страна бренда' } }
    ]
  }),
  methods: {
    paramPrepared (param, idx) {
      if (idx === 1) return param
      else if (typeof param === 'string' && idx !== '1') return param
      else if (idx === 2) return param ? param + ' ₽' : 'Бесплатно'
      else if (idx === 3 && param) return 'Да'
    }
  }
}
</script>

<style lang="scss">
  .product__params-data-header,
  .product__params-data-desc {
    font-family: 'Inter',serif;
    font-style: normal;
  }
  .product__params-data-desc {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #8791A0;
  }
  .product__params {
    padding: 8px;
    border: 1px solid #F6F7F9;
    border-radius: 16px;

    .product__params-icon {
      width: 48px;
      height: 48px;
      background: #F6F7F9;
      border-radius: 10px;
    }

    .product__params-data-header {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #2E333A;
      opacity: 0.8;
    }
  }

  @media (max-width: 1150px) {
    .product__params {
      width: 325px;
      background-color: #F6F7F9;

      .product__params-icon {
        background-color: #fff;
      }
    }
  }

  @media (max-width: 767px) {
    .product__params {
      width: calc(100% - 18px) !important;
    }
  }

</style>
