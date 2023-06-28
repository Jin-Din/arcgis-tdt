# arcgis-tdt

arcgis js api 调用天地图地图服务

# 依赖

```
 "@arcgis/core": "^4.27.0"
```

# 服务清单

> - img_c: 影像地图，默认 4326
> - img_c_4490: 影像地图，4490
> - img_w: 影像地图， 3857
> - cia_c: 影像注记，默认 4326
> - cia_c_4490: 影像注记，4490
> - cia_w: 影像注记， 3857
> - cva_c: 矢量地图，默认 4326
> - cva_c_4490: 矢量地图，4490
> - cva_w: 矢量地图， 3857
> - vec_c: 矢量注记，默认 4326
> - vec_c_4490: 矢量注记，4490
> - vec_w: 矢量注记， 3857

# 使用

```
npm i @jindin/arcgis-tdt

import { useTdtSource } from "@jindin/arcgis-tdt"

const tdt = useTdtSource("自己申请token");

const basemap = new BaseMap({
    baseLayers: [tdt.img_c],
  });

const map = new Map({
    basemap,
  });

const center = {
    type: "point",
    longitude: 108.333,
    latitude: 33.67,
  };
  const mapView = new MapView({
    container: 'map2d',
    map,
    zoom: 10,
    //@ts-ignore
    center,
  });
```
