<template lang="pug">
  .catalog.df.jcsb.fww
    ProductCard(v-for="product in $store.state.products?.products" :product="product" @click="setMetrika" :key="product?.id")

</template>

<script>
import ProductCard from "@/components/pages/catalog/ProductCard.vue";
export default {
  name: "Catalog",
  components: { ProductCard },
  methods: {
    setMetrika () {
      this.$metrika.reachGoal('cartProductOnCatalog')
    }
  }
};
</script>

<style lang="scss">
  @media (max-width: 371px) {
    .catalog {
      justify-content: center !important;
    }
  }

</style>
