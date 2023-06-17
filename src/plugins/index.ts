import { App } from "vue";

// import element from "./element/index";
// import echarts from "./echarts/index";
// import http from "./http/index";
// import videojs from "./videojs";
// import nprogress from "./nprogress";
import arcgis from "./arcgis";
const plugins = [arcgis];

export default (app: App) => {
  plugins.map((plugin) => plugin(app));
};
