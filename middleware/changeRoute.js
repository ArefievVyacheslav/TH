export default function({ store, route, redirect }) {
  if (route.path !== '/' && route.path.endsWith('/')) redirect(301, route.path.slice(0, -1).replaceAll('%20', '-'));
  if (route.path !== route.path.toLowerCase()) redirect(route.path.toLowerCase())
  if (!process.server) {
    store.commit('statistic/SET_NUMBER_VIEWS');
    document.cookie = `numberOfViews=${store.state.statistic.numberOfViews};max-age=86400000;path=/`;
  }
}
