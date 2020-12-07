<template>
  <v-main class="pa-6">
    <v-img class="my-12" src="../assets/title.png" height="180" contain />
    <v-text-field label="昵称" v-model="nick" />
    <v-text-field label="密码" type="password" v-model="password" />
    <v-btn rounded block outlined @click="login">登录 / 注册</v-btn>
  </v-main>
</template>

<script>
import md5 from "blueimp-md5";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Login",
  data: () => ({
    nick: "",
    password: "",
  }),
  methods: {
    ...mapActions(["Account"]),
    ...mapMutations(["Notify"]),
    login() {
      if (!this.nick.length) {
        this.Notify("昵称不可为空");
        return;
      }
      if (this.password.length < 8) {
        this.Notify("密码至少为8位");
        return;
      }
      this.Account({ nick: this.nick, password: md5(this.password) });
    },
  },
};
</script>