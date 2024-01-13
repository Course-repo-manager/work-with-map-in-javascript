import LeafleatMap from "./LeafleatMap"
import { TILE_LAYERS_SETTING } from "./TileLayersConfig"

const MAP_ID = 'map'
const INIT_VIEW_COORDS = [55.751244, 37.618423]
const INIT_VIEW_ZOOM = 13

const map = new LeafleatMap({
  rootId: MAP_ID,
  initCoords: INIT_VIEW_COORDS,
  initZoom: INIT_VIEW_ZOOM
})

map.add(TILE_LAYERS_SETTING)