<template lang="pug">
  .products-sale
    .main__header.m0.p0 Хиты продаж
    //ProductsRow(:products="hitsProducts" length="4" :class="{ mt40px: $mq === 'lg', mt24px: $mq === 'md', mt20px: $mq === 'sm' }")

</template>

<script>
import ProductsRow from "@/components/pages/product/ProductsRow.vue";
export default {
  name: "ProductsHits",
  components: { ProductsRow },
  // async fetch () {
  //   const filters = this.copyObj(this.$store.getters[ "filters/GET_TOTAL_FILTERS" ])
  //   filters.sortObj = {}
  //   filters.sortObj.like = -1
  //   filters.pagination.page = 1
  //   const { data } = await this.$axios.post('/products', filters)
  //   this.hitsProducts = data.products.slice(0, 4)
  // },
  // data: () => ({ hitsProducts: null }),
  // methods: {
  //   copyObj: obj => JSON.parse(JSON.stringify(obj))
  // }
}
</script>

<style lang="scss">

</style>
