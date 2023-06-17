<template>
  <div class="tool-bar">
    <button @click="handleAddLayer">添加动态投影图层</button>
    <button @click="handleAddTerrainLayer">添加陕西30米地形</button>
    <!-- <button @click="handleAddLayer">同步</button> -->
  </div>
  <div class="root-container">
    <!-- <div id="map2d" ref="map2d" class="map map2d"></div> -->
    <div id="map3d" ref="map3d" class="map map3d"></div>
    <!-- <div id="map3d1" ref="map3d1" class="map map3d"></div>
    <div id="map3d2" ref="map3d2" class="map map3d"></div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTdtSource } from "./libs/tianDiTuLayer";
import MapView from "@arcgis/core/views/MapView"; //2d 地图
import SceneView from "@arcgis/core/views/SceneView"; //3d 地图
import Map from "@arcgis/core/Map";
import BaseMap from "@arcgis/core/Basemap";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import esriConfig from "@arcgis/core/config";
import { useSyncMap } from "./libs/syncMap";

const tdt = useTdtSource(); //"a5158125c0ae822a92852177362ad808"
// esriConfig.request.trustedServers?.push("localhost:5173");

const map2d = ref();
const map3d = ref();
const map3d1 = ref();
const map3d2 = ref();
let map: Map;
onMounted(() => {
  //初始化并加载地图
  //http://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer
  const arcgisimglayer = new TileLayer({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  });

  const imglayer_4490 = new TileLayer({
    // 4490
    url: "http://10.61.128.135:6080/arcgis/rest/services/image_xaql/MapServer",
  });

  const basemap = new BaseMap({
    baseLayers: [tdt.img_c, tdt.cia_c],
    // baseLayers: [tdt.img_c_,imglayer_4490],
  });

  //// https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer
  // china_dem_90m_4490_v1 china_dem_90m_4490_v2
  const chinaTerrainLayer = new ElevationLayer({
    title: "全国自定义地形",
    url: "http://10.61.128.135:6080/arcgis/rest/services/china_dem_90m_4490_v1/ImageServer",
    fullExtent: {
      xmax: 180,
      ymax: 90,
      xmin: -180,
      ymin: -90,
      spatialReference: {
        wkid: 4490,
      },
    },
  });
  // ShaanxiCop30_4490_v1  ShaanxiCop30_4490_v2
  const shaanxiTerrainLayer = new ElevationLayer({
    title: "自定义地形陕西",
    url: "http://10.61.128.135:6080/arcgis/rest/services/ShaanxiCop30_4490_v1/ImageServer",
    //@ts-ignore
    spatialReference: {
      wkid: 4490,
    },
  });
  map = new Map({
    basemap,
    // layers: [imglayer_4490],
    ground: {
      layers: [chinaTerrainLayer],
    },
    // ground: "world-elevation",
  });

  const center = {
    type: "point",
    longitude: 108.333,
    latitude: 33.67,
    spatialReference: {
      wkid: 4490,
    },
  };
  // const mapView = new MapView({
  //   container: map2d.value,
  //   map,
  //   zoom: 10,
  //   //@ts-ignore
  //   center,
  // });

  const sceneView = new SceneView({
    container: map3d.value,
    map,
    zoom: 10,
    //@ts-ignore
    center,
    // camera: {
    //   // tilt: 45,
    // },
  });

  // const sceneView1 = new SceneView({
  //   container: map3d1.value,
  //   map,
  //   zoom: 10,
  //   //@ts-ignore
  //   center,
  //   // environment: {
  //   //   weather: {
  //   //     type: "snowy",
  //   //     cloudCover: 0.8,
  //   //     precipitation: 0.3,
  //   //     snowCover: "enabled",
  //   //   },
  //   // },
  // });
  // const sceneView2 = new SceneView({
  //   container: map3d2.value,
  //   map,
  //   zoom: 10,
  //   //@ts-ignore
  //   center,
  //   // environment: {
  //   //   weather: {
  //   //     type: "rainy",
  //   //   },
  //   // },
  // });
  // let { active: syncActive } = useSyncMap([mapView, sceneView, sceneView1, sceneView2]);
});

const handleAddLayer = () => {
  //动态投影
  const overlayer = new MapImageLayer({
    url: "http://10.61.128.135:6080/arcgis/rest/services/szql_qlfw/MapServer",
  });
  map.layers.add(overlayer);
};
const handleAddTerrainLayer = () => {
  //叠加更高精度的地形
  const shaanxiTerrainLayer = new ElevationLayer({
    title: "自定义地形陕西",
    url: "http://10.61.128.135:6080/arcgis/rest/services/ShaanxiCop30_4490_v1/ImageServer",
    //@ts-ignore
    spatialReference: {
      wkid: 4490,
    },
  });
  map.ground.layers.add(shaanxiTerrainLayer);
};
</script>
<style scoped>
.root-container {
  width: 100%;
  height: 100%;
  display: grid;
  /* grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr); */
}
.map {
  flex: 1;
}
.tool-bar {
  position: relative;
  /* position: absolute;
  top: 0;
  left: 0; */
}
</style>
