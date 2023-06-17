/**
 * arcgis 不同的地图view 视角同步
 * Jin 2023.6.14
 */
import { ref } from "vue";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";

type AnyView = SceneView | MapView;

let active = ref(false);
export const useSyncMap = (views: AnyView[]) => {
  // const views = [view1, view2];
  //当前操作的视图
  let activeView: AnyView;

  const sync = (source: AnyView) => {
    if (!activeView || !activeView.viewpoint || activeView !== source) {
      return;
    }
    if (!active.value) return;

    for (const view of views) {
      if (view !== activeView) {
        view.viewpoint = activeView.viewpoint;
      }
    }
  };

  for (const view of views) {
    view.watch(["interacting", "animation"], () => {
      activeView = view;
      sync(activeView);
    });

    view.watch("viewpoint", () => sync(view));
  }

  active.value = true;

  const stop = () => {
    active.value = false;
  };

  return { active, stop };
};
