import getPreparedResource from '../utils/resource'
export const state = () => ({
  resource: { type: 'symbol', count: 1500 }
})
export const getters = {
  GET_RESOURCE_TITLE: state => getPreparedResource(state.resource)
}
