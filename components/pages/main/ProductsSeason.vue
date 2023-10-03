<template lang="pug">
  .products-sale
    .main__header.m0.p0 Покупки сезона
    //ProductsRow(:products="seasonProducts" length="4" :class="{ mt40px: $mq === 'lg', mt24px: $mq === 'md', mt20px: $mq === 'sm' }")

</template>

<script>
import ProductsRow from "@/components/pages/product/ProductsRow.vue";
export default {
  name: "ProductsSeason",
  components: { ProductsRow },
  // async fetch () {
  //   const filters = this.copyObj(this.$store.getters[ "filters/GET_TOTAL_FILTERS" ])
  //   filters.findObj.subcategory = { $in: [ 'Шорты', 'Футболки' ] }
  //   filters.sortObj = {}
  //   filters.sortObj.sale = -1
  //   filters.pagination.page = 1
  //   const { data } = await this.$axios.post('/products', filters)
  //   this.seasonProducts = data.products.slice(0, 4)
  // },
  // data: () => ({ seasonProducts: null }),
  // methods: {
  //   copyObj: obj => JSON.parse(JSON.stringify(obj))
  // }
}
</script>

<style lang="scss">

</style>
