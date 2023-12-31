export const state = () => ({
  numberOfViews: 0,
  isFirstView: true,
  isFirstClickProduct: true
})

// export const actions = {
// }

export const mutations = {
  SET_NUMBER_VIEWS: state => {
    state.numberOfViews += 1
    if (state.numberOfViews > 0) state.isFirstView = false
  },
  SET_FIRST_VIEW: state => state.isFirstView = false,
  SET_CLICK_PRODUCTS: state => {
    state.isFirstClickProduct = false
    localStorage.isFirstClickProduct = 'false'
  }
}

// export const getters = {
// }
