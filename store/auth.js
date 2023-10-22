export const state = () => ({
  isAuth: false,
  secrets: null
})
export const actions = {
  async FETCH_REGISTRATION ({ commit }, secrets) {
    try {
      const { data } = await this.$axios.post('/register', secrets)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    // commit('SET_AUTH', { login: true, secrets: data })
  },
  async FETCH_LOGIN ({ commit }, secrets) {
    try {
      const { data } = await this.$axios.post('/login', secrets)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
    // commit('SET_AUTH', { login: true, secrets: data })
  }
  // async FETCH_LOGIN ({ commit }, metaObj) {
  //   commit('SET_AUTH', metaObj)
  // }
}
export const mutations = {
  SET_AUTH: (state, params) => {
    if (params.login) {
      state.isAuth = true
      state.secrets = params.secrets
    } else state.isAuth = false
  }
}
// export const getters = {
//   GET_RESOURCE_TITLE: state => getPreparedResource(state.resource)
// }
