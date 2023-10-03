<template lang="pug">
  div(:style="`height: ${height}px`")
    IconRadioButtonActive(v-if="isChecked") {{ label }}
    IconRadioButtonDisable(v-else) {{ label }}

</template>

<script>
import IconRadioButtonDisable from "@/components/ui/icons/IconRadioButtonDisable.vue";
import IconRadioButtonActive from "@/components/ui/icons/IconRadioButtonActive.vue";

export default {
  name: "RadioButton",
  components: { IconRadioButtonActive, IconRadioButtonDisable },
  props: [ 'isChecked', 'label', 'height' ],
  data: () => ({ check:  false })
};
</script>
