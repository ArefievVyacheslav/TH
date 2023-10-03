<template lang="pug">
  .product-card.pos-rel.cp
    .pos-abs(@click.stop="likeHandler(product)" :class="{ 't12px r10px': $mq !== 'sm', 't7px r8px': $mq === 'sm' }")
      IconLikeProductOnCart(v-if="!inDreamBox")
      IconAddDreamboxMobileActive(v-else)

    nuxt-link.tdn(:to="`/product/${getTransliteration(product.name)}-${product.collection}-${product.id}`")
      .product-card__placeholder
        b-img-lazy(v-if="!isImageError" :src="`${product.image}`" :width="imageSize.width" :height="imageSize.height"
          blank-src="/placeholder.svg" class="product-img" :alt="`Фотография товара ${product.name}`"
          :title="`Фотография для карточки товара ${product.name} | Sales-search`")
        img(v-else= src="/placeholder.svg" :width="imageSize.width" :height="imageSize.height" class="product-img" :alt="`Фотография товара ${product.name}`")

      .product-card__price.df.aic
        .product-card__price-discount.mr10px(:class="{ 'pos-abs': $mq !== 'lg' }") {{ product.sale }}%
        .product-card__price-oldprice.mr10px {{ addSpacesToPrice(product.oldprice) }} ₽
        .product-card__price-newprice {{ addSpacesToPrice(product.price) }} ₽

      .product-card__name.mb27px {{ product.brand.toUpperCase() }} / {{ product.name }}
      .pos-abs.df.aic.b0(v-if="product.like")
        IconLikeProductCart
        .product-card__like-count.ml4px {{ product.like }}

</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import IconLikeProductCart from "@/components/ui/icons/IconLikeProductCart.vue";
import IconLikeProductOnCart from "@/components/ui/icons/IconLikeProductOnCart.vue";
import transliteration from "@/utils/transliteration";
import addSpacesToPrice from '@/utils/addSpacesToPrice'
import IconAddDreamboxMobileActive from "@/components/ui/icons/IconAddDreamboxMobileActive.vue";
export default {
  name: "ProductCard",
  components: { IconAddDreamboxMobileActive, IconLikeProductCart, IconLikeProductOnCart },
  props: [ 'product' ],
  data: () => ({ isImageError: false, isLike: false }),
  computed: {
    ...mapState({ dreambox: state => state.dreambox.dreambox }),
    imageSize () {
      if (this.$mq === 'lg') return { height: 350, width: 264 }
      if (this.$mq === 'md') return { height: 308, width: 232 }
      if (this.$mq === 'sm') return { height: 212, width: 160 }
      return {}
    },
    inDreamBox () {
      return this.dreambox.map(prod => prod.id).includes(this.product.id)
    }
  },
  watch: {
    inDreamBox (nV) {
      nV
        ? this.SET_NOTIFICATION({ text: 'Товар добавлен в дримбокс', type: 'success', autoHideDelay: 2 })
        : this.SET_NOTIFICATION({ text: 'Товар убран из дримбокса', type: 'warning', autoHideDelay: 2 })
    }
  },
  methods: {
    ...mapMutations('dreambox', [ 'CHANGE_DREAMBOX' ]),
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    setLike (product) {
      if (!this.isLike && this.inDreamBox) this.$axios.post('like', { collection: product.collection, id: product.id })
      this.isLike = true
    },
    likeHandler (product) {
      this.CHANGE_DREAMBOX(product)
      this.setLike(product)
      this.$metrika.reachGoal('likeOnCartProduct')
      this.$metrika.reachGoal('addDreambox')
    },
    getTransliteration (word) {
      return transliteration(word)
    },
    addSpacesToPrice (num) {
      return addSpacesToPrice(num)
    }
  }
};
</script>

<style lang="scss">
  .product-card {
    width: calc(25% - 22px);
    margin-bottom: 24px;
    border-radius: 10px;

    .product-card__placeholder,
    .product-img {
      width: 264px;
      height: 350px;
      border-radius: 10px;
    }

    .product-card__price {
      padding: 13px 0 12px;

      .product-card__price-discount,
      .product-card__price-oldprice,
      .product-card__price-newprice {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
      }

      .product-card__price-discount {
        padding: 2px 8px 3px;
        background: #2D78EA;
        border-radius: 6px;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
      }

      .product-card__price-oldprice {
        font-size: 18px;
        line-height: 22px;
        text-decoration-line: line-through;
        color: #A3AAB5;
      }

      .product-card__price-newprice {
        font-size: 18px;
        line-height: 22px;
        color: #2E333A;
      }
    }

    .product-card__name,
    .product-card__like-count {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }

    .product-card__name {
      color: #2E333A;
    }

    .product-card__like-count {
      color: #A3AAB5;
    }
  }

  @media screen and (max-width: 1150px) {
    .product-card {
      width: 232px !important;

      .product-card__placeholder,
      .product-img {
        width: 232px;
        height: 308px;
      }

      .product-card__price-discount {
        top: 271px;
        left: 14px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .product-card {
      width: 160px !important;

      .product-card__placeholder,
      .product-img {
        width: 160px;
        height: 212px;
      }

      .product-card__price {
        padding: 10px 0 8px;

        .product-card__price-discount {
          top: 182px;
          left: 10px;
          line-height: 15px !important;
        }

        .product-card__price-oldprice,
        .product-card__price-newprice {
          font-size: 14px !important;
          line-height: 17px !important;
        }

        .product-card__name {
          font-size: 12px !important;
        }
      }

      .product-card__name {
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 371px) {
    .product-card {
      width: 232px !important;

      .product-card__placeholder,
      .product-img {
        width: 232px;
        height: 308px;
      }

      .product-card__price-discount {
        top: 271px !important;
        left: 14px !important;
      }
    }
  }

</style>
