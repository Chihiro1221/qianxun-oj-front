const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin());
  },
});

