<template lang="pug">
  .brand-run-string
    .container
      .main__header.m0.p0.mb35px Популярные бренды

    .ticker-container
      .ticker-content(:style="tickerStyle")
        .ticker-item(v-for="brand,idx in brandsWithDuplicates" :key="idx")
          b-img-lazy(:src="brand" blank-src="/placeholder-transparent.svg" alt="Brand Logo" width="140" height="70")

</template>

<script>
export default {
  name: "BrandRunString",
  data: () => ({
    brands: [ '/img/main-page/brands/1.svg','/img/main-page/brands/2.svg','/img/main-page/brands/3.svg','/img/main-page/brands/4.svg','/img/main-page/brands/5.svg','/img/main-page/brands/6.svg','/img/main-page/brands/7.svg','/img/main-page/brands/8.svg','/img/main-page/brands/9.svg','/img/main-page/brands/10.svg','/img/main-page/brands/11.svg','/img/main-page/brands/12.svg'],
    tickerPosition: 0,
    tickerTimer: null,
    tickerSpeed: 140
  }),
  computed: {
    brandsWithDuplicates() {
      return [...this.brands, ...this.brands]
    },
    tickerStyle() {
      return {
        transform: `translateX(-${this.tickerPosition}px)`,
      };
    },
  },
  mounted() {
    this.startTicker();
  },
  methods: {
    startTicker() {
      this.tickerTimer = setInterval(() => {
        this.tickerPosition += this.tickerSpeed;
        const totalWidth = this.calculateTotalWidth();
        if (this.tickerPosition >= totalWidth) {
          this.tickerPosition = this.tickerPosition % totalWidth;
        }
      }, 3000);
    },
    calculateTotalWidth() {
      const brandCount = this.brands.length
      const brandWidth = 140
      const spacing = 21.8182
      return Math.floor((brandCount * brandWidth) + ((brandCount - 1) * spacing))
    },
  },
  beforeDestroy() {
    clearInterval(this.tickerTimer)
  },
};
</script>

<style>
.ticker-container {
  width: 100%;
  height: 70px;
  overflow: hidden;
}

.ticker-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.ticker-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.ticker-item img {
  height: 100%;
  width: auto;
}
</style>
