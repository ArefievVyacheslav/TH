<template lang="pug">
  .mt24px
    .df.jcsb(:class="{ 'mb16px': $mq !== 'sm', 'mb12px': $mq === 'sm' }")
      .product__info Выбор размера
      //span.product__info-description Таблица размеров

    .df.fww.g6
      button.product__size.blue-btn-hover.blue-btn-active.df.jcc.aic.cp(
        v-for="size,idx in [...new Set(sizes.concat())]" :key="size" :class="{ 'product__size_active': size === currentSize }" @click="currentSize = size"
      ) {{ size }}

</template>

<script>
export default {
  name: "ProductSizes",
  props: [ 'sizes' ],
  data: () => ({ currentSize: null }),
  created () {
    this.currentSize = this.sizes[ 0 ]
  }
}
</script>

<style lang="scss">
  .product__info,
  .product__size {
    font-family: 'Inter',serif;
    font-style: normal;
    color: #2E333A;
  }

  .product__info {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }

  .product__size {
    padding: 11px 21px;
    background: #F6F7F9;
    border-radius: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    border: 1px solid transparent;
  }

  .product__size:hover,
  .product__size_active {
    background: #2D78EA;
    color: #fff;
  }

  @media (max-width: 1150px) {
    .product__size {
      padding: 11px 33px;
    }
  }

  @media (max-width: 767px) {
    .product__size {
      padding: 11px 22px;
    }
  }

</style>
