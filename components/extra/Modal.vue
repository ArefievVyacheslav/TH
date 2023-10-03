<template lang="pug">
  b-modal(:id="ident" :title="title" :hide-footer="true" :hide-header-close="true" :content-class="contentClass")
    .close(@click="$bvModal.hide(ident)")
      IconCloseModal

    slot(name="modal-desc")
    .df.jcsb.g10(:style="wrapperStyles" :class="{ mt30px: $mq !== 'sm', mt20px: $mq === 'sm' }")
      button.btn-modal.btn-modal_cancel.cp(v-if="cancelTitle" @click.stop="$bvModal.hide(ident); $emit('modal-cancel');") {{ cancelTitle }}
      button.btn-modal.btn-modal_ok.blue-btn-hover.blue-btn-active.cp(v-if="okTitle" @click.stop="$emit('modal-ok'); $bvModal.hide(ident)") {{ okTitle }}

</template>

<script>
import IconCloseModal from "@/components/ui/icons/IconCloseModal.vue";
export default {
  name: "Modal",
  components: { IconCloseModal },
  props: {
    ident: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    okTitle: {
      type: String
    },
    cancelTitle: {
      type: String
    },
    contentClass: {
      type: String,
      default: 'default-content-class'
    },
    wrapperStyles: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
    background-color: #66666650;
    outline: 0;
    z-index: 1050;

    .modal-dialog {
      position: relative;
      width: 460px;
      height: 352px;

      .default-content-class {
        padding: 50px;
        background: #FFFFFF;
        border-radius: 20px;

        .modal-title {
          margin: 0 0 20px 0;
          padding: 0;
          text-align: center;
          font-family: 'Inter',serif;
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 29px;
          letter-spacing: 0.02em;
          color: #303030;
        }

        .close {
          position: absolute;
          top: 20px;
          right: 24px;
          border: none;
          background-color: transparent;
          color: #B3B3B3;
          font-size: 25px;
          cursor: pointer;
        }
      }
    }

    .modal-desc {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #7F7F7F;
    }

    .btn-modal {
      width: 100%;
      padding: 16px 32px;
      border: none;
      border-radius: 10px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
    }

    .btn-modal_ok {
      background: #2D78EA;
      color: #FFFFFF;
    }

    .btn-modal_cancel {
      background: #F6F7F9;
      color: #616161;
    }

    .btn-modal_cancel:hover {
      background: #EAECF1;
    }

    .btn-modal_cancel:active {
      background: #DDE1E9 !important;
    }
  }

  @media (max-width: 500px) {
    .modal-dialog {
      position: relative;
      width: 340px !important;

      .default-content-class {
        padding: 40px !important;

        .modal-title {
          font-size: 18px !important;
        }

        .modal-desc {
          font-size: 14px !important;
          line-height: 17px !important;
        }

        .btn-modal {
          width: 201px !important;
          margin: 0 auto;
          padding: 12px 24px !important;
          font-size: 14px !important;
          line-height: 17px !important;
        }

        .close {
          top: 10px !important;
          right: 12px !important;
        }
      }
    }
  }

  .fade {
    -webkit-transition: opacity 0.15s linear;
    transition: opacity 0.15s linear;
  }

</style>
