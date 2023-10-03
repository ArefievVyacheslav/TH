<template lang="pug">
  div
    .product-card-dreambox.df
      .db.w22px.h22px.mr19px.cp(v-if="$mq === 'lg'" @click="choice = !choice; $emit('choice-product', { product, choice })")
        Checkbox(:is-checked="choice")

      nuxt-link.product-card-dreambox__img.cp(:to="`/product/${getTransliteration(product.name)}-${product.collection}-${product.id}`")
        b-img-lazy(:src="product.image" blank-src="/placeholder-transparent.svg" :alt="`main photo product ${product.name} for dreambox`" style="width: 100%")

      .max-w-200px.ml16px.mt10px.mr10px
        nuxt-link.product-card-dreambox__name.tdn(:to="`/product/${getTransliteration(product.name)}-${product.collection}-${product.id}`") {{ product.brand }} / {{ product.name }}
        .product-card-dreambox__details.mt8px.mb8px Размеры в наличии • {{ product.sizes.reduce((acc, size) => acc += size + ' ', '') }}
        .product-card-dreambox__details.mt8px.mb8px {{ product.shop.charAt(0).toUpperCase() + product.shop.slice(1) }}

      .ml-auto.mt10px(:class="{ mr10px: $mq !== 'lg' }")
        .product-card-dreambox__price.mb4px.toe.oh.wsn {{ addSpacesToPrice(product.price) }} ₽
        .product-card-dreambox__oldprice.toe.oh.wsn {{ addSpacesToPrice(product.oldprice) }} ₽
        div(@click="CHANGE_DREAMBOX(product); SET_NOTIFICATION({ text: 'Товар удалён из дримбокса', type: 'info', autoHideDelay: 3 })")
          IconDeleteProductDreambox.db.ml-auto.mt30px.cp

    .db.w22px.h22px.mt23px.mr19px.cp(v-if="$mq !== 'lg'" @click="choice = !choice; $emit('choice-product', { product, choice })")
      Checkbox(:is-checked="choice")

    .dream-box__total-separator.mt23px(v-if="$mq !== 'lg' && !last")

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import transliteration from '@/utils/transliteration'
import addSpacesToPrice from '@/utils/addSpacesToPrice'
import IconDeleteProductDreambox from "@/components/ui/icons/IconDeleteProductDreambox.vue";
import Checkbox from "@/components/ui/blocks/Checkbox.vue";
export default {
  name: "ProductCardDreambox",
  components: { Checkbox, IconDeleteProductDreambox },
  props: [ 'product', 'isChoice', 'last' ],
  data: () => ({ choice: null }),
  methods: {
    ...mapActions({ SET_NOTIFICATION: 'notifications/SET_NOTIFICATION' }),
    ...mapMutations({ CHANGE_DREAMBOX: 'dreambox/CHANGE_DREAMBOX' }),
    getTransliteration: word => transliteration(word),
    addSpacesToPrice: price => addSpacesToPrice(price)
  },
  created () { this.choice = this.isChoice || false }
};
</script>

<style lang="scss">
  .product-card-dreambox {
    width: 744px;

    .product-card-dreambox__img {
      width: 110px;
      min-width: 110px;
      height: 140px;
      border: 1px solid #E8EAED;
      border-radius: 10px;
      overflow: hidden;
    }

    .product-card-dreambox__img img {
      width: 110px;
      min-width: 110px;
      height: 140px;
    }

    .product-card-dreambox__name,
    .product-card-dreambox__details,
    .product-card-dreambox__price,
    .product-card-dreambox__oldprice {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
    }

    .product-card-dreambox__name {
      font-size: 16px;
      line-height: 19px;
      color: #2E333A;
    }

    .product-card-dreambox__details {
      font-size: 14px;
      line-height: 17px;
      color: #8791A0;
    }

    .product-card-dreambox__price {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      text-align: right;
      color: #2E333A;
    }

    .product-card-dreambox__oldprice {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
      text-decoration-line: line-through;
      color: #A3AAB5;
    }
  }

  @media (max-width: 767px) {
    .product-card-dreambox__img {
      width: 80px;
      min-width: 80px;
      height: 100px;
    }
    .product-card-dreambox__img img {
      width: 80px;
      min-width: 80px;
      height: 100px;
    }
  }

</style>
