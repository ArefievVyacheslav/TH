<template lang="pug">
  .sidebar(:class="{ 'sidebar_active': isShow }")
    nuxt-img.db.ml-auto.mb10vh(
      src="/img/header/icon-menu-adaptive-active.png" format="webp" preload
      alt="menu adaptive icon" title="Меню активно" width="28" height="28" placeholder
    )
    Menu(view="vertical").ml-auto
    Balance.mt40px.mb32px.ml-auto(:class="{ 'mt65px mb40px': $mq === 'md' }")
    Authorize.ml-auto(:styles="{ right: '-128px', top: '-187px' }")

</template>

<script>
import Menu from './header/Menu.vue'
import Balance from './header/Balance.vue'
import Authorize from './header/Authorize.vue'
export default {
  name: "Sidebar",
  components: { Authorize, Balance, Menu },
  data: () => ({ isShow: false }),
  methods: {
    handleClickOutside (event) {
      const classArray = (event.path || (event.composedPath && event.composedPath())).map(tag => tag.className)
      if (this.isShow && !classArray.includes('sidebar sidebar_active') && !classArray.includes('menu-icon')
        && !classArray.includes('menu-icon ml24px')) this.isShow = false
    }
  },
  beforeMount () {
    document.addEventListener('click', this.handleClickOutside)
    this.$root.$on('toggle-sidebar', () => this.isShow = !this.isShow)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutside)
    this.$root.$off('toggle-sidebar')
  }
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  right: -292px;
  top: 0;
  padding-top: 68px;
  padding-right: 60px;
  width: 230px;
  height: 100%;
  background-color: $black-bgc;
  border-left: 2px solid $green-active;
  transition: 0.4s;
  overflow-y: auto;
  z-index: 1;
}

.sidebar_active {
  right: 0;
}

</style>
