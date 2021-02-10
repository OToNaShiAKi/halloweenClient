<template>
  <v-main class="red--text text-center text--darken-4">
    <v-progress-linear absolute top :value="(timer / 30) * 100" />
    <h1 class="mt-3">{{ score }}</h1>
    <v-container @click="choose_grid">
      <v-row class="flex-nowrap" v-for="i in index" :key="i">
        <v-col
          class="white--text"
          v-for="j in index"
          :key="i * index + j"
          :data-index="(i - 1) * index + (j - 1)"
        >
          {{ grid[(i - 1) * index + (j - 1)] }}
        </v-col>
      </v-row>
    </v-container>
    <h4 class="mt-3">点击最{{ choose ? "小" : "大" }}数</h4>
    <p class="font-weight-bold">{{ hit }}连击</p>
    <p class="caption">30s内赢下更多分数吧</p>
    <v-overlay :value="timer > 30">
      <v-icon
        x-large
        class="animate__animated animate__rubberBand animate__infinite"
        :color="color[timer - 30 - 1]"
      >
        mdi-one-up
      </v-icon>
    </v-overlay>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="red--text">分数：{{ this.score }}</v-card-title>
        <v-card-subtitle class="primary--text d-flex justify-space-between">
          <span>最高分：{{ highest }}</span>
          <span>排名{{ this.rank }}</span>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="grey" text to="/">返回首页</v-btn>
          <v-spacer />
          <v-btn color="red" text @click="start">再来一局</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { GameOver } from "../store/request";
import { shuffle } from "lodash";
import { getItem, setItem } from "../plugins/storage";

let start = [];
const count = 30;
let timer = null;

export default {
  name: "Game",
  data: () => ({
    highest: 0,
    index: 2,
    grid: [],
    score: 0,
    timer: count,
    choose: -1,
    dialog: false,
    rank: 0,
    color: ["green", "yellow", "red"],
    hit: 0,
  }),
  created() {
    this.highest =
      this.$store.state.user.highest || Number(getItem("highest")) || 0;
    this.start();
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  methods: {
    refresh_grid() {
      this.choose = Math.random() < 0.4;
      if (this.score > this.index ** 4) {
        this.index += 1;
        this.index > 5 && (this.index = 5);
        start = [];
        for (let i = 0; i < this.index ** 2; i++) start.push((i + 1) ** 2);
      }
      this.grid = shuffle(start);
    },
    choose_grid({ isTrusted, target }) {
      if (this.timer <= 0 || !isTrusted) return;
      const index = Number(target.dataset.index);
      if (0 <= index && index <= this.index ** 2) {
        const number = this.grid[index];
        if (
          (this.choose && number === 1) ||
          (!this.choose && number === this.index ** 4)
        ) {
          this.hit += 1;
          this.score += this.index + Math.floor(this.hit / 4);
        } else {
          this.score -= 1;
          this.hit = 0;
        }
        this.refresh_grid();
      }
    },
    start() {
      this.timer = count + 3;
      this.hit = this.score = 0;
      this.index = 2;
      this.dialog = false;
      start = [1, 4, 9, 16];
      timer = setInterval(async () => {
        this.timer -= 1;
        if (this.timer === count) this.refresh_grid();
        if (this.timer === 0) {
          clearInterval(timer);
          if (this.highest < this.score) {
            this.highest = this.score;
            setItem("highest", this.highest);
          }
          this.grid = [];
          this.rank = await GameOver({
            score: this.score,
            _id: this.$store.state.user._id,
          });
          this.dialog = true;
        }
      }, 1000);
    },
  },
};
</script>
