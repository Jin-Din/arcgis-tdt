import TileInfo from "@arcgis/core/layers/support/TileInfo";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer";
import Color from "@arcgis/core/Color";
import esriRequest from "@arcgis/core/request";
import esriConfig from "@arcgis/core/config";

// type tdtLayerType = "img_c" | "cia_c" | "img_w" | "cia_w" | "vec_c" | "vec_w" | "cva_c" | "cva_w" | "img_c_4326" | "cia_c_4326";
type tdtMapId = "img" | "cia" | "vec" | "cva";
type tdtMapType = "c" | "w";

type EPSG = 3857 | 4490 | 4326;

const subDomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];

const RESOLUTIONS_2000 = [
  0.7031249999891485, 0.35156249999999994, 0.17578124999999997, 0.08789062500000014, 0.04394531250000007, 0.021972656250000007, 0.01098632812500002,
  0.00549316406250001, 0.0027465820312500017, 0.0013732910156250009, 0.000686645507812499, 0.0003433227539062495, 0.00017166137695312503,
  0.00008583068847656251, 0.000042915344238281406, 0.000021457672119140645, 0.000010728836059570307, 0.000005364418029785169, 2.6822090148925781e-6,
];
const SCALES_2000 = [
  2.958293554545656e8, 1.479146777272828e8, 7.39573388636414e7, 3.69786694318207e7, 1.848933471591035e7, 9244667.357955175, 4622333.678977588,
  2311166.839488794, 1155583.419744397, 577791.7098721985, 288895.85493609926, 144447.92746804963, 72223.96373402482, 36111.98186701241,
  18055.990933506204, 9027.995466753102, 4513.997733376551, 2256.998866688275, 1128.4994333441375,
];

const levels = Array.from(Array(RESOLUTIONS_2000.length).keys(), (n) => n);
const lods = levels.map((item) => {
  return {
    level: item,
    levelValue: "" + (item + 1), //天地图 是从 level 1 开始
    resolution: RESOLUTIONS_2000[item],
    scale: SCALES_2000[item],
  };
});
/**
 * 【不推荐使用】此版本的lods 方案mapview下可以使用，但不支持 sceneView 下显示，
 */
const epsg4326_v1 = {
  tileInfo: new TileInfo({
    dpi: 90.71428571427429, // 切片方案的每英寸点数（即像素）。
    size: [256, 256], // 设置每个瓷砖的高度和宽度为[256, 256]像素。
    origin: {
      // 切片方案的原点。
      x: -180,
      y: 90,
      spatialReference: { wkid: 4326 },
    },
    spatialReference: { wkid: 4326 },
    lods: [
      // 定义平铺方案的详细级别数组。
      { level: 0, levelValue: "1", resolution: 0.703125, scale: 295497593.05875003 },
      { level: 1, levelValue: "2", resolution: 0.3515625, scale: 147748796.52937502 },
      { level: 2, levelValue: "3", resolution: 0.17578125, scale: 73874398.264687508 },
      { level: 3, levelValue: "4", resolution: 0.087890625, scale: 36937199.132343754 },
      { level: 4, levelValue: "5", resolution: 0.0439453125, scale: 18468599.566171877 },
      { level: 5, levelValue: "6", resolution: 0.02197265625, scale: 9234299.7830859385 },
      { level: 6, levelValue: "7", resolution: 0.010986328125, scale: 4617149.8915429693 },
      { level: 7, levelValue: "8", resolution: 0.0054931640625, scale: 2308574.9457714846 },
      { level: 8, levelValue: "9", resolution: 0.00274658203125, scale: 1154287.4728857423 },
      { level: 9, levelValue: "10", resolution: 0.001373291015625, scale: 577143.73644287116 },
      { level: 10, levelValue: "11", resolution: 0.0006866455078125, scale: 288571.86822143558 },
      { level: 11, levelValue: "12", resolution: 0.00034332275390625, scale: 144285.93411071779 },
      { level: 12, levelValue: "13", resolution: 0.000171661376953125, scale: 72142.967055358895 },
      { level: 13, levelValue: "14", resolution: 8.58306884765625e-5, scale: 36071.483527679447 },
      { level: 14, levelValue: "15", resolution: 4.291534423828125e-5, scale: 18035.741763839724 },
      { level: 15, levelValue: "16", resolution: 2.1457672119140625e-5, scale: 9017.8708819198619 },
      { level: 16, levelValue: "17", resolution: 1.0728836059570313e-5, scale: 4508.9354409599309 },
      { level: 17, levelValue: "18", resolution: 5.3644180297851563e-6, scale: 2254.4677204799655 },
      { level: 18, levelValue: "19", resolution: 2.68220901489257815e-6, scale: 1127.23386023998275 },
      { level: 19, levelValue: "20", resolution: 1.341104507446289075e-6, scale: 563.616930119991375 },
    ],
  }),
  fullExtent: new Extent({
    xmax: 180,
    ymax: 90,
    xmin: -180,
    ymin: -90,
    spatialReference: {
      wkid: 4326,
    },
  }),
};
/**
 * 【推荐使用】此方案的lods方案 可支持mapview和 sceneView
 * arcgis 的 4490 和4326 切片方案
 */
const epsg4326_v2 = {
  tileInfo: new TileInfo({
    dpi: 96,
    size: [256, 256],
    format: "png",
    origin: {
      x: -180,
      y: 90,
    },
    spatialReference: {
      wkid: 4326,
    },
    lods,
  }),
  fullExtent: new Extent({
    xmax: 180,
    ymax: 90,
    xmin: -180,
    ymin: -90,
    spatialReference: {
      wkid: 4326,
    },
  }),
};
/**
 * 4490 切片方案
 */
const epsg4490 = {
  tileInfo: new TileInfo({
    dpi: 96,
    size: [256, 256],
    format: "png",
    origin: {
      x: -180,
      y: 90,
    },
    spatialReference: {
      wkid: 4490,
    },
    lods,
  }),
  fullExtent: new Extent({
    xmax: 180,
    ymax: 90,
    xmin: -180,
    ymin: -90,
    spatialReference: {
      wkid: 4490,
    },
  }),
};
let tdt_token = "3b659aefecf870a8390d6c77b8a4b8aa";
export const useTdtSource = (token?: string) => {
  tdt_token = token ?? tdt_token;

  const getUrlTemplate = (mapId: tdtMapId, mapType: tdtMapType) => {
    const tdt = `${mapId}_${mapType}`;
    // `https://{subDomain}.tianditu.gov.cn/DataServer?T=${layer}&x={x}&y={y}&l={z}&tk=${tdt_token}`
    // return `https://{subDomain}.tianditu.gov.cn/DataServer?T=${tdt}&x={x}&y={y}&l={z}&tk=${tdt_token}`;
    // wmts: `http://{subDomain}.tianditu.gov.cn/${tdt}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${mapId}&STYLE=default&TILEMATRIXSET=${mapType}&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tdt_token}`;;
    return `http://{subDomain}.tianditu.gov.cn/${tdt}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${mapId}&STYLE=default&TILEMATRIXSET=${mapType}&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tdt_token}`;
  };

  const getTdtLayer = (tdt: tdtMapId, supportEPSG: EPSG = 3857) => {
    let tileInfo: TileInfo | undefined = undefined;
    let fullExtent: Extent | undefined = undefined;

    let tdtSub: tdtMapType = supportEPSG === 3857 ? "w" : "c";

    if (supportEPSG === 4490) {
      tileInfo = epsg4490.tileInfo;
      fullExtent = epsg4490.fullExtent;
    } else if (supportEPSG === 4326) {
      tileInfo = epsg4326_v2.tileInfo;
      fullExtent = epsg4326_v2.fullExtent;
    }

    return new WebTileLayer({
      // 天地图影像地图 4490
      id: `${tdt}_${tdtSub}_${supportEPSG}`,
      title: "天地图",
      urlTemplate: getUrlTemplate(tdt, tdtSub), //`https://{subDomain}.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=${tdt_token}`,
      subDomains,
      copyright: "天地图",
      tileInfo: tileInfo,
      //4490  必须设置
      fullExtent,
      // 4490 必须设置4.12必须指定spatialReference属性。4.11 可有可无。
      // 这里有个坑：webtilelayer.spatialReference 默认是3857，而官方文档中说明 spatialReference 属性是只读的。误导我没有去设置，导致一直没调通
      //@ts-ignore
      spatialReference: { wkid: supportEPSG },
    });
  };

  return {
    getTdtLayer,
    img_c: getTdtLayer("img", 4490), //tdtLayers["img_c"],
    cia_c: getTdtLayer("cia", 4490),
    cva_c: getTdtLayer("cva", 4490),
    vec_c: getTdtLayer("vec", 4490),
    //
    img_c_4326: getTdtLayer("img", 4326),
    cia_c_4326: getTdtLayer("cia", 4326),
    cva_c_4326: getTdtLayer("cva", 4326),
    vec_c_4326: getTdtLayer("vec", 4326),
    //
    img_w: getTdtLayer("img"),
    cia_w: getTdtLayer("cia"),
    cva_w: getTdtLayer("cva"),
    vec_w: getTdtLayer("vec"),
    //
  };
};
