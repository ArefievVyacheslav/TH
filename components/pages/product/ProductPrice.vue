<template lang="pug">
  div
    .product__price.mt32px.mb32px(v-if="$mq === 'lg'")
      .df.mb20px
        .product__price-discount {{ product.discount }}%
        .df.fdc.ml16px
          .df.aic.g6
            .product__price-price {{ addSpacesToPrice(product.price) }} ₽
            .product__price-oldprice {{ addSpacesToPrice(product.oldprice) }} ₽

          .product__price-benefit Вы экономите {{ addSpacesToPrice(product.benefit) }} ₽

      .product__price-btn-buy.blue-btn-hover.blue-btn-active.df.jcc.aic.mb8px.tdn.cp(
        v-if="$store.state.statistic.isFirstClickProduct" title="Переход на сайт магазина для покупки" v-b-modal.redirect-product-modal @click="showModalFunc"
      ) Купить в {{ productFull.shop }}

      a.product__price-btn-buy.blue-btn-hover.blue-btn-active.df.jcc.aic.mb8px.tdn.cp(
        v-else title="Переход на сайт магазина для покупки" :href="product.link" target="_blank" rel="nofollow" @click="buyHandler"
      ) Купить в {{ productFull.shop }}

      button.product__price-btn-add.df.jcc.aic.cp(@click="dreamboxHandler(productDreambox)" :class="{ 'product__price-btn-add_active': !inDreamBox }") {{ inDreamBox ? 'Добавить в дримбокс' : 'Убрать из дримбокса' }}

    .product__price(:class="{ 'mt32px mb32px': $mq === 'md' }" v-else)
      .df
        .product__price-discount {{ product.discount }}%
        .df.fdc(:class="{ 'ml16px': $mq === 'md', 'ml12px': $mq === 'sm' }")
          .df.aic.g6
            .product__price-price {{ addSpacesToPrice(product.price) }} ₽
            .product__price-oldprice {{ addSpacesToPrice(product.oldprice) }} ₽

          .product__price-benefit Вы экономите {{ addSpacesToPrice(product.benefit) }} ₽

    .product__price-buttons.pos-fixed(v-if="$mq !== 'lg'")
      .container.df.g10
        button.filter-tablet-modal__btn-reset.m0.cp(@click="dreamboxHandler(productDreambox)" :class="{ 'product__price-btn-add_active': !inDreamBox }")
          template(v-if="$mq === 'md'") {{ inDreamBox ? 'Добавить в дримбокс' : 'Убрать из дримбокса' }}
          template(v-else)
            client-only
              IconAddDreamboxMobile(v-if="inDreamBox")
              IconAddDreamboxMobileActive(v-else)

        .filter-tablet-modal__btn-confirm.buy-btn.m0.tdn.cp(v-if="$store.state.statistic.isFirstClickProduct" v-b-modal.redirect-product-modal @click="showModalFunc") Купить в {{ capitalizeWords(productFull.shop) }}
        a.filter-tablet-modal__btn-confirm.m0.mr30px.tdn.cp(v-else :href="product.link" target="_blank" rel="nofollow"  @click="buyHandler") Купить в {{ capitalizeWords(productFull.shop) }}

    Modal(
      ident="redirect-product-modal" @modal-cancel="cancelModalFunc"
      title="Перенаправление" cancelTitle="Не показывать снова" :wrapperStyles="{ 'max-width': '288px', margin: '0 auto' }"
    )

</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import addSpacesToPrice from '@/utils/addSpacesToPrice'
import Modal from "@/components/extra/Modal.vue";
import IconAddDreamboxMobile from "@/components/ui/icons/IconAddDreamboxMobile.vue";
import IconAddDreamboxMobileActive from "@/components/ui/icons/IconAddDreamboxMobileActive.vue";
export default {
  name: "ProductPrice",
  components: { IconAddDreamboxMobileActive, IconAddDreamboxMobile, Modal },
  props: [ 'product', 'productFull' ],
  data: () => ({ isFirstClickProduct: true }),
  computed: {
    ...mapState({ dreambox: state => state.dreambox.dreambox }),
    inDreamBox () {
      return !this.dreambox.map(prod => prod.id).includes(this.productFull.id)
    },
    productDreambox () {
      return {
        brand: this.productFull.brand, category_t: this.productFull.category_t, collection: this.productFull.collection, color: this.productFull.color,
        id: this.productFull.id, images: this.productFull.images[0], like: this.productFull.like, link: this.productFull.link, name: this.productFull.name, oldprice: this.productFull.oldprice,
        price: this.productFull.price, sale: this.productFull.sale, shop: this.productFull.shop, sizes: this.productFull.sizes
      }
    }
  },
  watch: {
    dreambox: {
      deep: true,
      handler (nV) {
        nV.map(prod => prod.id).includes(this.productFull.id)
          ? this.SET_NOTIFICATION({ text: 'Товар добавлен в дримбокс', type: 'success', autoHideDelay: 2 })
          : this.SET_NOTIFICATION({ text: 'Товар убран из дримбокса', type: 'warning', autoHideDelay: 2 })
      }
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    ...mapMutations('dreambox', [ 'CHANGE_DREAMBOX' ]),
    dreamboxHandler (productDreambox) {
      this.CHANGE_DREAMBOX(productDreambox)
      if (this.$metrika) this.$metrika.reachGoal('addDreambox')
    },
    addSpacesToPrice (num) {
      return addSpacesToPrice(num)
    },
    buyHandler () {
      if (this.$metrika) this.$metrika.reachGoal('clickBuy')
    },
    showModalFunc () {
      if (this.$metrika) this.$metrika.reachGoal('clickBuy')
      this.isFirstClickProduct
        ? setTimeout(() => {
          window.open(this.product.link, '_blank')
          this.SET_NOTIFICATION({ text: 'Если страница товара не открывается - отключите расширение AdBlock и т.п.', type: 'info', autoHideDelay: 10 })
        }, 1000)
        : window.open(this.product.link, '_blank')
    },
    cancelModalFunc () {
      if (this.$metrika) this.$metrika.reachGoal('hideRedirectModal')
      setTimeout(() => this.$store.commit('statistic/SET_CLICK_PRODUCTS'), 1000)
    }
  },
  mounted () {
    this.isFirstClickProduct = localStorage.isFirstClickProduct !== 'false'
    if (!this.isFirstClickProduct) this.$store.commit('statistic/SET_CLICK_PRODUCTS')
  }
}
</script>

<style scoped lang="scss">
  @media (max-width: 767px) {
    .filter-tablet-modal__btn-reset {
      max-height: 51px !important;
      max-width: 59px !important;
      padding: 18px 17px !important;
    }
  }

</style>

<style lang="scss">
  .product__price {
    width: 418px;
    padding: 20px;
    border: 1px solid #EAECF1;
    border-radius: 20px;

    .product__price-discount,
    .product__price-price,
    .product__price-oldprice,
    .product__price-benefit,
    .product__price-btn-buy,
    .product__price-btn-add {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
    }

    .product__price-discount {
      padding: 14px 18px;
      font-size: 16px;
      line-height: 19px;
      color: #2D78EA;
      background: #F6F7F9;
      border-radius: 10px;
    }

    .product__price-price {
      font-size: 22px;
      line-height: 27px;
      color: #2E333A;
    }

    .product__price-oldprice {
      font-size: 16px;
      line-height: 19px;
      text-decoration-line: line-through;
      color: #A3AAB5;
    }

    .product__price-benefit {
      font-size: 14px;
      line-height: 17px;
      color: #A3AAB5;
    }

    .product__price-btn-buy,
    .product__price-btn-add {
      width: 100%;
      padding-top: 14px;
      padding-bottom: 14px;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      border: 1px solid transparent;
      border-radius: 10px;
    }

    .product__price-btn-buy {
      background: #2D78EA;
      color: #FFFFFF;
    }
    .product__price-btn-add {
      background: #F6F7F9;
      color: #6A7380;
    }
    .product__price-btn-add:hover {
      background: #EAECF1;
    }
  }

  .product__price-btn-add_active,
  .product__price-btn-add:active {
    background: #DDE1E9 !important;
  }

  .product__price-buttons {
    position: absolute;
    bottom: 53px;
    left: 0;
    width: 100vw;
    height: 51px;
    display: flex;
    justify-content: center;
    padding: 16px 0;
    background-color: #fff;
    z-index: 1;
  }

  @media (max-width: 1150px) {
    .product__price {
      width: 567px !important;
      background: #F6F7F9;
      border: none;

      .product__price-discount {
        padding: 11px 21px;
        background: #FFFFFF;
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
        color: #2D78EA;
      }

      .product__price-price {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #2E333A;
      }
    }
  }

  @media (max-width: 767px) {
    .product__price {
      width: calc(100% - 39px) !important;
      height: 42px !important;
      padding: 16px !important;

      .product__price-discount {
        height: 18px;
        padding: 11px 18px !important;
        font-size: 16px !important;
        line-height: 19px !important;
      }

      .product__price-price {
        font-size: 18px;
        line-height: 22px;
      }

      .product__price-oldprice {
        font-size: 14px;
        line-height: 17px;
      }
    }
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>


