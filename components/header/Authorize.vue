<template lang="pug">
  button.resource.pos-rel.df.jcc.aic.g10.pt12px.pb12px.pl20px.pr20px.font-tektur.cp.ttu(
    :class="{ 'text-white': isAuth, resource_active: !isAuth }" @click="isShowDropdown = !isShowDropdown"
  )
    | {{ isAuth ? 'Выйти' : 'Вход' }}

    .pos-abs(v-if="isShowDropdown")
      DropDown(@close="isShowDropdown = false" :styles="styles")
        form.auth__wrapper(@click.stop)

          input.auth__input.mt10px(v-model="secrets.email" placeholder="email" type="email")
          input.auth__input.mt1px(v-model="secrets.password" placeholder="пароль" type="password")

          p.text-active(v-if="isShowValidationError") Должны быть введены логин и пароль, email в правильном формате ***@***.**

          .auth__actions.df.jcsb.mt4px
            button.resource.resource_active.pt12px.pb12px.pl24px.pr24px.cp(@click.prevent="authHandler('register')") Регистрация
            button.resource.pt12px.pb12px.pl20px.pr20px.cp(@click.prevent="authHandler('login')") Вход

</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import DropDown from '../ui/DropDown.vue'
export default {
  name: "Authorize",
  components: { DropDown },
  props: {
    styles: {
      type: Object,
      default: { right: '-22px', top: '23px' }
    }
  },
  data: () => ({
    secrets: { email: '', password: '' },
    isShowDropdown: false,
    isShowValidationError: false
  }),
  computed: {
    ...mapState({ isAuth: state => state.auth.isAuth }),
    validationError () {
      return !(this.secrets.email && this.secrets.password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.secrets.email))
    }
  },
  methods: {
    ...mapActions({
      FETCH_LOGIN: 'auth/FETCH_LOGIN',
      FETCH_REGISTRATION: 'auth/FETCH_REGISTRATION'
    }),
    authHandler (type) {
      if (this.validationError) {
        this.isShowValidationError = true
        return
      }
      if (type === 'login') this.FETCH_LOGIN(this.secrets)
      if (type === 'register') this.FETCH_REGISTRATION(this.secrets)
    }
  }
}
</script>

<style lang="scss">
.auth__input {
  height: 20px;
  padding: 5px 10px;
  outline: none;
}

</style>
