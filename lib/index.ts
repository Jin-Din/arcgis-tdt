import TileInfo from "@arcgis/core/layers/support/TileInfo";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Extent from "@arcgis/core/geometry/Extent";

type tdtMapId = "img_c" | "cia_c" | "img_w" | "cia_w" | "vec_c" | "vec_w" | "cva_c" | "cva_w";
type tdtLayerId = "img" | "cia" | "vec" | "cva";
type tdtTileMatrixSet = "c" | "w";

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
 *对于 WGS84(4326):  epsg4490、tileInfoWGS84 、epsg4326_v2 都可以
 *对于 CGCS200(4490): 仅epsg4490且要设置fullextent
 */

const tileInfoWebMercator = new TileInfo({
  dpi: 90.71428571427429,
  lods: [
    {
      level: 0,
      scale: 591657527.591555,
      resolution: 156543.033928,
    },
    {
      level: 1,
      scale: 295828763.795777,
      resolution: 78271.5169639999,
    },
    {
      level: 2,
      scale: 147914381.897889,
      resolution: 39135.7584820001,
    },
    {
      level: 3,
      scale: 73957190.948944,
      resolution: 19567.8792409999,
    },
    {
      level: 4,
      scale: 36978595.474472,
      resolution: 9783.93962049996,
    },
    {
      level: 5,
      scale: 18489297.737236,
      resolution: 4891.96981024998,
    },
    {
      level: 6,
      scale: 9244648.868618,
      resolution: 2445.98490512499,
    },
    {
      level: 7,
      scale: 4622324.434309,
      resolution: 1222.99245256249,
    },
    {
      level: 8,
      scale: 2311162.217155,
      resolution: 611.49622628138,
    },
    {
      level: 9,
      scale: 1155581.108577,
      resolution: 305.748113140558,
    },
    {
      level: 10,
      scale: 577790.554289,
      resolution: 152.874056570411,
    },
    {
      level: 11,
      scale: 288895.277144,
      resolution: 76.4370282850732,
    },
    {
      level: 12,
      scale: 144447.638572,
      resolution: 38.2185141425366,
    },
    {
      level: 13,
      scale: 72223.819286,
      resolution: 19.1092570712683,
    },
    {
      level: 14,
      scale: 36111.909643,
      resolution: 9.55462853563415,
    },
    {
      level: 15,
      scale: 18055.954822,
      resolution: 4.77731426794937,
    },
    {
      level: 16,
      scale: 9027.977411,
      resolution: 2.38865713397468,
    },
    {
      level: 17,
      scale: 4513.988705,
      resolution: 1.19432856685505,
    },
    {
      level: 18,
      scale: 2256.994353,
      resolution: 0.597164283559817,
    },
    {
      level: 19,
      scale: 1128.497176,
      resolution: 0.298582141647617,
    },
  ],
  size: [256, 256],
  origin: {
    x: -20037508.342787,
    y: 20037508.342787,
  },
  spatialReference: SpatialReference.WebMercator,
});
const tileInfoWGS84 = new TileInfo({
  dpi: 90.71428571427429,
  lods: [
    {
      level: 0,
      levelValue: "1",
      scale: 295828763.79585470937713011037,
      resolution: 0.703125,
    },
    {
      level: 1,
      levelValue: "2",
      scale: 147914381.89792735468856505518,
      resolution: 0.3515625,
    },
    {
      level: 2,
      levelValue: "3",
      scale: 73957190.948963677344282527592,
      resolution: 0.17578125,
    },
    {
      level: 3,
      levelValue: "4",
      scale: 36978595.474481838672141263796,
      resolution: 0.087890625,
    },
    {
      level: 4,
      levelValue: "5",
      scale: 18489297.737240919336070631898,
      resolution: 0.0439453125,
    },
    {
      level: 5,
      levelValue: "6",
      scale: 9244648.868620459668035315949,
      resolution: 0.02197265625,
    },
    {
      level: 6,
      levelValue: "7",
      scale: 4622324.4343102298340176579745,
      resolution: 0.010986328125,
    },
    {
      level: 7,
      levelValue: "8",
      scale: 2311162.2171551149170088289872,
      resolution: 0.0054931640625,
    },
    {
      level: 8,
      levelValue: "9",
      scale: 1155581.1085775574585044144937,
      resolution: 0.00274658203125,
    },
    {
      level: 9,
      levelValue: "10",
      scale: 577790.55428877872925220724681,
      resolution: 0.001373291015625,
    },
    {
      level: 10,
      levelValue: "11",
      scale: 288895.2771443893646261036234,
      resolution: 0.0006866455078125,
    },
    {
      level: 11,
      levelValue: "12",
      scale: 144447.63857219468231305181171,
      resolution: 0.00034332275390625,
    },
    {
      level: 12,
      levelValue: "13",
      scale: 72223.819286097341156525905853,
      resolution: 0.000171661376953125,
    },
    {
      level: 13,
      levelValue: "14",
      scale: 36111.909643048670578262952926,
      resolution: 0.0000858306884765625,
    },
    {
      level: 14,
      levelValue: "15",
      scale: 18055.954821524335289131476463,
      resolution: 0.00004291534423828125,
    },
    {
      level: 15,
      levelValue: "16",
      scale: 9027.977410762167644565738231,
      resolution: 0.000021457672119140625,
    },
    {
      level: 16,
      levelValue: "17",
      scale: 4513.9887053810838222828691158,
      resolution: 0.0000107288360595703125,
    },
    {
      level: 17,
      levelValue: "18",
      scale: 2256.9943526905419111414345579,
      resolution: 0.00000536441802978515625,
    },
    {
      level: 18,
      levelValue: "19",
      scale: 1128.4971763452709555707172788,
      resolution: 0.000002682209014892578125,
    },
  ],
  size: [256, 256],
  origin: {
    x: -180,
    y: 90,
  },
  spatialReference: SpatialReference.WGS84,
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

let tdt_token = "token";
//方式一：
export const useTdtSource = (token?: string) => {
  tdt_token = token ?? tdt_token;

  const getUrlTemplate = (layerId: tdtLayerId, tileMatrixSet: tdtTileMatrixSet) => {
    const tdt = `${layerId}_${tileMatrixSet}`;
    // `https://{subDomain}.tianditu.gov.cn/DataServer?T=${layer}&x={x}&y={y}&l={z}&tk=${tdt_token}`
    // return `https://{subDomain}.tianditu.gov.cn/DataServer?T=${tdt}&x={x}&y={y}&l={z}&tk=${tdt_token}`;
    // wmts: `http://{subDomain}.tianditu.gov.cn/${tdt}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${mapId}&STYLE=default&TILEMATRIXSET=${mapType}&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tdt_token}`;;
    return `http://{subDomain}.tianditu.gov.cn/${tdt}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layerId}&STYLE=default&TILEMATRIXSET=${tileMatrixSet}&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tdt_token}`;
  };

  const getTdtLayer = (mapId: tdtMapId, epsg?: EPSG) => {
    let tileInfo: TileInfo | undefined = undefined;
    let fullExtent: Extent | undefined = undefined;

    const [layerId, tileMatrixSet] = mapId.split("_");
    let defaultEPSG = tileMatrixSet === "w" ? 3857 : 4326;
    let supportEPSG = epsg ?? defaultEPSG;

    if (supportEPSG === 4490) {
      tileInfo = epsg4490.tileInfo;
      fullExtent = epsg4490.fullExtent;
    } else if (supportEPSG === 4326) {
      tileInfo = epsg4326_v2.tileInfo;
      fullExtent = epsg4326_v2.fullExtent;
    }

    return new WebTileLayer({
      // 天地图影像地图 4490
      id: `${layerId}_${tileMatrixSet}_${epsg}`,
      title: "天地图",
      urlTemplate: getUrlTemplate(layerId as tdtLayerId, tileMatrixSet as tdtTileMatrixSet), //`https://{subDomain}.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=${tdt_token}`,
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
    // TianDiTuLayer,
    /**
     * 影像(cgcs2000) 以4490的方式加载
     */
    // img_c_4490_1: new TianDiTuLayer({
    //   id: "img_c_4490",
    //   title: "天地图影像",
    //   mapId: "img_c",
    //   epsg: 4490,
    // } as tianDiTuLayerProperties),
    img_c_4490: getTdtLayer("img_c", 4490),
    cia_c_4490: getTdtLayer("cia_c", 4490),
    cva_c_4490: getTdtLayer("cva_c", 4490),
    vec_c_4490: getTdtLayer("vec_c", 4490),
    //
    /**
     * 影像(wgs84)
     */
    // img_c_1: new TianDiTuLayer({
    //   mapId: "img_c",
    // } as tianDiTuLayerProperties),
    img_c: getTdtLayer("img_c", 4326),
    cia_c: getTdtLayer("cia_c", 4326),
    cva_c: getTdtLayer("cva_c", 4326),
    vec_c: getTdtLayer("vec_c", 4326),
    /**
     * WebMercator
     */
    // img_w_1: new TianDiTuLayer({
    //   // urlTemplate: "http://t0.tianditu.com/img_w/wmts",
    //   mapId: "img_w",
    // } as tianDiTuLayerProperties),
    img_w: getTdtLayer("img_w"),
    cia_w: getTdtLayer("cia_w"),
    cva_w: getTdtLayer("cva_w"),
    vec_w: getTdtLayer("vec_w"),
    //
  };
};
type tianDiTuLayerProperties = WebTileLayer & { mapId: tdtMapId; epsg?: EPSG };
// 方式二：
/**
 *
 * 默认 以WebMercator 方式加载
 */
class TianDiTuLayer extends WebTileLayer {
  private mapId: tdtMapId = "img_w";
  private tdtLayer: tdtLayerId = "img";
  private epsg: EPSG = 3857;
  private tdtTileMatrixSet: tdtTileMatrixSet = "w";
  constructor(props: tianDiTuLayerProperties) {
    super(props);

    this.mapId = props.mapId;
    //分解
    const [tdtLayer, tdtTileMatrixSet] = this.mapId.split("_");
    this.tdtLayer = tdtLayer as tdtLayerId;
    this.tdtTileMatrixSet = tdtTileMatrixSet as tdtTileMatrixSet;

    this.epsg = props.epsg ?? (this.getDefaultEPSG() as EPSG);
    //必须设置spatialReference,先设置空间参考
    //@ts-ignore
    this.spatialReference = { wkid: this.epsg }; //props.spatialReference ?? this.getDefaultSpatialReference();
    this.tdtTileMatrixSet = this.getTdtTileMatrixSet();
    if (this.spatialReference.wkid === 4490)
      // 4490 必须设置fullextent
      this.fullExtent = props.fullExtent ?? epsg4490.fullExtent;
    this.tileInfo = this.generateTileInfo();
    this.urlTemplate = this.generateUrlTemplate();
    this.subDomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
  }

  private generateUrlTemplate(): string {
    // const [layer, tileMatrixSet] = urlTemplate.split("/")[3].split("_");
    const { tdtLayer: layer, tdtTileMatrixSet: tileMatrixSet } = this;
    return `http://{subDomain}.tianditu.com/${layer}_${tileMatrixSet}/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=${layer}&STYLE=default&FORMAT=tiles&TILEMATRIXSET=${tileMatrixSet}&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${tdt_token}`;
  }

  private generateTileInfo(): TileInfo {
    // const [layer, tileMatrixSet] = urlTemplate.split("/")[3].split("_");
    const { tdtLayer: layer, tdtTileMatrixSet: tileMatrixSet } = this;
    return tileMatrixSet === "c" ? (this.spatialReference.isWGS84 ? epsg4326_v2.tileInfo : epsg4490.tileInfo) : tileInfoWebMercator;
  }
  private getDefaultEPSG(): EPSG {
    // const [layer, tileMatrixSet] = urlTemplate.split("/")[3].split("_");
    const { tdtLayer: layer, tdtTileMatrixSet: tileMatrixSet } = this;
    return tileMatrixSet === "w" ? 3857 : 4326;
  }
  private getTdtTileMatrixSet(): tdtTileMatrixSet {
    return this.spatialReference.isWebMercator ? "w" : "c";
  }
}
