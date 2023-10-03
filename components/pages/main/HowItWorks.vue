<template lang="pug">
  .how-it-work
    .main__header.m0.p0 Как это работает
    template(v-if="$mq !== 'sm'")
      .df.jcc.aic.g10(:class="{ mt37px: $mq === 'lg', mt24px: $mq === 'md' }")
        template(v-for="step,idx in steps")
          .how-it-work__step-number.df.jcc.aic {{ step.number }}
          b-img-lazy(v-if="idx !== steps.length - 1" src="/step-separation-main.svg" blank-src="/placeholder.svg" alt="step separator" :width="$mq === 'lg' ? 286 : 176" height="2")

      .df.jcsb.aic.mt16px
        .main__wrap.main__wrap_how-it-work.df.fdc.jcsb.acsb(v-for="step,idx in steps" :key="step.number")
          .main__wrap-header.tac {{ step.header }}
          b-img-lazy.m0auto(:src="step.img" blank-src="/placeholder.svg" :alt="step.imgAlt" :width="step.imgSize.width" :height="step.imgSize.height")

    template(v-else)
      .mt24px(v-for="step,idx in steps")
        .how-it-work__step-number.df.jcc.aic.m0auto.mb16px {{ step.number }}
        .main__wrap.main__wrap_how-it-work.df.fdc.jcsb.acsb.m0auto.mb32px
          .main__wrap-header.tac {{ step.header }}
          b-img-lazy.m0auto(:src="step.img" blank-src="/placeholder-transparent.svg" :alt="step.imgAlt" :width="step.imgSize.width" :height="step.imgSize.height")

</template>

<script>
export default {
  name: "HowItWorks",
  data: () => ({
    steps: [
      { number: '01', header: 'Робот посещает магазины известных брендов', img: '/step-robot-main.svg', imgAlt: 'Robot icon', imgSize: { width: 80, height: 80 } },
      { number: '02', header: 'Собирает все товары из раздела скидок', img: '/step-products-main.svg', imgAlt: 'Products icon', imgSize: { width: 140, height: 80 } },
      { number: '03', header: 'Выводит в нашем каталоге для удобных покупок', img: '/step-final-main.svg', imgAlt: 'Final icon', imgSize: { width: 80, height: 80 } }
    ]
  })
}
</script>

<style lang="scss">
  .how-it-work__step-number {
    width: 80px;
    height: 80px;
    background: #F6F7F9;
    border-radius: 24px;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #2D78EA;
  }

  .main__wrap_how-it-work {
    width: 280px;
    height: 205px;
    padding: 30px 40px;
  }

  @media (max-width: 1150px) {
    .how-it-work__step-number {
      width: 60px;
      height: 60px;
      font-size: 20px;
      line-height: 24px;
    }
    .main__wrap_how-it-work {
      width: 184px;
      padding: 30px 24px;
    }
  }

  @media (max-width: 767px) {
    .main__wrap_how-it-work {
      width: 292px;
      height: 150px;
      padding: 30px 24px;
    }
  }

</style>
