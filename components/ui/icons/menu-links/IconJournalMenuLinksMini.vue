<template>
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.5" y="7" width="12" height="10" rx="2" :stroke="color" stroke-width="2"/>
    <path d="M9.5 4H15.5" :stroke="color" stroke-width="2" stroke-linecap="round"/>
    <path d="M9.5 20H15.5" :stroke="color" stroke-width="2" stroke-linecap="round"/>
  </svg>


</template>

<script>
export default {
  name: "IconJournalMenuLinksMini",
  props: {
    color: {
      type: String,
      default: '#2E333A'
    }
  }
};
</script>
