export const state = () => ({
  current: null
})
export const actions = {
  async FETCH_SECTION ({ commit }, url) {
    const { data } = await this.$axios.post('/section', { url })
    commit('SET_SECTION', data)
  }
}
export const mutations = {
  SET_SECTION: (state, section) => state.current = section
}
// export const getters = {
//   GET_RESOURCE_TITLE: state => getPreparedResource(state.resource)
// }
