import { App } from "vue";
// 全局引入 arcgis js 开发资源
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";

esriConfig.assetsPath = "./assets";

export default (app?: App) => {};
