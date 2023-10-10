<template lang="pug">
  button.resource.df.jcc.aic.g10.pt12px.pb12px.pl20px.pr20px.font-tektur.cp.ttu(
    :class="{ 'text-white': isAuth, resource_active: !isAuth }"
  )
    | {{ isAuth ? 'Выйти' : 'Вход' }}

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Authorize",
  computed: {
    ...mapState({ isAuth: state => state['auth/isAuth'] })
  }
}
</script>

<style lang="scss">

</style>
