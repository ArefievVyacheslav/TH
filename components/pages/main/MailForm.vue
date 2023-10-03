<template lang="pug">
  .mail-form
    .df.jcsb.aic(:class="{ fdc: $mq === 'sm' }")
      div(:class="{ 'df fdc aic mt14px': $mq === 'sm' }")
        .mail-form__header Оставь почту
        p.mail-form__desc Пришлём крутые подборки и лайфхаки по покупкам
        .df.mt32px.g10(:class="{ 'fdc mt-12px': $mq === 'sm' }")
          input.mail-form__input(v-model="email" placeholder="Email" type="email" required)
          button.mail-form__btn.cp(@click="sendEmail" :disabled="inValid" :class="{ 'blue-btn-disabled': inValid }") Отправить

      div(:class="{ 'df fdc aic': $mq === 'sm' }" :style="`${ $mq === 'sm' ? 'order: -1' : 'order: 1' }`")
        .mail-form__logo-wrap
          Logo(mail)

        .mail-form__logo-desc(:class="{ mt12px: $mq === 'xl', mt8px: $mq !== 'xl' }") Поиск скидок на бренды

</template>

<script>
import { mapActions } from "vuex";
import Logo from "@/components/ui/blocks/Logo.vue";
export default {
  name: "MailForm",
  components: { Logo },
  data: () => ({ email: '', inValid: false }),
  watch: {
    email (nV) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      this.inValid = !emailRegex.test(nV)
    }
  },
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ]),
    async sendEmail () {
      try {
        await this.$axios.post('/subscribe', { email: this.email })
        await this.SET_NOTIFICATION({ text: 'Email успешно записан', type: 'success', autoHideDelay: 2 })
        this.email = ''
      } catch (e) {
        await this.SET_NOTIFICATION({ text: 'Email не записан, свяжитесь с нами через контакты', type: 'error', autoHideDelay: 2 })
      }
    }
  }
}
</script>

<style lang="scss">
  .mail-form {
    padding: 100px 100px 100px 70px;
    background: #2E333A;
    border-radius: 40px;

    .mail-form__header {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 42px;
      line-height: 51px;
      color: #FFFFFF;
    }
    .mail-form__desc {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #A3AAB5;
    }
    .mail-form__input {
      width: 207px;
      height: 19px;
      padding: 16px;
      background: #565F6C;
      border-radius: 10px;
      border: none;
      outline: none;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #A3AAB5;
    }
    .mail-form__btn {
      max-height: 51px;
      padding: 16px 32px;
      background: #2D78EA;
      border-radius: 10px;
      border: none;
      outline: none;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #FFFFFF;
    }
    .mail-form__logo-wrap {
      padding: 21px 47px;
      background: #3D444D;
      border-radius: 1000px;
    }
    .mail-form__logo-desc {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #8791A0;
      opacity: 0.7;
    }
  }

  @media (max-width: 1149px) {
    .mail-form {
      padding: 50px 40px 50px 40px;
    }
    .mail-form__logo-wrap {
      padding: 0 !important;
      background: transparent !important;
      border-radius: 0 !important;
    }
    .mail-form__logo-desc {
      font-size: 12px !important;
      line-height: normal !important;
    }
    .mail-form__header {
      font-size: 32px !important;
      line-height: normal !important;
    }
    .mail-form__desc {
      font-size: 16px !important;
      font-style: normal !important;
      font-weight: 500 !important;
      line-height: normal !important;
    }
  }

  @media (max-width: 767px) {
    .mail-form {
      padding: 30px;
    }
    .mail-form__logo-wrap {
      padding: 0 !important;
      background: transparent !important;
      border-radius: 0 !important;
    }
    .mail-form__header {
      font-size: 24px !important;
    }
    .mail-form__desc {
      padding: 10px;
      margin-top: -10px;
      text-align: center;
      font-size: 14px !important;
    }
    .mail-form__input {
      width: 250px !important;
      height: 11px !important;
    }
    .mail-form__btn {
      height: 41px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 !important;
    }
  }

</style>
