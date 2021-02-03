<template>
  <v-main class="pa-6 overflow-hidden">
    <v-card
      v-for="card of cards"
      :key="card.to"
      class="mb-5 animate__animated"
      :class="card.animate"
      :to="card.to"
      shaped
      color="transparent"
    >
      <v-card-title class="primary--text">{{ card.title }}</v-card-title>
      <v-card-subtitle class="primary--text">
        {{ card.subtitle }}
      </v-card-subtitle>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    cards: [
      {
        animate: "animate__lightSpeedInRight",
        title: "开始游戏",
        subtitle: "整起！拿奖！",
        to: "game",
      },
      {
        animate: "animate__lightSpeedInLeft",
        title: "排行榜",
        subtitle: "最强大脑诞生于此",
        to: "rank",
      },
      {
        animate: "animate__lightSpeedInRight",
        title: "个人信息",
        subtitle: "填写个人信息才可领奖哦~",
        to: "info",
      },
      {
        animate: "animate__lightSpeedInLeft",
        title: "我要背诗",
        subtitle: "成为中华小诗库吧！",
        to: "recite",
      },
    ],
  }),
};
</script>
