export const strict = false
export const state = () => ({})

export const actions = {
  async nuxtServerInit({ commit, dispatch }, ctx) {
    await dispatch('selects/FETCH_SELECTS', ctx.app.router.history.current.path)
    if (this.$cookies.get('numberOfViews')) commit('statistic/SET_FIRST_VIEW')
    commit('seo/SET_USER_AGENT', ctx.req.headers[ 'user-agent' ])
  },
  nuxtClientInit({ state, dispatch, commit }, context) { commit('dreambox/SET_DREAMBOX') }
}

export const mutations = {}

export const getters = {}
