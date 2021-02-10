<template>
  <v-main>
    <h4 class="ma-3">我的排名：{{ rank }}</h4>
    <v-simple-table class="primary--text" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th>排名</th>
            <th>昵称</th>
            <th>最高分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="item.nick">
            <td v-if="index >= 3">{{ index + 1 }}</td>
            <td v-else><v-icon :color="color[index]">mdi-one-up</v-icon></td>
            <td>{{ item.nick }}</td>
            <td>{{ item.highest }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn color="warning" fab fixed right bottom small to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-main>
</template>

<script>
import { Rank } from "../store/request";

export default {
  name: "Rank",
  data: () => ({
    users: [],
    color: ["yellow darken-2", "grey darken-2", "orange darken-2"],
  }),
  async created() {
    this.users = await Rank();
  },
  computed: {
    rank() {
      for (let i = 0; i < this.users.length; i++)
        if (this.users[i]._id === this.$store.state.user._id) return i + 1;
      return this.users.length + 1;
    },
  },
};
</script>
