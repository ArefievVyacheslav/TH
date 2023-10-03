<template lang="pug">
  .my-data.df.aic
    .container.df(:class="{ 'mt22px mb16px p0': !isShowHeaderFirstView && $mq !== 'sm', 'mt16px jcsb': $mq === 'sm', mt30px: isShowHeaderFirstView }")
      Switcher(v-if="$mq !== 'sm'" :class="{ mt1px: $mq === 'md' }")
      span.my-data__text.mt3px.ml10px(v-if="$mq !== 'sm'") Мои данные
      .df.aic(v-else)
        span.my-data__text.mt3px.ml10px Мои данные
        IconSetMyData.mt1px.ml8px(v-if="$mq !== 'lg'" @click="isModalMyFiltersSetShowing = !isModalMyFiltersSetShowing")

      span.my-data__text.my-data__text_setting.mt3px.ml10px.cp(v-if="$mq === 'lg'" @click="isModalMyFiltersSetShowing = !isModalMyFiltersSetShowing") Настроить
      IconSetMyData.mt1px.ml8px(v-if="$mq === 'md'" @click="isModalMyFiltersSetShowing = !isModalMyFiltersSetShowing")
      Switcher(v-if="$mq === 'sm'")

</template>

<script>
import Switcher from "@/components/ui/blocks/Switcher.vue";
import IconSetMyData from "@/components/ui/icons/IconSetMyData.vue";
export default {
  name: "HeaderMyData",
  components: { IconSetMyData, Switcher },
  props: [ 'isShowHeaderFirstView' ],
  data: () => ({ isModalMyFiltersSetShowing: false })
};
</script>

<style lang="scss">
  .my-data {
    gap: 10px;
    background: #EAECF1;

    .my-data__text {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #303030
    }

    .my-data__text_setting {
      color: #2D78EA;
    }
  }

  @media (max-width: 1150px) {
    .my-data__text {
      font-size: 14px !important;
    }
  }

</style>
