<template>
  <v-main class="red--text text-center text--darken-4">
    <v-progress-linear absolute top :value="(timer / 60) * 100" />
    <h1 class="mt-3"><span class="caption">￥</span>{{ score }}</h1>
    <v-container @click="choose_grid">
      <v-row class="flex-nowrap" v-for="i in index" :key="i">
        <v-col
          v-for="j in index"
          :key="i * index + j"
          :data-index="(i - 1) * index + (j - 1)"
        >
          <span class="caption">￥</span>{{ grid[(i - 1) * index + (j - 1)] }}
        </v-col>
      </v-row>
    </v-container>
    <p class="caption ma-6">争取抢到最大金额的红包吧！</p>
    <v-overlay :value="timer > 60">
      <v-icon
        x-large
        class="animate__animated animate__rubberBand animate__infinite"
        :color="color[timer - 60 - 1]"
      >
        mdi-one-up
      </v-icon>
    </v-overlay>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          分数：{{ this.score }}
          <v-spacer />
          排名{{ this.rank }}
        </v-card-title>
        <v-card-actions>
          <v-btn text to="/">返回首页</v-btn>
          <v-spacer />
          <v-btn text @click="start">再来一局</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { GameOver } from "../store/request";
import { shuffle } from "lodash";

let start = [];
const count = 63;
let timer = null;

export default {
  name: "Game",
  data: () => ({
    index: 2,
    grid: [],
    score: 0,
    timer: count,
    dialog: false,
    rank: 0,
    color: ["green", "yellow", "red"],
  }),
  async created() {
    await this.start();
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  methods: {
    refresh_grid() {
      this.choose = 0;
      if (this.score > this.index ** 8) {
        this.index += 1;
        this.index > 5 && (this.index = 5);
        start = [];
        for (let i = 0; i < this.index * this.index; i++)
          start.push((i + 1) ** 2);
      }
      this.grid = shuffle(start);
    },
    choose_grid({ target }) {
      if (this.timer <= 0) return;
      const index = Number(target.dataset.index);
      if (0 <= index && index <= this.index * this.index) {
        this.score += this.grid[index];
        this.refresh_grid();
      }
    },
    start() {
      this.timer = count;
      this.score = 0;
      this.index = 2;
      this.dialog = false;
      start = [1, 4, 9, 16];
      timer = setInterval(async () => {
        this.timer -= 1;
        if (this.timer === 60) {
          this.refresh_grid();
        }
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
