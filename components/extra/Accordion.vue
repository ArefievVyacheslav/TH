<template lang="pug">
  .accordion.cp(@click="isShow = !isShow" :style="styles")
    .df.jcsb.aic(:class="{ mb20px: isShow && (text || table) }")
      .accordion__header {{ header }}
      .accordion__arrow-wrapper
        IconArrowDownGreyMedium(color="#2E333A" :class="{ rotate180deg: isShow }")

    transition(name="fade")
      p.accordion__description(v-if="isShow && productDescription") {{ productDescription }}

    transition(name="fade")
      div(v-if="isShow && table")
        .df.jcsb.aic.g12(
          v-for="param,val,idx in table" :key="param"
          :class="{ 'bt1gr pt14px': idx !== 0 && $mq !== 'sm', pb14px: idx !== Object.keys(table).length - 1 && $mq !== 'sm', 'bt1gr pt10px': idx !== 0 && $mq === 'sm', pb10px: idx !== Object.keys(table).length - 1 && $mq === 'sm' }"
        )
          .accordion__param(v-if="!Array.isArray(table)") {{ val }}
          .accordion__description {{ param }}

</template>

<script>
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
export default {
  name: "Accordion",
  components: { IconArrowDownGreyMedium },
  props: [ 'header', 'styles', 'text', 'productDescription', 'table' ],
  data: () => ({ isShow: false }),
  created () { this.isShow = !!this.table || !!this.productDescription }
}
</script>

<style lang="scss">
  .accordion {
    width: 100%;
    padding: 16px 16px 16px 22px;
    background: #F6F7F9;
    border-radius: 16px;

    .accordion__header,
    .accordion__description,
    .accordion__param {
      font-family: 'Inter',serif;
      font-style: normal;
      color: #2E333A;
    }

    .accordion__header {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
    }

    .accordion__description,
    .accordion__param {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }

    .accordion__param {
      color: #6A7380;
    }

    .accordion__arrow-wrapper {
      background: transparent;
      padding: 5px 11px 9px;
      border-radius: 50%;
    }

    .bt1gr {
      border-top: 1px solid #EAECF1;
    }
  }

  .accordion:hover .accordion__arrow-wrapper {
    background: #EAECF1;
  }
  .accordion:active .accordion__arrow-wrapper {
    background: #D7DBE4;
  }
  .accordion:hover svg .icon-arrow-down-grey-medium {
    fill: #2D78EA;
  }

</style>
