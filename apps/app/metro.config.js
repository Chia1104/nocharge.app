// Learn more: https://docs.expo.dev/guides/monorepos/
const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

config.cacheStores = [
  new FileStore({
    root: path.join(__dirname, "node_modules", ".cache", "metro"),
  }),
];

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./src/styles.css",
  dtsFile: "./uniwind-types.d.ts",
});
