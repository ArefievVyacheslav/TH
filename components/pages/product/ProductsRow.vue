<template lang="pug">
  div(:class="{ mt90px: $mq === 'lg' && $route.path !== '/' }")
    .products-row__header(v-if="header" :class="{ mb24px: $mq !== 'sm', mb16px: $mq === 'sm' }") {{ header }}
    .tag-wrapper__scroll.df.jcsb
      ProductCard(v-for="product in products ? products : $store.state.products.lookProducts" :key="product.id" :product="product" :class="{ mr15px: $mq !== 'lg' }")

</template>

<script>
import ProductCard from "@/components/pages/catalog/ProductCard.vue";
export default {
  name: "ProductsRow",
  components: { ProductCard },
  props: [ 'header', 'products', 'length' ]
}
</script>

<style lang="scss">
  .products-row__header {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #2E333A;
  }

</style>
