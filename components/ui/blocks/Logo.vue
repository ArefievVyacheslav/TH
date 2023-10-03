<template lang="pug">
  .logo
    template(v-if="mail")
      b-img-lazy(v-if="$mq === 'lg'" src="/img/main-page/logo-mail-desk.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="172" height="60")
      b-img-lazy(v-else-if="$mq === 'md'" src="/img/main-page/logo-mail-tablet.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="149" height="58")
      b-img-lazy(v-else src="/img/main-page/logo-mail-mobile.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="95" height="36")

    template(v-else-if="$route.path === '/'")
      b-img-lazy(v-if="$mq === 'lg'" src="/img/main-page/logo-desktop-main.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="118" height="40")
      b-img-lazy(v-else src="/img/main-page/logo-tablet-main.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="80" height="30")

    template(v-else)
      b-img-lazy(v-if="$mq !== 'sm'" src="/img/main-page/logo-desktop.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="148" height="51")
      b-img-lazy(v-else src="/img/main-page/logo-mobile.svg" blank-src="/placeholder-transparent.svg" alt="site logo" width="124" height="36")

</template>

<script>
export default {
  name: "Logo",
  props: {
    mail: Boolean
  },
  data: () => ({ width: null }),
  mounted () {
    this.width = window.screen.width
  }
}
</script>
