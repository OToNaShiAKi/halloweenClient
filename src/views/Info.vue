  
<template>
  <v-main class="py-3 px-6">
    <section>
      <v-text-field label="姓名" v-model="name" />
      <v-text-field label="手机" type="tel" v-model="phone" />
      <v-text-field label="学号" type="tel" v-model="uid" />
      <v-btn class="button" depressed block @click="info">提交</v-btn>
    </section>
    <!-- <section class="mt-3 primary--text">
      <h4>奖品介绍：</h4>
      <p>前三名将获得汤圆1袋！包煮！</p>
    </section> -->
    <v-btn color="warning" fab fixed right bottom small to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-main>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
const PhoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
const UidRule = /^U20(16|17|18|19|20)\d{5}$/;

export default {
  name: "Info",
  data: () => ({
    name: "",
    phone: "",
    uid: "U",
  }),
  created() {
    this.name = this.user.name || "";
    this.phone = this.user.phone || "";
    this.uid = this.user.uid || "U";
  },
  computed: { ...mapState(["user"]) },
  methods: {
    ...mapActions(["Info"]),
    ...mapMutations(["Notify"]),
    info() {
      if (!this.name.length) {
        this.Notify("姓名不可为空");
        return;
      }
      if (!PhoneRule.test(this.phone)) {
        this.Notify("手机号不合规");
        return;
      }
      if (!UidRule.test(this.uid)) {
        this.Notify("学号不合规");
        return;
      }
      this.Info({
        _id: this.user._id,
        name: this.name,
        phone: this.phone,
        uid: this.uid,
      });
    },
  },
};
</script>