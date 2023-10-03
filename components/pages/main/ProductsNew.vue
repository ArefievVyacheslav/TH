<template lang="pug">
  .products-new
    .main__header.m0.p0.mb40px Новинки
    ProductsRow(:products="newProducts" length="4")

</template>

<script>
import ProductsRow from "@/components/pages/product/ProductsRow.vue";

export default {
  name: "ProductsNew",
  components: { ProductsRow },
  async fetch () {
    // const data = await this.$axios.post('/products', {})
    // this.newProducts = data
  },
  data: () => ({ newProducts: null })
}
</script>

<style lang="scss">

</style>
