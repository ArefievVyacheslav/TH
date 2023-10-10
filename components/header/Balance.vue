<template lang="pug">
  button.resource.df.jcc.aic.g10.pt12px.pb12px.pl20px.pr20px.font-tektur.toe.wsn.cp(:class="{ resource_active: false }")
    | {{ resource }}

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Balance",
  computed: {
    ...mapGetters({ resource: 'resource/GET_RESOURCE_TITLE' })
  }
}
</script>

<style lang="scss">
.resource {
  color: $green-active;
  line-height: normal;
  background-color: $black-bgc;
  outline: none;
  border: none;
}
.resource:hover {
  color: $black-bgc;
  line-height: normal;
  background-color: $green-active;
}
.resource_active {
  border: 1.5px solid $green-active;
}

</style>
