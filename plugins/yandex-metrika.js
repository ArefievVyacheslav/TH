import Vue from 'vue';
import VueYandexMetrika from 'vue-yandex-metrika';

export default ({ app }) => {
  window.onNuxtReady(() => {
    Vue.use(VueYandexMetrika, {
      id: '89951108',
      router: app.router,
      env: process.env.NODE_ENV
    });
  })
  // // Проверка текущего пути страницы и отключение метрики на определенной странице
  // if (process.client) {
  //   app.router.afterEach((to, from) => {
  //     if (to.path === '/create-metrika-goal') window['yaCounter89951108'] = null;
  //   })
  // }
};
