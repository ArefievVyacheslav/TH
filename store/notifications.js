export const state = () => ({
  notification: null
})
export const actions = {
  SET_NOTIFICATION: ({ commit }, payload) => {
    commit('CHANGE_NOTIFICATION', payload)
    if (payload?.autoHideDelay) setTimeout(() => commit('CHANGE_NOTIFICATION', null), payload.autoHideDelay * 1000)
  }
}
export const mutations = {
  CHANGE_NOTIFICATION: (state, payload) => state.notification = payload
}
