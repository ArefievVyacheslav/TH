export const state = () => ({
  metaTags: null
})

export const actions = {
  SET_META_TAGS({ commit }, metaObj) {
    commit('CHANGE_META_TAGS', metaObj)
  },
  ADD_META_TAG({ commit }, tag) {
    commit('ADD_TAG', tag)
  }
}

export const mutations = {
  CHANGE_META_TAGS(state, metaObj) {
    metaObj.url = metaObj.url.split('/').filter(part => !part.includes('page') && !part.includes('show')).join('/')
    state.metaTags = {
      title: metaObj.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: metaObj.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: metaObj.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: metaObj.imgUrl,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: metaObj.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: metaObj.url,
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: metaObj.url
        }
      ]
    }
  },
  ADD_TAG(state, tag) {
    state.metaTags.push(tag)
  }
}

export const getters = {
  GET_META_TAGS: state => state.metaTags
}
