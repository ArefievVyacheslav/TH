<template lang="pug">
  .container.slider__container
    .slider__content(v-if="slides.length > 0")
      img.mr30px.cp(
        v-if="currentSlide > 0", @click="prevSlide" height="46" width="26"
        src="/img/slider/arrow__left.png" alt="arrow__left" title="arrow__left"
      )
      .slider__buttons.df.jcsb.fww.g20
        nuxt-link.slider__button.tdn.font-tektur.text-white(
          v-for="(link, idx) in currentSlideLinks" :key="idx" :to="link.href"
          :class="{ active: $route.path === link.href }") {{ link.anchor }}

      img.ml32px.cp(
        v-if="currentSlide < slides.length - 1", @click="nextSlide" width="26" height="46"
        src="/img/slider/arrow__right.png" alt="arrow__right" title="arrow__right"
      )
    .slider__dots.df.jcsb.g10
      button.slider__dot.mt32px.cp(v-for="slide,idx in slides" :key="idx" :class="{ slider__dot_active: idx === currentSlide }" @click="goToSlide(idx)")

</template>

<script>
export default {
  name: "SliderLinks",
  props: {
    links: { type: Array, required: true }
  },
  data: () => ({ currentSlide: 1 }),
  computed: {
    seoUserAgentDesktop () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YD' || this.$store.getters['seo/GET_USER_AGENT'] === 'GD'
    },
    seoUserAgentMobile () {
      return this.$store.getters['seo/GET_USER_AGENT'] === 'YM' || this.$store.getters['seo/GET_USER_AGENT'] === 'GM'
    },
    linksOnSlideCount () {
      return this.seoUserAgentMobile || this.$mq === 'sm'
        ? 2
        : 7
    },
    slides () {
      return Array.from(
        { length: Math.ceil(this.links.length / this.linksOnSlideCount) },
        (_, idx) => idx
      );
    },
    currentSlideLinks () {
      const startIdx = this.currentSlide * this.linksOnSlideCount
      return this.seoUserAgentDesktop
        ? this.links
        : this.links.slice(startIdx, startIdx + this.linksOnSlideCount)
    },
    currentIdx () { return this.currentSlide * this.linksOnSlideCount }
  },
  methods: {
    goToSlide (idx) { this.currentSlide = idx },
    nextSlide () {
      if (this.currentSlide < this.slides.length - 1) this.currentSlide++
    },
    prevSlide () {
      if (this.currentSlide > 0) this.currentSlide--
    }
  }
};
</script>

<style lang="scss">
.slider__container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  .slider__content {
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .slider__buttons {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }

  .slider__button {
    padding: 12px 16px;
    font-size: 16px;
    line-height: 100%;
    cursor: pointer;
    border: 1px solid white;

    &.active {
      color: $green-active !important;
      border: 1.5px solid $green-active;
    }
  }

  .slider__dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .slider__dot {
      width: 28px;
      height: 4px;
      outline: none;
      border: none;
      background: var(--transparent-white, rgba(255, 255, 255, 0.60));
    }
    .slider__dot_active {
      background: $green-active;
    }
  }
}

@media (max-width: 1300px) {
  .slider__content {
    width: 100% !important;
    margin-top: 60px;
  }
  .slider__dots {
    margin-top: 40px !important;
  }
}

</style>
