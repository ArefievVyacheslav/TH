<template lang="pug">
  div
    ul.pagination.df.m0.p0
      li.pagination__item(v-for="page in pageCount" :key="page")
        a.pagination__item.tdn(:href="getPaginationUrl(page)") {{ page }}

    img(v-if="downloading" class="db m0auto mb24px" :class="{ 'mt-12px': $mq === 'sm' }" :height="$mq !== 'sm' ? 100 : 50" src="/placeholder-transparent.svg")

</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Pagination",
  data: () => ({ currentPage: 1, download: true, init: false, downloading: false }),
  computed: {
    pageCount () {
      return Math.ceil(this.$store.state.products.quantity / this.$store.state.filters.pagination.show) || 1
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    getPaginationUrl (page) {
      const path = this.$route.path.split('/')
      let totalPath = null
      if (page === 1) return path.filter(section => !section.includes('page')).join('/')
      else {
        totalPath = path.reduce((acc, section) => {
          if (section.includes('page')) {
            const pageParamArr = section.split('-')
            pageParamArr[ 1 ] = page
            acc.push(pageParamArr[ 0 ] + '-' + pageParamArr[ 1 ])
          } else acc.push(section)
          return acc
        }, []).join('/')
        return totalPath.includes('page') ? totalPath : totalPath += '/page-' + page
      }
    },
    setPage () {
      const arrLetter = this.$route.path.split('')
      if (this.$route.path.includes('page')) this.currentPage = +arrLetter[arrLetter.length - 1]
    },
    check () {
      this.download = false
      setTimeout(() => this.download = true, 7)
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    const callback = async (entries) => {
      if (entries[0].isIntersecting && this.download && this.currentPage < this.pageCount && this.init) {
        this.SET_NOTIFICATION({ text: 'Загружаю товары...', type: 'success' })
        this.downloading = true
        this.check()
        this.currentPage = this.currentPage + 1
        this.$store.commit('filters/SET_PAGE_PARAM', this.currentPage)
        if (!this.$route.path.includes('clothes') && !this.$route.path.includes('shoes') && !this.$route.path.includes('accessories'))
          await this.$store.dispatch("products/FETCH_PUSH_PRODUCTS", { brandPage: true })
        else await this.$store.dispatch('products/FETCH_PUSH_PRODUCTS')
        this.downloading = false
        this.SET_NOTIFICATION(null)
      }
      this.check()
    }
    const options = { threshold: 0.1 }
    const target = document.querySelector('.pagination')
    if (target) {
      const observer = new IntersectionObserver(callback, options)
      observer.observe(target)
    }
    this.setPage()
  }

};
</script>

<style lang="scss">
  .pagination__item {
    color: white;
    list-style-type: none;
  }

</style>
