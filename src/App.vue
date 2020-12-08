<template>
  <v-app>
    <v-progress-linear indeterminate absolute :active="progress" />
    <v-snackbar color="warning" v-model="notify.show" top dark>
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
  created() {
    const user = getItem("user");
    if (user) this.Account(user);
  },
  methods: { ...mapActions(["Account"]) },
};
</script>

<style>
#app {
  background: #f6f6f6;
}

.background {
  background: url("./assets/background.png") center / contain fixed no-repeat;
}
</style>