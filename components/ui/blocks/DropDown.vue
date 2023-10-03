<template lang="pug">
  .dropdown(:style="styles")
    slot

</template>

<script>
export default {
  name: "DropDown",
  props: {
    styles: {
      type: Object
    }
  },
  methods: {
    handleClickOutside (event) {
      let isDropdownClickAway
      const path = event.path || (event.composedPath && event.composedPath())
      path.forEach(el => isDropdownClickAway = el.className !== 'dropdown')
      if (isDropdownClickAway) this.$emit('close')
    },
    hideDropDown () {
      this.$emit('close')
    }
  },
  mounted () {
    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside)
      window.addEventListener('scroll', this.hideDropDown)
    }, 10)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('scroll', this.hideDropDown)
  }
};
</script>

<style lang="scss">
  .dropdown {
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0 0 30px rgba(47, 54, 70, 0.3);
    border-radius: 10px;
    z-index: 1;
  }

</style>
