<template lang="pug">
  .products-sale
    .main__header.m0.p0 Самые большие скидки
    //ProductsRow(:products="saleProducts" length="4" :class="{ mt40px: $mq === 'lg', mt24px: $mq === 'md', mt20px: $mq === 'sm' }")

</template>

<script>
import ProductsRow from "@/components/pages/product/ProductsRow.vue";
export default {
  name: "ProductsSale",
  components: { ProductsRow },
  // async fetch () {
  //   const filters = this.copyObj(this.$store.getters[ "filters/GET_TOTAL_FILTERS" ])
  //   filters.sortObj = {}
  //   filters.sortObj.sale = -1
  //   filters.pagination.page = 1
  //   const { data } = await this.$axios.post('/products', filters)
  //   this.saleProducts = data.products.slice(0, 4)
  // },
  // data: () => ({ saleProducts: null }),
  // methods: {
  //   copyObj (obj) {
  //     return JSON.parse(JSON.stringify(obj))
  //   }
  // }
}
</script>
