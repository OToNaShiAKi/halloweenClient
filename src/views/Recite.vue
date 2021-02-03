<template>
  <v-main class="text-center pa-9">
    <section>
      <h4>{{ poem.title }}</h4>
      <h5 class="ma-3">[{{ poem.dynasty }}] {{ poem.author }}</h5>
      <p v-html="paragraph"></p>
    </section>
    <v-btn color="primary" outlined @click="refresh_poem">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn color="primary" fab fixed right bottom small to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-main>
</template>

<script>
import { Poem } from "../store/request";

export default {
  name: "Recite",
  data: () => ({ poem: {}, paragraph: "" }),
  created() {
    this.refresh_poem();
  },
  methods: {
    async refresh_poem() {
      this.poem = await Poem();
      this.paragraph = this.poem.paragraph.replace(
        /。|？|！/g,
        (symbol) => symbol + "<br/>"
      );
    },
  },
};
</script>
