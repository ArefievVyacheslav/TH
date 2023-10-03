<template>
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.5" cy="7" r="3" :stroke="color" stroke-width="2"/>
    <ellipse cx="12.5" cy="17" rx="6" ry="3" :stroke="color" stroke-width="2"/>
  </svg>


</template>

<script>
export default {
  name: "IconLkMenuLinksMini",
  props: {
    color: {
      type: String,
      default: '#2E333A'
    }
  }
};
</script>
