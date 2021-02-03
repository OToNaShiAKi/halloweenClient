<template>
  <v-app>
    <v-progress-linear indeterminate absolute :active="progress" />
    <v-snackbar :timeout="2000" color="warning" v-model="notify.show" top>
      {{ notify.message }}
    </v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getItem } from "./plugins/storage";

export default {
  name: "App",
  computed: { ...mapState(["notify", "progress"]) },
  methods: { ...mapActions(["Account"]) },
  created() {
    const user = getItem("user");
    if (user) this.Account(user);
    else this.$router.replace("/login");
  },
};
</script>

<style>
#app {
  background: #eafcee url("./assets/background.png") center / 100% 100% fixed
    no-repeat;
}

.button {
  background: url("./assets/button.png") center / contain no-repeat;
  background-color: transparent !important;
  color: white !important;
}

.container .col {
  box-sizing: border-box;
  border: 1px solid #002708;
}
</style>