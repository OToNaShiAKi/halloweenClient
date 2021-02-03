<template>
  <v-main class="text-center">
    <v-progress-linear absolute top :value="(timer / 60) * 100" />
    <h1 class="mt-3">{{ score }}</h1>
    <p class="caption">Score</p>
    <v-container class="px-6" @click="choose_grid">
      <v-row v-for="i in index" :key="i">
        <v-col
          v-for="j in index"
          :key="j"
          :data-index="(i - 1) * index + (j - 1)"
        >
          {{ grid[(i - 1) * index + (j - 1)] }}
        </v-col>
      </v-row>
    </v-container>
    <h4 class="ma-3">Current：{{ choose }}</h4>
    <p class="caption mx-6">
      请从小到大点击上方数字，顺序点击错误将刷新表格，全部点击完毕加分，争取获得最高分吧！
    </p>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          分数：{{ this.score }}
          <v-spacer />
          排名{{ this.rank }}
        </v-card-title>
        <v-card-actions>
          <v-btn text to="/"> 返回首页 </v-btn>
          <v-spacer />
          <v-btn text @click="start"> 再来一局 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { GameOver } from "../store/request";
import { shuffle } from "lodash";

let start = [];
const count = 60;
let timer = null;

export default {
  name: "Game",
  data: () => ({
    index: 3,
    grid: [],
    choose: 0,
    score: 0,
    timer: count,
    dialog: false,
    rank: 0,
  }),
  async created() {
    await this.start();
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  methods: {
    async refresh_grid() {
      this.choose = 0;
      if (this.score > this.index * this.index) {
        this.index += 1;
        start = [];
        for (let i = 0; i < this.index * this.index; i++) start.push(i + 1);
      }
      this.grid = shuffle(start);
      console.log(this.grid);
    },
    choose_grid({ target }) {
      const index = Number(target.dataset.index);
      if (0 <= index && index <= 24) {
        if (this.choose + 1 === this.grid[index]) {
          this.choose += 1;
          if (this.choose === this.index * this.index) {
            this.score += this.index - 1;
            this.refresh_grid();
          }
        } else this.refresh_grid();
      }
    },
    async start() {
      this.timer = count;
      this.score = 0;
      this.index = 3;
      this.dialog = false;
      start = [];
      for (let i = 0; i < this.index * this.index; i++) start.push(i + 1);
      await this.refresh_grid();
      timer = setInterval(async () => {
        this.timer -= 1;
        if (this.timer === 0) {
          clearInterval(timer);
          this.rank = await GameOver({
            score: this.score,
            _id: this.$store.state.user._id,
          });
          this.timer = count;
          this.dialog = true;
        }
      }, 1000);
    },
  },
};
</script>
