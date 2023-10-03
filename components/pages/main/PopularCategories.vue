<template lang="pug">
  .popular-categories
    .main__header.m0.p0 Популярные категории
    .df.jcsb.fww(:class="{ 'mt40px g24': $mq === 'lg', 'mt24px g20': $mq === 'md', 'mt20px g20': $mq === 'sm' }")
      a.main__wrap.popular-categories__wrap.tdn.cp(
        v-for="category,idx in $mq === 'lg' ? categories : categoriesTablet" :key="category.link" :href="category.link"
        :class="{ 'main__wrap_popular-categories_max': category.width === 'max', 'main__wrap_popular-categories_min': category.width === 'min' }"
      )
        .df.fdc(:class="{ 'fdr jcsb': category.width === 'max' && $mq !== 'sm' }")
          .main__wrap-header.main__wrap-header_advantage {{ category.anchor }}
          b-img-lazy.popular-categories__img(:src="category.icon" blank-src="/placeholder-transparent.svg" :alt="`icon category ${category.anchor}`" :class="{ 'mt22px mr40px': category.width === 'max', 'mt26px mr42px ml42px mb40px': category.width === 'min' }")

</template>

<script>
export default {
  name: "PopularCategories",
  data: () => ({
    categories: [
      { anchor: 'Футболки', link: '/catalog/clothes/--futbolki--', icon: '/img/main-page/popular-categories/футболка 1.svg', width: 'max' },
      { anchor: 'Кроссовки и кеды', link: '/catalog/shoes/--kedy--krossovki--', icon: '/img/main-page/popular-categories/кеды 1.svg', width: 'min' },
      { anchor: 'Аксессуары', link: '/catalog/accessories', icon: '/img/main-page/popular-categories/шапка 1.svg', width: 'min' },
      { anchor: 'Брюки', link: '/catalog/clothes/--brjuki--', icon: '/img/main-page/popular-categories/брюки 1.svg', width: 'min' },
      { anchor: 'Рубашки', link: '/catalog/clothes/--rubashki--', icon: '/img/main-page/popular-categories/рубашка 1.svg', width: 'min' },
      { anchor: 'Ветровки', link: 'catalog/clothes/--vetrovki--', icon: '/img/main-page/popular-categories/ветровка 1.svg', width: 'max' }
    ],
    categoriesTablet: [
      { anchor: 'Футболки', link: '/catalog/clothes/--futbolki--', icon: '/img/main-page/popular-categories/футболка 1.svg', width: 'max' },
      { anchor: 'Кроссовки и кеды', link: '/catalog/shoes/--kedy--krossovki--', icon: '/img/main-page/popular-categories/кеды 1.svg', width: 'min' },
      { anchor: 'Аксессуары', link: '/catalog/accessories', icon: '/img/main-page/popular-categories/шапка 1.svg', width: 'min' },
      { anchor: 'Ветровки', link: 'catalog/clothes/--vetrovki--', icon: '/img/main-page/popular-categories/ветровка 1.svg', width: 'max' },
      { anchor: 'Брюки', link: '/catalog/clothes/--brjuki--', icon: '/img/main-page/popular-categories/брюки 1.svg', width: 'min' },
      { anchor: 'Рубашки', link: '/catalog/clothes/--rubashki--', icon: '/img/main-page/popular-categories/рубашка 1.svg', width: 'min' }
    ]
  })
}
</script>

<style lang="scss">
  .popular-categories {
    .popular-categories__wrap:hover .main__wrap-header {
      color: #2D78EA;
    }
    .main__wrap_popular-categories_max {
      width: 552px;
      height: 310px;
    }
    .main__wrap_popular-categories_min {
      width: 264px;
    }
  }

  @media (max-width: 1150px) {
    .main__wrap_popular-categories_max {
      width: 100% !important;
      height: 250px !important;
      overflow: hidden;
    }
    .main__wrap_popular-categories_min {
      width: 358px !important;
      height: 250px !important;
      overflow: hidden;

      .popular-categories__img {
        width: auto;
        max-width: 170px;
        margin-left: auto;
      }
    }
  }

  @media (max-width: 767px) {
    .main__wrap_popular-categories_max,
    .main__wrap_popular-categories_min {
      width: 160px !important;
      height: 210px !important;
      overflow: hidden;
    }
    .popular-categories__img {
      margin: 0 auto;
    }
  }

</style>
