import LeafleatMap from "./LeafleatMap"
import { TILE_LAYERS_SETTING } from "./TileLayersConfig"

const MAP_ID = 'map'
const INIT_VIEW_COORDS = [55.751244, 37.618423]
const INIT_VIEW_ZOOM = 13
const MIN_ZOOM = 7
const MAX_ZOOM = 18

const map = new LeafleatMap({
  rootId: MAP_ID,
  mapOptions: {
    zoomControl: false,
  },
  initCoords: INIT_VIEW_COORDS,
  initZoom: INIT_VIEW_ZOOM
})

map.addTileLayers(TILE_LAYERS_SETTING)

map.setZoomRange(MIN_ZOOM, MAX_ZOOM)

map.addZoomControl()