import Vue from 'vue'

const seoMetaPlugin = {
  install(Vue, options) {
    Vue.mixin({
      transition: 'fade',
      head() {
        return {
          ...this.meta
        }
      }
    })
  }
}

Vue.use(seoMetaPlugin)
