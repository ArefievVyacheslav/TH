export const actions = {
  async nuxtServerInit ({ commit, dispatch }, ctx) {
    await dispatch('section/FETCH_SECTION', ctx.app.router.history.current.path)
    commit('seo/SET_USER_AGENT', ctx.req.headers[ 'user-agent' ])
    // if (this.$cookies.get('numberOfViews')) commit('statistic/SET_FIRST_VIEW')
  },
  // nuxtClientInit({ state, dispatch, commit }, context) { commit('dreambox/SET_DREAMBOX') }
}
