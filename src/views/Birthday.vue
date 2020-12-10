<template>
  <v-main >
    <v-img eager :class="current >= index.bless ? 'animate__backInDown' : 'hide'" class="animate__animated" src="../assets/banner.png" />
    <v-img eager :class="current >= index.bless ? 'animate__bounceIn' : 'hide'" class="mx-15 animate__animated animate__delay-2s" src="../assets/birthday.png" />
    <vue-typed-js
      class="ma-6"
      v-if="bless.length"
      :strings="bless"
      @onStringTyped="animate"
    >
      <p class="mb-0 typing"></p>
    </vue-typed-js>
    <section v-if="current >= index.present" class="animate__animated animate__fadeInLeft text-center">
      <v-img eager src="../assets/present.png" />
      <p class="mx-3 pink--text">{{ selected | filter }}</p>
      <v-checkbox color="pink" class="ma-0 mx-3" v-for="(item, i) of present" :key="i" v-model="selected" :label="item" :value="i" />
      <v-btn color="pink" class="mb-3" dark @click="submit">爱了爱了</v-btn>
    </section>
  </v-main>
</template>

<script>
import {  mapMutations, mapState } from "vuex";
import { Birthday } from "../store/actions"

export default {
  name: "Birthday",
  created() {
    document.title = "生日快乐";
  },
  computed: {
    ...mapState(["bless", "present"]),
    index() {
      const bless = this.bless.indexOf("那么~~~ \\ 生日快乐 / ") - 1;
      const present = this.bless.length - 1;
      return { bless, present };
    },
  },
  watch: {
    selected(value) {
      if (!value.includes(3)) {
        this.$vuetify.theme.themes.light.warning = '#E91E63'
        this.Notify("蛋糕真的很好吃啊！");
        this.selected.push(3);
      }
    }
  },
  data: () => ({ current : null, selected: [0, 1, 2, 3] }),
  methods: {
    ...mapMutations(["Notify"]),
    animate() {
      if (this.current === null) this.current = -1;
      this.current += 1;
    },
    async submit() {
      await Birthday(this.selected);
      this.Notify("蛋糕已经送到邮箱里了！");
    }
  },
  filters: {
    filter(selected) {
      let tip = "";
      if (selected.length >= 4) return "我全都要！";
      if (selected.includes(0)) tip += "要吃！";
      if (selected.includes(1)) tip += "要玩！";
      if (selected.includes(2)) tip += "要逛！";
      if (selected.includes(3)) tip += "蛋糕最棒！";
      return tip;
    }
  }
};
</script>

<style scoped>
.hide {
  opacity: 0;
}
</style>