import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import zhHans from "vuetify/lib/locale/zh-Hans";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans",
  },
  theme: {
    themes: {
      light: {
        primary: "#000",
        success: "#333",
        warning: "#666",
        error: "#999",
        accent: "#ccc",
      },
    },
  },
});
