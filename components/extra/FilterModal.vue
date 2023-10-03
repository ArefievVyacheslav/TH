<template lang="pug">
  .filter-tablet(:class="{ 'active-backdrop': isShow }")
    .filter-tablet__modal.pos-rel(@click.stop)
      .pos-abs.t21px.r16px(@click.stop="closeModal")
        IconCloseModalFilterTablet

      .filter-tablet-modal__header.mt16px {{ filterName }}
      .pl19px.mt18px
        slot
        .df.jcsb.g12.mr16px
          button.filter-tablet-modal__btn-reset.cp(v-if="reset" @click="$emit('reset')") Сбросить
          button.filter-tablet-modal__btn-confirm.cp(@click="confirm") Готово

</template>

<script>
import IconCloseModalFilterTablet from "@/components/ui/icons/IconCloseModalFilterTablet.vue";

export default {
  name: "FilterTabletModal",
  components: { IconCloseModalFilterTablet },
  props: [ 'filterName', 'reset' ],
  data: () => ({ isShow: true }),
  methods: {
    closeModal () {
      this.isShow = false
      this.$emit('close')
    },
    confirm () {
      this.closeModal()
      this.$emit('accept')
    },
    handleClickOutside (event) {
      let isDropdownClickAway
      const path = event.path || (event.composedPath && event.composedPath())
      path.forEach(el => isDropdownClickAway = el.className !== 'filter-tablet__modal')
      if (isDropdownClickAway) this.closeModal()
    },
    disableModal (condition) {
      if (condition) {
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
      }
      else {
        document.body.style.height = "initial";
        document.body.style.overflow = "initial";
      }
    }
  },
  mounted () {
    this.disableModal(true)
    setTimeout(() => document.addEventListener('click', this.handleClickOutside), 10)
    this.$root.$emit('show-adaptive-filter-modal', true)
  },
  destroyed () {
    this.disableModal(false)
    document.removeEventListener('click', this.handleClickOutside)
    this.$root.$emit('show-adaptive-filter-modal', false)
  }
};
</script>

<style lang="scss">
  .filter-tablet {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;

    .filter-tablet__modal {
      position: fixed;
      bottom: 0;
      width: 767px;
      left: calc((100% - 767px) / 2);
      background: #FFFFFF;
      border-radius: 20px 20px 0 0;
      z-index: 1;

      .filter-tablet-modal__header {
        text-align: center;
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #B3B3B3;

      }
    }
  }

  .filter-tablet-modal__btn-confirm,
  .filter-tablet-modal__btn-reset {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 17px;
    margin-bottom: 18px;
    padding: 16px 32px;
    width: 100%;
    border-radius: 10px;
    border: none;
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
  }

  .filter-tablet-modal__btn-confirm {
    background: #2D78EA;
    color: #FFFFFF;
  }

  .filter-tablet-modal__btn-reset {
    background: #F6F7F9;
    color: #616161;
  }

  .active-backdrop {
    background: rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 767px) {
    .filter-tablet__modal {
      left: 0 !important;
      width: 100vw !important;
    }
  }

</style>
