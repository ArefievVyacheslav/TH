<template lang="pug">
  .shops
    .main__header.m0.p0 Магазины
    .df.fww(:class="{ 'mt40px g24': $mq === 'lg', 'mt24px g20': $mq === 'md', 'mt20px g20': $mq === 'sm' }")
      .main__wrap.main__wrap_shops.df.jcc.aic(v-for="shop in shops" :key="shop.link")
        b-img-lazy.shops__img(:src="shop.icon" blank-src="/placeholder-transparent.svg" :alt="'icon shop ' + shop.name")

</template>

<script>
export default {
  name: "Shops",
  data: () => ({
    shops: [
      { name: 'sportmaster', link: '/catalog/clothes/sportmaster', icon: '/img/main-page/shops/Sportmaster 1.svg' },
      { name: 'lgcity', link: '/catalog/clothes/lgcity', icon: '/img/main-page/shops/image 92 (Traced).svg' },
      { name: 'brandshop', link: '/catalog/clothes/brandshop', icon: '/img/main-page/shops/image 93 (Traced).svg' },
      { name: 'ridestep', link: '/catalog/clothes/ridestep', icon: '/img/main-page/shops/image 94 (Traced).svg' },
      { name: 'nonconform', link: '/catalog/clothes/nonconform', icon: '/img/main-page/shops/image 95 (Traced).svg' },
      { name: 'mavi', link: '/catalog/clothes/mavi', icon: '/img/main-page/shops/Mavi_Jeans_Logo 1.svg' },
      { name: 'elyts', link: '/catalog/clothes/elyts', icon: '/img/main-page/shops/Frame.svg' },
      { name: 'vipavenue', link: '/catalog/clothes/vipavenue', icon: '/img/main-page/shops/Frame (1).svg' }
    ]
  })
}
</script>

<style lang="scss">
  .main__wrap_shops {
    width: 264px;
    height: 264px;
  }

  @media (max-width: 1150px) {
    .main__wrap_shops {
      width: 232px;
      height: 232px;
    }
    .main__wrap_shops:nth-child(7),
    .main__wrap_shops:nth-child(8) {
      width: 358px;
      height: 264px;
    }
  }

  @media (max-width: 767px) {
    .main__wrap_shops {
      width: 100px;
      height: 100px;
      border-radius: 20px !important;

      .shops__img {
        width: auto;
        height: auto;
        max-width: 80px;
        max-height: 63px;
      }
    }
    .main__wrap_shops:nth-child(7),
    .main__wrap_shops:nth-child(8) {
      width: 160px;
      height: 100px;
    }
    .main__wrap_shops:nth-child(7) {
      .shops__img {
        width: auto;
        height: auto;
        max-width: 81px;
      }
    }
    .main__wrap_shops:nth-child(8) {
      .shops__img {
        width: auto;
        height: auto;
        max-width: 121px;
      }
    }
  }

</style>
