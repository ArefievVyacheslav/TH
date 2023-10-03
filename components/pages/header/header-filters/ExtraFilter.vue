<template lang="pug">
  .filter__item.filter__item_extra.pos-rel.df.jcsb.aic.cp.clickable(
    v-b-toggle="disabled ? false : 'sidebar-extra-filters'" :class="{ 'filter__item_hover': !disabled, 'cnd': disabled }"
  )
    .filter__name.filter__name_gender(:class="{ disabled }") {{ $mq === 'sm' ? 'Доп. фильтры' : 'Доп. параметры' }}
    .number-selected-options.pos-abs(v-if="countExtraFilters" :class="{ ml122px: $mq !== 'sm', ml102px: $mq === 'sm' }") {{ countExtraFilters }}
    IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
      :disabled="disabled" :class="{ 'menu-links__icon-arrow-down-active': isShowExtraSidebar && !disabled }"
    )

</template>

<script>
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
export default {
  name: "ExtraFilter",
  components: { IconArrowDownGreyMedium },
  props: [ 'disabled' ],
  data: () => ({ isShowExtraSidebar: false, countExtraFilters: 0 }),
  created () {
    this.$root.$on('show-extra-filters', condition => this.isShowExtraSidebar = condition)
    this.$root.$on('count-extra-filters', count => this.countExtraFilters = count)
  }
};
</script>

<style lang="scss">
  .clickable {
    cursor: pointer;
  }
  .filter__item_extra {
    width: 165px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .filter__item_extra:after {
    content: none;
    display: none !important;
  }
  @media (min-width: 1150px) {
    .filter__item_extra:before {
      content: '';
      position: absolute;
      left: 0;
      display: block;
      height: 36px;
      width: 1px;
      background: #EAECF1;
    }
  }
  @media (max-width: 767px) {
    .filter__item_extra {
      max-width: 104px !important;
    }
  }

</style>
