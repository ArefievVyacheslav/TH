<template lang="pug">
  .menu.black-bgc
    .container.df.jcsb.g42(:class="{ 'jcfe': view === 'vertical' }")
      .menu__link-wrapper.pos-rel(:class="{ 'df aic ml-auto': view !== 'vertical' }")

        template(v-for="link,idx in links")
          nuxt-link.menu__link.font-tektur(
            :to="link.href" :class="{ 'mr40px': idx !== links.length - 1, menu__link_active: $route.path === link.href }"
            )
            template(v-if="!link.links")
              span.db {{ link.anchor }}

            .pos-rel.df.aic(v-else @click="isShowDropdown[ link.anchor ] = !isShowDropdown[ link.anchor ]")
              | {{ link.anchor }}
              svg.menu__arrow-down.ml8px(v-if="!isShowDropdown[ link.anchor ]" xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none")
                path(d="M0 0L6 6L12 0H0Z")
              svg.menu__arrow-down.ml8px(v-else xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none")
                path(d="M12 6L6 -5.24537e-07L0 6L12 6Z")

              .pos-abs.t27px.r237px(v-if="isShowDropdown[ link.anchor ]" @click="isShowDropdown[ link.anchor ] = false")
                DropDown(@close="isShowDropdown[ link.anchor ] = false")
                  nuxt-link.menu__link.tdn.cp.toe.wsn(
                    v-for="linkObj,idx in link.links" :key="linkObj.href" :to="linkObj.href"
                    :class="{ menu__link_active: $route.path === linkObj.href }"
                  )
                    template(v-if="!linkObj.links")
                      | {{ linkObj.anchor }}

                    .pos-rel.df.aic(v-else @click="isShowDropdown[ linkObj.anchor ] = !isShowDropdown[ linkObj.anchor ]")
                      | {{ linkObj.anchor }}
                      svg.menu__arrow-down.ml8px(v-if="!isShowDropdown[ linkObj.anchor ]" xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none")
                        path(d="M0 0L6 6L12 0H0Z")
                      svg.menu__arrow-down.ml8px(v-else xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none")
                        path(d="M12 6L6 -5.24537e-07L0 6L12 6Z")

                      .pos-abs.t27px.r237px(v-if="isShowDropdown[ linkObj.anchor ]" @click="isShowDropdown[ linkObj.anchor ] = false")
                        DropDown(@close="hideAll")
                          nuxt-link.menu__link.tdn.cp.toe.wsn(
                            v-for="link2,idx in linkObj.links" :key="link2.href" :to="link2.href"
                            :class="{ menu__link_active: $route.path === link2.href }"
                          )
                            | {{ link2.anchor }}

</template>

<script>
import DropDown from '../ui/DropDown.vue'
export default {
  name: "Menu",
  components: { DropDown },
  props: [ 'view' ],
  fetch () {
    if (this.$route.path === '/') this.links = this.links.filter(link => link.href !== '/')
  },
  data: () => ({
    links: [
      { anchor: 'Нейросеть онлайн', href: '/' },
      {
        anchor: 'Решение задач', href: '/resheniye-zadach', links: [
          { anchor: 'Школьные предметы', href: '/shkolnyye-predmety', links: [
              { anchor: 'Математика', href: '/matematika' },
              { anchor: 'Физика', href: '/fizika' }
            ]
          },
          { anchor: 'Работа с числами', href: '/rabota-s-chislami' },
          { anchor: 'Маркетинговые инструменты', href: '/marketingovyye-instrumenty' },
          { anchor: 'SEO инструменты', href: '/seo-instrumenty' }
        ]
      },
      { anchor: 'Примеры', href: '/primery' },
      { anchor: 'Цены', href: '/tseny' },
      { anchor: 'Контакты', href: '/kontakty' }
    ],
    isShowDropdown: {
      'Решение задач': false,
      'Школьные предметы': false,
      'Работа с числами': false,
      'Маркетинговые инструменты': false,
      'SEO инструменты': false
    }
  }),
  watch: {
    '$route.path': {
      handler (nV) {
        nV === '/'
          ? this.links = this.links.filter(link => link.href !== '/')
          : !this.links.map(link => link.anchor).includes('Нейросеть онлайн')
            ? this.links.unshift({ anchor: 'Нейросеть онлайн', href: '/' })
            : false
      }
    }
  },
  methods: {
    hideAll () {
      Object.keys(this.isShowDropdown).forEach(key => this.isShowDropdown[ key ] = false)
    }
  }
}
</script>

<style lang="scss">
.menu {
  padding: 12px 0;

  .menu__link {
    font-size: 16px;
    line-height: normal;
    color: white;
    text-decoration: none;
  }
  .menu__link:hover,
  .menu__link_active {
    color: $green-active;
  }
  .menu__link:hover .menu__arrow-down {
    fill: $green-active;
  }
  .menu__arrow-down {
    fill: white;
  }
}

</style>
