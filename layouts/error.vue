<template lang="pug">
.container(:class="{ mb150px: $mq === 'lg', mb50px: $mq !== 'lg' }")
  .dream-box__empty.df.fdc.jcc.aic(:class="{ 'mt50px': $mq === 'lg', 'mt32px': $mq !== 'lg' }")
    h1.dream-box__header Ошибка 404
    p.dream-box__empty-desc(:class="{ mt24px: $mq !== 'sm', mt16px: $mq === 'sm' }") Перейдите на главную, чтобы выбрать товары или воспользуйтесь удобными фильтрами
    nuxt-link.dream-box__empty-link-main.filter__btn-search.blue-btn-hover.blue-btn-active.df.jcc.aic.cp.tdn(
      to="/" :class="{ mt40px: $mq !== 'sm', mt24px: $mq === 'sm' }"
    ) Перейти на главную

</template>

<script>

export default {
  name: "error"
}
</script>

<style lang="scss">
.main__header {
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #2E333A;
}

.main__wrap {
  background: #F6F7F9;
  border-radius: 40px;
}

.main__wrap-header {
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #6A7380;
}

.dream-box__empty {
  padding: 50px 340px;
  background: #F6F7F9;
  border-radius: 40px;

  .dream-box__empty-desc {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #6A7380;
  }

  .dream-box__empty-link-main {
    width: 230px;
    height: 51px;
  }
}

.dream-box__header,
.dream-box__count,
.dream-box__choice-all,
.dream-box__delete-choice,
.dream-box__total-param,
.dream-box__total-value,
.dream-box__total-params-total,
.dream-box__total-desc,
.dream-box__empty-desc {
  font-family: 'Inter',serif;
  font-style: normal;
}

.dream-box__header {
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #2E333A;
}

.dream-box__count {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #A3AAB5;
}

.dream-box__choice-all {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6A7380;
}
.dream-box__choice-all:hover {
  color: #2D78EA;
}

.dream-box__choice-all:hover .checkbox {
  border: 2px solid #6BA0F0;
}

.dream-box__delete-choice {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #EA2D2D;
}

.dream-box__total {
  width: 312px;
  height: 256px;
  padding: 24px 28px 28px 28px;
  background: #F6F7F9;
  border-radius: 30px;
}

.dream-box__total-param {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #6A7380;
}

.dream-box__total-value {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  letter-spacing: 0.02em;
  color: #2E333A;
}

.dream-box__total-separator {
  width: 100%;
  height: 1px;
  background-color: #EAECF1;
}

.dream-box__total-params-total {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: right;
  color: #2E333A;
}

.dream-box__total-btn-buy {
  width: 100% !important;
  height: 51px;
}

.dream-box__total-desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #8791A0;
}

@media (max-width: 1150px) {
  .dream-box__header {
    font-size: 20px;
    line-height: 24px;
  }
  .product-card-dreambox__details {
    font-size: 14px;
    line-height: 17px;
  }
  .dream-box__btn-buy {
    width: 300px;
  }
  .dream-box__separator_tablet {
    height: 20px;
    width: 100%;
    background-color: #F6F7F9;
  }
  .dream-box__total {
    width: 100% !important;
    margin-top: 0 !important;
    padding: 0 !important;
    border-radius: 0 !important;
    background-color: #fff !important;
  }
  .dream-box__empty {
    padding: 40px 144px !important;
  }
  .main__header {
    font-size: 20px !important;
    line-height: 24px !important;
  }
  .main__wrap-header {
    font-size: 16px !important;
    line-height: 19px !important;
  }
}

@media (max-width: 767px) {
  .dream-box__empty {
    padding: 30px 13px !important;

    .dream-box__header {
      font-size: 20px !important;
      line-height: 24px !important;
    }
    .dream-box__empty-desc {
      font-size: 14px !important;
      line-height: 17px !important;
    }
  }
  .dream-box__header,
  .dream-box__total-params-total {
    font-size: 18px !important;
    line-height: 22px !important;
  }
  .product-card-dreambox__name,
  .dream-box__total-param {
    font-size: 14px !important;
    line-height: 17px !important;
  }
  .dream-box__btn-buy {
    width: 170px !important;
  }
  .dream-box__total-params-total {
    font-size: 20px !important;
  }
}

</style>
