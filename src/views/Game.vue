<template>
  <v-main class="text-center">
    <v-progress-linear absolute top :value="(timer / 180) * 100" />
    <h1 class="mt-3">{{ score }}</h1>
    <v-container class="px-16" @click="choose_poem">
      <v-row v-for="i in 5" :key="i">
        <v-col v-for="j in 5" :key="j" :data-index="(i - 1) * 5 + (j - 1)">
          {{ grid[(i - 1) * 5 + (j - 1)] }}
        </v-col>
      </v-row>
    </v-container>
    <section class="my-3">
      <div>完整诗句：{{ choose }}</div>
      <p class="caption">依次点击表格中汉字，构成诗中完整的一句</p>
      <v-btn outlined @click="choose = ''">清除</v-btn>
      <v-btn outlined @click="refresh_poem">跳过</v-btn>
    </section>
    <section class="ma-6">
      <h4>{{ poem.title }}</h4>
      <h5 class="ma-2">[{{ poem.dynasty }}] {{ poem.author }}</h5>
      <p v-html="paragraph"></p>
    </section>
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
import { Poem, GameOver } from "../store/request";
import { shuffle } from "lodash";

const poem = (words, length) => {
  words = words.join("").split(/，|。|？|！/g);

  const random = Math.floor(Math.random() * length);
  let grid = words.splice(random, 1)[0].split("");
  for (let item of words) {
    let index = Math.floor(Math.random() * words[0].length);
    item = item.split("").filter((w) => item[index] !== w);
    grid = grid.concat(item);
  }
  if (grid.length < 25) {
    const length = 25 - grid.length;
    for (let i = 0; i < length; i++) {
      const word = String.fromCharCode(
        `${Math.round(Math.random() * 20900 + 19968)}`
      );
      grid.push(word);
    }
  }
  grid = shuffle(grid);
  return grid;
};

const slice = (words, length) => {
  if (words.length > length + 1) {
    const random = Math.floor(Math.random() * (words.length - length));
    words = words.slice(random, random + length);
  }
  return words;
};

let timer = null;

export default {
  name: "Game",
  data: () => ({
    poem: {},
    paragraph: "",
    grid: "",
    choose: "",
    label: 0,
    score: 0,
    timer: 180,
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
    async refresh_poem() {
      this.choose = "";
      this.poem = await Poem();
      const paragraph = this.poem.paragraph.replace(
        /。|？|！/g,
        (symbol) => symbol + "<br/>"
      );
      let words = paragraph.split(/<br\/>/);
      if (words[0].length === 12) {
        words = slice(words, 3);
        this.grid = poem(words, words.length < 6 ? 6 : words.length - 1);
        this.label = 5;
      } else if (words[0].length === 16) {
        words = slice(words, 2);
        this.grid = poem(words, 4);
        this.label = 7;
      }
      this.paragraph = words.join("<br/>");
    },
    choose_poem({ target }) {
      const index = Number(target.dataset.index);
      if (0 <= index && index <= 24) {
        this.choose += this.grid[index];

        if (this.choose.length === this.label) {
          if (this.poem.paragraph.includes(this.choose)) this.score += 1;
          this.refresh_poem();
        }
      }
    },
    async start() {
      this.timer = 180;
      this.dialog = false;
      await this.refresh_poem();
      timer = setInterval(async () => {
        this.timer -= 1;
        if (this.timer === 0) {
          clearInterval(timer);
          this.rank = await GameOver({
            score: this.score,
            _id: this.$store.state.user._id,
          });
          this.timer = 180;
          this.dialog = true;
        }
      }, 1000);
    },
  },
};
</script>
