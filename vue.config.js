module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  devServer: {
    open: true,
    proxy: {
      "/halloween": {
        target: "http://localhost:8121",
        changeOrigin: true,
        pathRewrite: { "^/halloween": "" },
      },
      "/lantern-poets": {
        target: "http://hustmaths.top",
        changeOrigin: true,
        pathRewrite: { "^/halloween": "" },
      },
    },
  },
};
