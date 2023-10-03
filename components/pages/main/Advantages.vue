<template lang="pug">
  .advantages
    .main__header.m0.p0 Преимущества
    .df.jcsb.fww(:class="{ mt40px: $mq === 'lg', mt24px: $mq === 'md', mt20px: $mq === 'sm' }")
      .main__wrap(v-for="advantage,idx in advantages" :key="advantage.key" :class="{ 'main__wrap_advantages-first-two mb24px': idx < 2, 'main__wrap_advantages-others': idx > 1 }")
        .main__wrap-header.main__wrap-header_advantage {{ advantage.header }}
        b-img-lazy.advantages__img(
          :src="advantage.img" blank-src="/placeholder-transparent.svg" :alt="advantage.imgAlt"
          :class="{ idx0: idx === 0, idx1: idx === 1, idx2: idx === 2, idx3: idx === 3, idx4: idx === 4 }"
        )

</template>

<script>
export default {
  name: "Advantages",
  data: () => ({
    advantages: [
      { key: 'sale', header: 'Все товары со скидками', img: '/img/main-page/advantage/advantage-sale-main.png', imgAlt: 'sale icon' },
      { key: 'brand', header: 'Только оригинальные бренды', img: '/img/main-page/advantage/advantage-brand-main.png', imgAlt: 'brand icon' },
      { key: 'choice', header: 'Огромный выбор', img: '/img/main-page/advantage/advantage-choice-main.png', imgAlt: 'choice icon' },
      { key: 'shop', header: 'Только официальные магазины в каталоге', img: '/img/main-page/advantage/advantage-shop-main.svg', imgAlt: 'shop icon' },
      { key: 'filter', header: 'Удобные фильтры', img: '/img/main-page/advantage/advantage-filter-main.svg', imgAlt: 'filter icon' }
    ]
  })
}
</script>

<style scoped lang="scss">
  .idx0 {
    display: block;
    margin: 18px auto 0;
  }
  .idx1 {
    margin-top: 70px;
  }
  .idx2 {
    margin-top: 54px;
  }
  .idx3 {
    margin-left: 70px;
    margin-top: 48px;
  }
  .idx4 {
    margin-left: 55px;
    margin-top: 55px;
  }

  @media (max-width: 1150px) {
    .idx1 {
      margin-top: 50px;
      margin-left: 25px;
    }
    .idx2 {
      margin-top: 41px;
    }
    .idx3 {
      margin-left: 36px;
      margin-top: 16px;
      max-width: 160px !important;
    }
    .idx4 {
      margin-left: 24px;
      margin-top: 30px;
      max-width: 183px !important;
    }

    @media (max-width: 767px) {
      .idx1 {
        margin-top: 35px;
        margin-left: 15px;
      }
      .idx2 {
        margin-top: 30px;
        margin-left: 50px;
      }
      .idx3 {
        display: block;
        margin: 15px auto;
      }
      .idx4 {
        display: block;
        margin: 23px auto;
      }
    }
  }

</style>

<style lang="scss">
  .main__wrap-header_advantage {
    margin: 40px 40px 0 40px !important;
  }

  .main__wrap_advantages-first-two {
    width: 552px;
    height: 390px;
  }

  .main__wrap_advantages-others {
    width: 360px;
    height: 370px;
    overflow: hidden;
  }

  @media (max-width: 1150px) {
    .main__wrap-header_advantage {
      margin: 30px 30px 0 30px !important;
    }

    .main__wrap_advantages-first-two {
      width: 358px;
      height: 250px;

      .advantages__img {
        width: auto;
        height: auto;
        max-width: 310px;
      }
    }
    .main__wrap_advantages-others {
      width: 232px;
      height: 250px;

      .advantages__img {
        width: auto;
        height: auto;
        max-width: 210px;
      }
    }
  }

  @media (max-width: 767px) {
    .main__wrap_advantages-first-two,
    .main__wrap_advantages-others {
      margin-bottom: 16px;
      width: 340px;
      height: 230px;
    }
    .main__wrap_advantages-others:last-child {
      margin-bottom: 0;
    }
  }

</style>
