<template>
  <svg
    v-if="isShowUpperBtn"
    class="pos-fixed cp"
    :class="{ 'up-arrow-scroll': $mq === 'lg','up-arrow-scroll_adaptive': $mq !== 'lg', b50: $mq !== 'lg' && !$route.path.includes('product') }"
    :width="`${ $mq === 'lg' ? 46 : 44 }`"
    :height="`${ $mq === 'lg' ? 46 : 44 }`"
    viewBox="0 0 46 46" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="goToUp"
  >
    <g clip-path="url(#clip0_296_585)">
      <circle cx="23" cy="23" r="23" fill="#2D78EA"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3813 15.3813C22.723 15.0396 23.277 15.0396 23.6187 15.3813L27.1187 18.8813C27.4604 19.223 27.4604 19.777 27.1187 20.1187C26.777 20.4604 26.223 20.4604 25.8813 20.1187L23.875 18.1124V30C23.875 30.4832 23.4832 30.875 23 30.875C22.5168 30.875 22.125 30.4832 22.125 30V18.1124L20.1187 20.1187C19.777 20.4604 19.223 20.4604 18.8813 20.1187C18.5396 19.777 18.5396 19.223 18.8813 18.8813L22.3813 15.3813Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_296_585">
        <rect width="46" height="46" fill="white"/>
      </clipPath>
    </defs>
  </svg>

</template>

<script>
export default {
  name: "UpArrowScroll",
  data: () => ({ isShowUpperBtn: false }),
  methods: {
    goToUp () {
      window.scrollTo(pageYOffset, 0)
      setTimeout(() => { document.querySelector('.header').classList.remove('pos-fixed') }, 500)
    },
    setConditionBtn () { this.isShowUpperBtn = window.pageYOffset > window.screen.height / 2 }
  },
  mounted () { window.addEventListener('scroll', this.setConditionBtn) },
  beforeDestroy () { window.removeEventListener('scroll', this.setConditionBtn) }
};
</script>

<style lang="scss">
  .up-arrow-scroll {
    position: fixed;
    bottom: 30px;
    left: 30px;
  }

  .up-arrow-scroll_adaptive {
    bottom: 145px;
    right: 13px;
    z-index: 3;
  }

</style>
