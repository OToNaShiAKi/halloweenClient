<template>
  <v-main class="birthday">
    <vue-typed-js
      class="mx-9 fixed"
      v-if="bless.bless"
      :typeSpeed="90"
      :strings="bless.bless"
    >
      <p class="mb-0 typing"></p>
    </vue-typed-js>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Birthday",
  created() {
    document.title = "生日快乐";
  },
  computed: {
    ...mapState(["bless"]),
    index() {
      const index = this.bless.bless.indexOf("\\ 生日快乐 /");
      return index;
    },
  },
};
</script>

<style scoped>
.birthday {
  background: url("./../assets/birthday.png") center 80% / contain fixed
    no-repeat;
}
.fixed {
  position: fixed;
  top: 40%;
}
</style>