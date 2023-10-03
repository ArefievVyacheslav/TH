<template lang="pug">
  .notification.df.jcsb.aic
    .notification__icon
      component(:is="`Icon${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}Notification`")

    p.notification__text.ml10px.mr14px {{ notification.text }}
    .df.aic.cp(@click="SET_NOTIFICATION(null)")
      IconCrossNotification

</template>

<script>
import { mapActions, mapState } from "vuex";
import IconInfoNotification from "@/components/ui/icons/notifications/IconInfoNotification.vue";
import IconWarningNotification from "@/components/ui/icons/notifications/IconWarningNotification.vue";
import IconDangerNotification from "@/components/ui/icons/notifications/IconDangerNotification.vue";
import IconSuccessNotification from "@/components/ui/icons/notifications/IconSuccessNotification.vue";
import IconCrossNotification from "@/components/ui/icons/notifications/IconCrossNotification.vue";
export default {
  name: "Notification",
  components: { IconCrossNotification, IconSuccessNotification, IconDangerNotification, IconWarningNotification, IconInfoNotification },
  data: () => ({
    icons: [ 'IconInfoNotification', 'IconWarningNotification', 'IconDangerNotification', 'IconSuccessNotification' ]
  }),
  methods: {
    ...mapActions('notifications', [ 'SET_NOTIFICATION' ])
  },
  computed: {
    ...mapState({ notification: state => state.notifications.notification })
  }
}
</script>

<style scoped lang="scss">
  .bounce-enter-active {
    animation: bounce-in .7s;
  }

  .bounce-leave-active {
    animation: bounce-in .7s reverse;
  }

  @keyframes bounce-in {
    0% {
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      left: 50%;
      transform: translate(-50%, -50%) scale(1.3);
    }
    100% {
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
  }

</style>

<style lang="scss">
  .notification {
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 26px;
    max-width: 500px;
    padding: 14px 16px;
    background: #FFFFFF;
    box-shadow: 0 6px 30px rgba(47, 54, 70, 0.1);
    border-radius: 16px;
    z-index: 1051;

    .notification__text {
      font-family: 'Inter',serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.02em;
      color: #6A7380;
    }

    .notification__icon {
      width: 26px !important;
      height: 26px !important;
    }
  }

  @media (max-width: 767px) {

    .notification {
      width: 300px;
    }
  }

</style>
