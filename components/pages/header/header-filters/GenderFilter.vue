<template lang="pug">
  div
    .filter__item.filter__item_hover.filter__item_gender.pos-rel.df.jcsb.aic.cp(@click="isShowGenderList = !isShowGenderList")
      .filter__name.filter__name_gender Пол
      .number-selected-options.pos-abs(v-if="currentGender" :class="{ ml32px: $mq !== 'md', ml35px: $mq === 'md' }") 1
      IconArrowDownGreyMedium.menu-links__icon-arrow-down.ml19px(
        :active="isShowGenderList" :class="{ 'menu-links__icon-arrow-down-active': isShowGenderList }"
      )
      .filter__dropdown.pos-abs(v-if="isShowGenderList && $mq === 'lg'")
        DropDown(@close="isShowGenderList = false" :styles="{ padding: '10px 20px 20px 20px', 'min-width': '166px' }")
          .df.aic
            //IconTooltip#tooltip-dropdown-language.ml6px
            //b-tooltip(target="tooltip-dropdown-language" placement="right" delay="100")
            //  | Чтобы не выбирать одни и те же <br> данные каждый раз, вы можете <br> настроить их у &nbsp
            //  nuxt-link.tooltip-link(to="/lk") себя в профиле

          .filter__options-wrapper.filter__options-wrapper_gender
            .filter__options-item.filter__options-item-gender.df.aic.pl10px.cp(
              v-for="genderObj,idx in genderOptions" :key="idx" @click.stop="toggleGender(genderObj)"
              :class="{ 'filter__options-item_active': genderObj.name === currentGender?.name, mt12px: idx === 0, mt3px: idx !== 0 }"
            )
              .df.aic
                RadioButton(:label="genderObj.name" :is-checked="genderObj.name === currentGender?.name" height="24")
                span.gender__name.ml2px(:class="{ 'gender__name_active': genderObj.name === currentGender?.name }") {{ genderObj.name }}

    FilterTabletModal(v-if="isShowGenderList && $mq !== 'lg'" @close="isShowGenderList = false")
      .filter__options-item-tablet(
        v-for="genderObj,idx in genderOptions" :key="idx" @click.stop="toggleGender(genderObj)"
        :class="{ 'filter__options-item_active': genderObj.name === currentGender?.name, mt12px: idx === 0, mt3px: idx !== 0 }"
      )
        .df.aic
          RadioButton(:label="genderObj.name" :is-checked="genderObj.name === currentGender?.name" height="24")
          span.gender__name-tablet.ml8px(:class="{ 'gender__name_active-tablet': genderObj.name === currentGender?.name }") {{ genderObj.name }}

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import IconArrowDownGreyMedium from "@/components/ui/icons/arrows/IconArrowDownGreyMedium.vue";
import DropDown from "@/components/ui/blocks/DropDown.vue";
import IconTooltip from "@/components/ui/icons/IconTooltipQuestion.vue";
import FilterTabletModal from "@/components/extra/FilterModal.vue";
import RadioButton from "@/components/ui/blocks/RadioButton.vue";
export default {
  name: "GenderFilter",
  components: { RadioButton, FilterTabletModal, IconTooltip, DropDown, IconArrowDownGreyMedium },
  data: () => ({
    genderOptions: [
      { name: 'Мужской', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Взрослый' } },
      { name: 'Женский', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Взрослый' } },
      // { name: 'Мальчики', url: 'muzhchinam', param: { gender: 'Мужской', age: 'Детский' } },
      // { name: 'Девочки', url: 'zhenshchinam', param: { gender: 'Женский', age: 'Детский' } },
      // { name: 'Детский', url: 'detyam', param: { age: 'Детский' } }
    ],
    currentGender: null,
    isShowGenderList: false,
    init: false
  }),
  watch: {
    async currentGender (nV) {
      if (nV) {
        this.setFindParam()
        this.setUrlParam()
        this.SET_FIND_PARAM({ param: 'price', value: { $in: [ 1, 999999 ] } })
        if (this.init) await this.FETCH_SELECTS()
      } else {
        this.unsetFindParam()
        this.unsetUrlParam()
        this.SET_SELECTS(null)
      }
    },
    '$store.state.filters.findObj.gender': {
      handler (nV) {
        if (!nV) this.currentGender = null
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('selects', [ 'FETCH_SELECTS' ]),
    ...mapMutations('filters', [ 'SET_FIND_PARAM', 'UNSET_FIND_PARAM' ]),
    ...mapMutations('catalog', [ 'SET_URL_PARAM', 'UNSET_URL_PARAM' ]),
    ...mapMutations('selects', [ 'SET_SELECTS' ]),
    setFindParam () {
      if (this.currentGender?.param.age) this.SET_FIND_PARAM({
        param: 'age',
        value: this.currentGender?.param.age || null
      })
      if (this.currentGender?.param.gender) this.SET_FIND_PARAM({
        param: 'gender',
        value: this.currentGender?.param.gender || null
      })
    },
    unsetFindParam () {
      this.UNSET_FIND_PARAM({ param: 'age' })
      this.UNSET_FIND_PARAM({ param: 'gender' })
    },
    setUrlParam () {
      this.SET_URL_PARAM({
        param: 'a-gender',
        value: this.currentGender?.url
      })
    },
    unsetUrlParam () {
      this.UNSET_URL_PARAM({ param: 'a-gender' })
    },
    getCategoryGenderString () {
      const { path } = this.$route
      const category = { clothes: 'Одежда', shoes: 'Обувь', accessories: 'Аксессуары' }[path.split('/')[2]]
      const gender = { muzhchinam: 'для мужчин', zhenshchinam: 'для женщин' }[path.split('/')[3]]
      return category + (gender ? ` ${gender}` : '')
    },
    getGender () {
      const route = this.$route.path
      setTimeout(() => {
        this.genderOptions.forEach(genderObj => {
          if (route.includes(genderObj.url)) {
            this.SET_FIND_PARAM({ param: 'gender', value: genderObj.name })
            this.currentGender = genderObj
          }
        })
      }, 1000)
    },
    toggleGender (genderObj) {
      this.currentGender === genderObj
        ? this.currentGender = null
        : this.currentGender = genderObj
      if (this.currentGender && this.$mq === 'lg') this.isShowGenderList = false
    }
  },
  created () {
    if (this.$route.path.includes('catalog')) {
      this.getGender()
      this.setFindParam()
      this.setUrlParam()
    }
  },
  mounted () {
    setTimeout(() => this.init = true, 1000)
  }
};
</script>

<style lang="scss">
  .filter__item {
    padding: 18px 16px 19px;
    background: #FFFFFF;

    .filter__name {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 23px;
      color: #303030;
    }

    .filter__name_gender {
      letter-spacing: 0.02em;
    }

    .number-selected-options {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px 8px;
      gap: 10px;
      background: #EAECF1;
      border-radius: 100px;
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #303030;
    }

    .filter__dropdown {
      top: 61px;
      left: 0;

      .dropdown-header {
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #B3B3B3;
      }

      .filter__options-wrapper_gender {
        height: auto;
      }

      .filter__options-item {
        height: 32px;
        font-family: 'Inter',serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
        color: #616161;

        .gender__name_active {
          color: #2D78EA;
        }
      }

      .filter__options-item-gender {
        width: 166px;
      }
      .filter__options-item:hover .checkbox {
        border: 2px solid #6BA0F0;
      }
      .filter__options-item:hover .gender__name {
        color: #2D78EA;
      }
      .filter__options-item_active:hover .gender__name {
        color: #6BA0F0;
      }
    }
  }

  .filter__options-item:hover {
    background: #F6F7F9;
    border-radius: 6px;
  }
  .filter__options-item_active:hover .checkbox {
    border: 2px solid #6BA0F0;
    background: #6BA0F0;
  }

  .filter__item_hover:hover svg .icon-arrow-down-grey-medium {
    fill: #303030 !important;
  }

  .filter__item_gender {
    width: 83px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .gender__name-tablet {
    font-family: 'Inter',serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.02em;
    color: #616161;
  }

  .gender__name_active-tablet {
    color: #2D78EA;
  }

  @media (min-width: 1150px) {
    .filter__item:after {
      content: '';
      position: absolute;
      right: 0;
      display: block;
      height: 36px;
      width: 1px;
      background: #EAECF1;
    }
  }

  @media (max-width: 1150px) {
    .filter__item {
      min-width: 208px !important;
      max-height: 13px !important;
      border-radius: 10px;

      .number-selected-options {
        width: 17px !important;
        height: 17px !important;
        padding: 0 !important;
        font-size: 10px !important;
      }
    }

    .filter__options-item-tablet {
      padding: 11px 0 14px;
      border-bottom: 1px solid #EAECF1;
    }
    .filter__options-item-tablet:last-child {
      border-bottom: none !important;
    }
  }

  @media (max-width: 767px) {
    .filter__item {
      min-width: 134px !important;
      max-height: 13px !important;
      border-radius: 10px;
    }
  }

  @media (max-width: 370px) {
    .filter__item {
      min-width: 114px !important;
      max-height: 13px !important;
      border-radius: 10px;
    }
  }

</style>
