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
    display: flex;
    width: auto;
    padding: 16px 40px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;
    border: 1px solid $green-active;
    background-color: $black-bgc;
  }

</style>
