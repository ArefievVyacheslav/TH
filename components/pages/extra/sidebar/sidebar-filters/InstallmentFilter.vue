<template lang="pug">
  .extra-filters__filter.df.jcsb.aic.mt12px
    span.extra-filters__filter-name Возможность рассрочки
    Switcher.mt-12px(@switch-my-data="isInstallment = !isInstallment" param="installment")

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Switcher from "@/components/ui/blocks/Switcher.vue";

export default {
  name: "InstallmentFilter",
  components: { Switcher },
  data: () => ({ isInstallment: false, isInstallmentParam: null, init: false }),
  watch: {
    async isInstallment (nV) {
      nV
        ? this.setUrlParam()
        : this.unsetUrlParam()
      this.setFindParam()
      if (this.init) {
        await this.FETCH_SELECTS()
        this.$emit('is-installment', nV ? 1 : 0)
      }
    },
    '$store.state.filters.findObj.installment': {
      handler (nV) {
        if (!nV) this.isInstallment = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    setFindParam () {
      this.SET_FIND_PARAM({
        param: 'installment',
        value: this.isInstallment ? true : { $in: [ true, false ] }
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'installment' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'f-installment',
        value: this.isInstallment ? 'installment' : ''
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'f-installment' })
    },
    getInstallment () {
      this.isInstallment = this.$route.path.includes('installment')
      this.SET_FIND_PARAM({ param: 'installment', value: this.isInstallment ? true : { $in: [ true, false ] } })
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
    setTimeout(() => this.getInstallment(), 1100)
  }
};
</script>
