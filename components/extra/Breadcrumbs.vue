<template lang="pug">
  nav.container(:class="{ 'mt28px mb28px': $mq === 'lg', 'pt16px mb16px': $mq !== 'lg' }")
    ol.breadcrumbs.df.m0.p0
      li.crumb(v-for="crumbObj,idx in breadcrumbs" :key="crumbObj.anchor")
        template(v-if="idx !== breadcrumbs.length - 1")
          template(v-if="crumbObj.length")
            template(v-for="crumb in crumbObj")
              a.crumb.toe.wsn.oh.tdn(:href="crumb.link") {{ crumb.anchor }}
            span.ml6px.mr6px /

          template(v-else)
            a.crumb.toe.wsn.oh.tdn(:href="crumbObj.link") {{ crumbObj.anchor }}
            span.ml6px.mr6px {{ idx !== breadcrumbs.length - 1 ? '/' : '' }}

        .active-crumb.toe.wsn.oh(v-else) {{ crumbObj.anchor }} &nbsp;{{ idx !== breadcrumbs.length - 1 ? '/' : '' }}

    script(v-if="customCrumbs" type="application/ld+json" v-html="jsonLd")

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Breadcrumbs",
  props: ['type', 'customCrumbs'],
  fetch () {
    if (this.customCrumbs) this.defaultCrumb.push(...this.customCrumbs)
  },
  data: () => ({
    defaultCrumb: [ { anchor: 'Поиск скидок', link: '/' } ]
  }),
  computed: {
    ...mapGetters({ crumbs: 'catalog/GET_BREADCRUMBS' }),
    breadcrumbs () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.customCrumbs
        ? this.defaultCrumb
        : this.type === 'catalog'
          ? this.crumbs['breadcrumbsCategory'].filter(crumb => crumb)
          : this.crumbs['breadcrumbs']
    },
    jsonLd () {
      let counter = 0
      return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": this.defaultCrumb
          .filter((obj, index, self) => index === self.findIndex(o => o.anchor === obj.anchor))
          .reduce((acc, crumb) => {
            if (!Array.isArray(crumb)) {
              acc.push({
                "@type": "ListItem",
                "position": counter + 1,
                "item": {
                  "@id": crumb.link,
                  "name": crumb.anchor
                }
              })
              counter += 1
            }
            return acc
          }, [])
      }, null, 2)
    }
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  overflow-x: auto;
  scrollbar-width: none;
}
.breadcrumbs::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.crumb,
.active-crumb {
  list-style-type: none;
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  letter-spacing: 0.02em;
}

.crumb {
  color: #96A0AF;
}

.active-crumb {
  color: #2E333A;
}

.crumb:hover {
  color: #6d6d75;
}

@media (max-width: 767px) {
  .breadcrumbs {
    height: 16px;
  }
}

</style>
